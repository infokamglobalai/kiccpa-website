/**
 * Canonical URL for the Resource Center page (QR codes, sharing).
 *
 * Priority:
 * 1. NEXT_PUBLIC_RESOURCES_PUBLIC_URL — full URL (e.g. https://kiccpa.com/resources or http://192.168.1.5:3001/resources for phone-on-Wi‑Fi testing).
 * 2. While viewing on localhost / 127.0.0.1 — current browser origin (ignores NEXT_PUBLIC_SITE_URL so scans do not open production with stale/empty content during dev).
 * 3. NEXT_PUBLIC_SITE_URL — live domain when not on loopback.
 * 4. Current browser origin as fallback.
 */

const PATH = "/resources";

function normalizeBase(raw: string | undefined): string | undefined {
  const t = raw?.trim();
  if (!t) return undefined;
  return t.replace(/\/$/, "");
}

/** True for localhost and typical LAN IPs — QR should use this origin so phones reach the same dev server. */
function isLocalOrLanHost(host: string): boolean {
  if (host === "localhost" || host === "127.0.0.1") return true;
  const m = /^(\d+)\.(\d+)\.\d+\.\d+$/.exec(host);
  if (!m) return false;
  const a = Number(m[1]);
  const b = Number(m[2]);
  if (a === 10) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  return false;
}

export function getResourcesPagePublicUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_RESOURCES_PUBLIC_URL?.trim();
  if (explicit) {
    try {
      return new URL(explicit).href;
    } catch {
      /* invalid — fall through */
    }
  }

  if (typeof window !== "undefined") {
    const host = window.location.hostname;

    if (isLocalOrLanHost(host)) {
      return new URL(PATH, window.location.origin).href;
    }

    const siteBase = normalizeBase(process.env.NEXT_PUBLIC_SITE_URL);
    if (siteBase) {
      try {
        return new URL(PATH, siteBase).href;
      } catch {
        /* fall through */
      }
    }

    return new URL(PATH, window.location.origin).href;
  }

  const siteBase = normalizeBase(process.env.NEXT_PUBLIC_SITE_URL);
  if (siteBase) {
    try {
      return new URL(PATH, siteBase).href;
    } catch {
      /* */
    }
  }

  return "";
}
