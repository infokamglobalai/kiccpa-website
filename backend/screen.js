const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function readResume(filePath) {
  if (!filePath || !fs.existsSync(filePath)) return '';
  const ext = path.extname(filePath).toLowerCase();
  let buf;
  try {
    buf = fs.readFileSync(filePath);
  } catch {
    return '';
  }
  if (ext === '.docx') return clean(docxText(buf));
  if (ext === '.pdf') return clean(pdfText(buf));
  if (ext === '.txt') return clean(buf.toString('utf8'));
  return '';
}

function clean(value) {
  return String(value || '').replace(/\s+/g, ' ').trim().slice(0, 20000);
}

function docxText(buf) {
  const xml = unzip(buf, 'word/document.xml');
  if (!xml) return '';
  return xml.toString('utf8')
    .replace(/<w:p[ >]/g, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"');
}

function unzip(buf, wanted) {
  let offset = 0;
  while (offset + 30 < buf.length) {
    if (buf.readUInt32LE(offset) !== 0x04034b50) break;
    const method = buf.readUInt16LE(offset + 8);
    const compSize = buf.readUInt32LE(offset + 18);
    const nameLen = buf.readUInt16LE(offset + 26);
    const extraLen = buf.readUInt16LE(offset + 28);
    const name = buf.slice(offset + 30, offset + 30 + nameLen).toString('utf8');
    const start = offset + 30 + nameLen + extraLen;
    const end = Math.min(buf.length, start + compSize);
    if (name === wanted) {
      const data = buf.slice(start, end);
      if (method === 0) return data;
      if (method === 8) {
        try { return zlib.inflateRawSync(data); } catch { return Buffer.alloc(0); }
      }
      return Buffer.alloc(0);
    }
    if (!compSize) break;
    offset = end;
  }
  return Buffer.alloc(0);
}

function pdfText(buf) {
  const chunks = [];
  let cursor = 0;
  while (cursor < buf.length) {
    const start = buf.indexOf('stream', cursor);
    if (start < 0) break;
    let dataStart = start + 6;
    if (buf[dataStart] === 13) dataStart += 1;
    if (buf[dataStart] === 10) dataStart += 1;
    const end = buf.indexOf('endstream', dataStart);
    if (end < 0) break;
    const raw = buf.slice(dataStart, end);
    const head = buf.slice(Math.max(0, start - 80), start).toString('latin1');
    let text = '';
    if (head.includes('FlateDecode')) {
      try { text = zlib.inflateSync(raw).toString('latin1'); } catch { text = ''; }
    } else {
      text = raw.toString('latin1');
    }
    chunks.push(pdfLiterals(text));
    cursor = end + 9;
  }
  const joined = chunks.join(' ');
  if (joined.trim().length > 40) return joined;
  return buf.toString('latin1').replace(/[^\x20-\x7E\n]+/g, ' ');
}

function pdfLiterals(text) {
  const parts = [];
  const pattern = /\((?:\\.|[^\\)]){2,}\)/g;
  const found = text.match(pattern) || [];
  found.forEach((item) => {
    const inner = item.slice(1, -1)
      .replace(/\\n/g, ' ')
      .replace(/\\r/g, ' ')
      .replace(/\\t/g, ' ')
      .replace(/\\\(/g, '(')
      .replace(/\\\)/g, ')')
      .replace(/\\\\/g, '\\');
    if (/[A-Za-z]{3,}/.test(inner)) parts.push(inner);
  });
  return parts.join(' ');
}

const STOP = new Set('the and for with that this from your have will into over such than then them they their about after before using use able work team role year years experience including within across other strong good well plus must should required ability skills skill knowledge working based into our you are was were been being can may not but any all per via job jobs candidate applicants apply application'.split(' '));

function tokens(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s-]/g, ' ')
    .split(/[\s,/|]+/)
    .map((word) => word.trim())
    .filter((word) => word.length >= 3 && !STOP.has(word));
}

function lineHits(line, haystack) {
  const words = [...new Set(tokens(line))];
  if (!words.length) return null;
  const matched = words.filter((word) => haystack.includes(word));
  const need = words.length === 1 ? 1 : Math.ceil(words.length * 0.6);
  return { words, matched, ok: matched.length >= need };
}

function screenMatch(job, application, resumeText) {
  const years = Number(application?.experienceYears || 0);
  const min = Number(job?.experienceMin || 0);
  const max = Number(job?.experienceMax || 0);
  let experienceScore = 40;
  let experienceNote = `${years} years stated.`;
  if (min > 0 && years < min) {
    experienceScore = Math.round(40 * (years / min));
    experienceNote = `${years} years stated. The role asks for at least ${min}.`;
  } else if (max > min && years > max) {
    experienceScore = 34;
    experienceNote = `${years} years stated. The role asks for ${min}–${max}.`;
  } else if (max > min) {
    experienceNote = `${years} years stated. Inside the ${min}–${max} year range.`;
  } else if (min > 0) {
    experienceNote = `${years} years stated. Meets the ${min}+ year range.`;
  }

  const haystack = [
    application?.currentTitle,
    application?.currentCompany,
    application?.educationLevel,
    application?.institution,
    application?.coverNote,
    resumeText,
  ].join(' ').toLowerCase();

  const requirements = Array.isArray(job?.requirements) ? job.requirements : [];
  const extras = Array.isArray(job?.niceToHave) ? job.niceToHave : [];
  const requirementResult = scoreLines(requirements, haystack);
  const extraResult = scoreLines(extras, haystack);
  const keywordScore = (requirementResult.total ? (requirementResult.hit / requirementResult.total) * 45 : 30)
    + (extraResult.total ? (extraResult.hit / extraResult.total) * 15 : 0);
  const score = Math.max(0, Math.min(100, Math.round(experienceScore + keywordScore)));
  const band = score >= 75 ? 'Strong match' : score >= 50 ? 'Possible match' : 'Weak match';
  return {
    score,
    band,
    experienceNote,
    resumeRead: Boolean(String(resumeText || '').trim()),
    matched: requirementResult.matched.slice(0, 8),
    missing: requirementResult.missing.slice(0, 8),
  };
}

function scoreLines(lines, haystack) {
  const matched = [];
  const missing = [];
  let total = 0;
  let hit = 0;
  lines.forEach((line) => {
    const result = lineHits(line, haystack);
    if (!result) return;
    total += 1;
    const label = String(line).trim().slice(0, 80);
    if (result.ok) {
      hit += 1;
      matched.push(label);
    } else {
      missing.push(label);
    }
  });
  return { total, hit, matched, missing };
}

module.exports = { readResume, screenMatch };
