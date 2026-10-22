const STAGES = ['submitted', 'screening', 'interview', 'offer', 'hired', 'rejected', 'on-hold'];

function dated(value) {
  const date = value ? new Date(value) : new Date();
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function applicationReceived({ name, jobTitle, reference, submittedAt }) {
  return {
    subject: `Application received — ${reference}`,
    body: `Dear ${name},

Thank you for applying to KICCPA.

Role: ${jobTitle}
Reference: ${reference}
Submitted: ${dated(submittedAt)}

We have your application and the documents you attached. You do not need to send them again.

What happens next
1. The talent team reviews new applications within 5 working days.
2. If your profile matches the role, we write to you to arrange a short screening conversation.
3. Shortlisted candidates receive an interview invitation with the format and the time.
4. After the interview, we confirm the outcome: a further step, an offer, or a close of this application.

This message confirms that the application was stored. It is not a hiring decision. If the stage changes, you will receive a separate note with the same reference number.

KICCPA Talent Team
info@kiccpa.com`,
  };
}

function stageLetter({ status, name, jobTitle, reference }) {
  const letters = {
    submitted: {
      subject: `Application received — ${reference}`,
      body: `Dear ${name},

This note confirms that your application for ${jobTitle} is with the KICCPA talent team.

Reference: ${reference}

We review new applications within 5 working days. You will hear from us if we move your application to screening or if we close it.

KICCPA Talent Team
info@kiccpa.com`,
    },
    screening: {
      subject: `Your application is in review — ${reference}`,
      body: `Dear ${name},

Your application for ${jobTitle} is now in screening.

Reference: ${reference}

A member of the talent team is comparing your profile with the role. This stage usually takes a few working days. We will write again if we invite you to an interview, or if we close the application.

You do not need to send any further documents unless we ask for them.

KICCPA Talent Team
info@kiccpa.com`,
    },
    interview: {
      subject: `Interview invitation — ${jobTitle}`,
      body: `Dear ${name},

We would like to invite you to an interview for ${jobTitle}.

Reference: ${reference}

Please reply to this email with two or three times you can meet in the coming week, and the time zone you will use. We will confirm the format, the meeting link or location, and who you will meet.

Bring a short example of work that matches this role. You do not need to re-send your resume.

KICCPA Talent Team
info@kiccpa.com`,
    },
    offer: {
      subject: `Next step on your application — ${reference}`,
      body: `Dear ${name},

We would like to move your application for ${jobTitle} to an offer discussion.

Reference: ${reference}

A member of the team will contact you with the role details, the proposed start, and the documents we need before a final confirmation. Please wait for that note before resigning from a current role or making travel plans.

KICCPA Talent Team
info@kiccpa.com`,
    },
    hired: {
      subject: `Welcome to KICCPA — ${jobTitle}`,
      body: `Dear ${name},

We are pleased to confirm your selection for ${jobTitle}.

Reference: ${reference}

Human resources will send the joining details, the documents we still need, and your first-day contact. Please reply if any of your contact details have changed.

KICCPA Talent Team
info@kiccpa.com`,
    },
    rejected: {
      subject: `Update on your application — ${reference}`,
      body: `Dear ${name},

Thank you for the time you gave to your application for ${jobTitle}.

Reference: ${reference}

We have closed this application. Another candidate was a closer match for the requirements of this role. This decision applies only to this opening.

We will keep your details for this recruitment process as agreed when you applied. You are welcome to apply again when a suitable role is published.

KICCPA Talent Team
info@kiccpa.com`,
    },
    'on-hold': {
      subject: `Your application is on hold — ${reference}`,
      body: `Dear ${name},

Your application for ${jobTitle} is on hold.

Reference: ${reference}

The role is paused, or we are waiting for an internal decision before the next step. You do not need to take any action. We will write again if the application moves forward or if we close it.

KICCPA Talent Team
info@kiccpa.com`,
    },
  };
  return letters[status] || letters.submitted;
}

function welcomeLetter({ name, email, roleLabel, password, signInUrl }) {
  return {
    subject: 'Your KICCPA desk access',
    body: `Dear ${name},

A super admin has created your KICCPA desk account.

Access: ${roleLabel}
Sign in: ${signInUrl}
Email: ${email}
Temporary password: ${password}

Use this password the first time you sign in. Ask the super admin if you want it changed. Do not forward this message.

KICCPA`,
  };
}

function resetLetter({ name, link }) {
  return {
    subject: 'Reset your KICCPA desk password',
    body: `Dear ${name},

A super admin asked for a new password on your KICCPA desk account.

Open this link and choose a new password. It expires in 24 hours.

${link}

If you did not expect this, you can ignore the message. Your current password keeps working until you complete the reset.

KICCPA`,
  };
}

function interviewInvite({ name, jobTitle, reference, round, when, mode, link, place, interviewer }) {
  const where = mode === 'offline'
    ? `Place: ${place}\nThis meeting is in person. There is no video link.`
    : `Meeting: ${link}`;
  return {
    subject: `${round || 'Interview'} — ${jobTitle}`,
    body: `Dear ${name},

You are invited to ${round || 'an interview'} for ${jobTitle}.

Reference: ${reference}
Round: ${round || 'Interview'}
When: ${when}
${where}
With: ${interviewer || 'the KICCPA hiring team'}

Reply to this email if this time does not work. You do not need to send your resume again.

KICCPA Talent Team
info@kiccpa.com`,
  };
}

function interviewerNote({ interviewer, candidate, jobTitle, reference, round, when, mode, link, place, actor }) {
  const where = mode === 'offline' ? `Place: ${place}` : `Meeting: ${link}`;
  return {
    subject: `${round || 'Interview'} to take: ${candidate} — ${jobTitle}`,
    body: `Hello ${interviewer},

${actor} shared an interview with you.

Candidate: ${candidate}
Role: ${jobTitle}
Reference: ${reference}
Round: ${round || 'Interview'}
When: ${when}
${where}

Open the hiring desk to read the application before the meeting.

KICCPA`,
  };
}

function managerAssigned({ name, candidate, jobTitle, reference, round, actor, link }) {
  return {
    subject: `Interview assigned: ${candidate} — ${round || 'Interview'}`,
    body: `Hello ${name},

${actor} assigned you ${round || 'an interview'} for ${jobTitle}.

Candidate: ${candidate}
Reference: ${reference}
Round: ${round || 'Interview'}

Open the application in the hiring desk, then send the candidate an online meeting link or record an in-person meeting.

${link}

KICCPA`,
  };
}

function joiningPack({ name, jobTitle, reference, link, earliest, latest }) {
  const window = earliest && latest ? `Choose a joining date from ${earliest} to ${latest}.` : 'Choose the joining date you can meet.';
  return {
    subject: `Private joining steps — ${reference}`,
    body: `Dear ${name},

The next step for ${jobTitle} is a private page. It is only for you.

Reference: ${reference}
Open: ${link}

On that page you can accept the offer, raise a written concern, or decline. ${window} You will also be asked to confirm confidentiality, workplace conduct, and that KICCPA may keep the employment documents privately. Upload only the documents listed there.

Do not forward this link. Do not resign from a current role, or make travel plans, until human resources confirms your joining date in writing. This page is not an employment contract.

The link expires in 21 days.

KICCPA Talent Team
info@kiccpa.com`,
  };
}

function joiningConfirmed({ name, jobTitle, reference, date }) {
  return {
    subject: `Joining date confirmed — ${reference}`,
    body: `Dear ${name},

Human resources has confirmed your joining date for ${jobTitle}.

Reference: ${reference}
Joining date: ${date}

Bring the originals of the documents you uploaded so they can be checked on your first day. This note confirms the date. Your employment terms remain those in the offer human resources shares with you.

KICCPA Talent Team
info@kiccpa.com`,
  };
}

function joiningUpdate({ actor, candidate, jobTitle, reference, decision, detail }) {
  return {
    subject: `Joining pack ${decision} — ${candidate}`,
    body: `Hello,

${candidate} updated the private joining pack for ${jobTitle}.

Reference: ${reference}
Decision: ${decision}
${detail}

Sent to the hiring desk by ${actor}.

KICCPA`,
  };
}

module.exports = { STAGES, applicationReceived, stageLetter, welcomeLetter, resetLetter, interviewInvite, interviewerNote, managerAssigned, joiningPack, joiningConfirmed, joiningUpdate };
