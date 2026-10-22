"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { applicationLetters, assignInterview, sendInterview, updateApplication } from "@/lib/recruitment-actions";
import styles from "../desk.module.css";

const stages = ["submitted", "screening", "interview", "offer", "hired", "rejected", "on-hold"];
const criteria = [
  ["role", "Role knowledge"],
  ["problem", "Problem solving"],
  ["communication", "Communication"],
  ["experience", "Relevant experience"],
  ["fit", "Professional fit"],
] as const;

type Manager = { name: string; email: string; title?: string; department?: string };

export default function ApplicationDesk({ id, status, rounds = [], canHire = true, managers = [] }: { id: string; status: string; rounds?: string[]; canHire?: boolean; managers?: Manager[] }) {
  const router = useRouter();
  const [next, setNext] = useState(status);
  const [note, setNote] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [letters, setLetters] = useState<Record<string, { subject: string; body: string }>>({});
  const [sendEmail, setSendEmail] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [score, setScore] = useState({ role: "3", problem: "3", communication: "3", experience: "3", fit: "3", recommendation: "hold", interviewer: "", comment: "" });
  const [meeting, setMeeting] = useState({ round: rounds[0] || "Interview", when: "", mode: "online" as "online" | "offline", link: "", place: "", interviewer: "", interviewerEmail: "" });
  const [assignee, setAssignee] = useState(managers[0]?.email || "");

  useEffect(() => {
    if (!canHire) return undefined;
    let live = true;
    applicationLetters(id).then((data) => {
      if (!live) return;
      setLetters(data.letters);
      const first = data.letters[status];
      if (first) {
        setSubject(first.subject);
        setBody(first.body);
      }
    }).catch(() => {
      if (live) setError("The letter templates could not be loaded.");
    });
    return () => { live = false; };
  }, [canHire, id, status]);

  function chooseStage(value: string) {
    setNext(value);
    const letter = letters[value];
    if (letter) {
      setSubject(letter.subject);
      setBody(letter.body);
    }
  }

  async function saveStage(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    setMessage("");
    try {
      const result = await updateApplication(id, { status: next, note, subject, body, sendEmail });
      if (sendEmail && result.emailed) setMessage("Stage saved and the letter was sent.");
      else if (sendEmail) setMessage(`Stage saved. The letter was not sent${result.emailError ? `: ${result.emailError}` : "."}`);
      else setMessage("Stage saved. No email was sent.");
      setNote("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update the application.");
    }
    setPending(false);
  }

  async function saveScore(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    setMessage("");
    try {
      const result = await updateApplication(id, {
        score: {
          role: Number(score.role),
          problem: Number(score.problem),
          communication: Number(score.communication),
          experience: Number(score.experience),
          fit: Number(score.fit),
          recommendation: score.recommendation,
          interviewer: score.interviewer,
          comment: score.comment,
        },
      });
      setMessage(result.notified ? "Interview score saved. HR has a notice on Profile. The stage stays as it is." : "Interview score saved. It stays on this application and is not emailed.");
      setScore({ ...score, comment: "" });
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save the score.");
    }
    setPending(false);
  }

  return (
    <div>
      {error && <p className={styles.error}>{error}</p>}
      {message && <p className={styles.ok}>{message}</p>}
      {canHire && <form className={styles.form} onSubmit={saveStage}>
        <h2>Stage and letter</h2>
        <p className={styles.muted}>Change the stage, edit the letter if needed, then send it. Leave the box unticked to record the stage without emailing the candidate.</p>
        <label>Stage
          <select value={next} onChange={(e) => chooseStage(e.target.value)}>
            {stages.map((stage) => <option key={stage} value={stage}>{stage}</option>)}
          </select>
        </label>
        <label>Internal note<textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Visible to the hiring team only." /></label>
        <label>Email subject<input value={subject} onChange={(e) => setSubject(e.target.value)} /></label>
        <label>Letter<textarea value={body} onChange={(e) => setBody(e.target.value)} /></label>
        <label className={styles.row}>
          <input type="checkbox" checked={sendEmail} onChange={(e) => setSendEmail(e.target.checked)} />
          <span>Email this letter to the candidate</span>
        </label>
        <button className={styles.btn} type="submit" disabled={pending}>{pending ? "Saving…" : "Save stage"}</button>
      </form>}
      {canHire && (
        <form className={styles.form} onSubmit={async (event) => {
          event.preventDefault();
          setPending(true);
          setError("");
          setMessage("");
          try {
            const result = await assignInterview(id, { round: meeting.round, managerEmail: assignee });
            setMessage(result.emailed ? "The department manager was emailed and the assignment is on this application." : `The assignment is on this application. The email was not sent${result.emailError ? `: ${result.emailError}` : "."}`);
            router.refresh();
          } catch (err) {
            setError(err instanceof Error ? err.message : "Could not assign the manager.");
          }
          setPending(false);
        }}>
          <h2>Assign a department manager</h2>
          <p className={styles.muted}>HR chooses the round and the manager. That person receives an email and a notice on their profile. They then send the meeting, or HR can send it.</p>
          {managers.length === 0 ? <p className={styles.muted}>No department manager yet. A super admin creates one under People, with access set to Department manager.</p> : (
            <div className={styles.grid}>
              <label>Round
                {rounds.length > 0 ? (
                  <select value={meeting.round} onChange={(e) => setMeeting({ ...meeting, round: e.target.value })}>
                    {rounds.map((round) => <option key={round} value={round}>{round}</option>)}
                  </select>
                ) : (
                  <input value={meeting.round} onChange={(e) => setMeeting({ ...meeting, round: e.target.value })} required />
                )}
              </label>
              <label>Manager
                <select value={assignee} onChange={(e) => setAssignee(e.target.value)}>
                  {managers.map((person) => <option key={person.email} value={person.email}>{person.name} · {person.email}</option>)}
                </select>
              </label>
            </div>
          )}
          <button className={styles.btn} type="submit" disabled={pending || managers.length === 0}>Email the manager</button>
        </form>
      )}
      <form className={styles.form} onSubmit={saveScore}>
        <h2>Interview score</h2>
        <p className={styles.muted}>Score 1 as weak and 5 as strong. The average is kept with the interviewer and the recommendation. Add another card after a second interviewer.</p>
        <div className={styles.score}>
          {criteria.map(([key, label]) => (
            <label key={key}>{label}
              <select value={score[key]} onChange={(e) => setScore({ ...score, [key]: e.target.value })}>
                {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </label>
          ))}
        </div>
        <div className={styles.grid}>
          <label>Interviewer<input value={score.interviewer} onChange={(e) => setScore({ ...score, interviewer: e.target.value })} required /></label>
          <label>Recommendation
            <select value={score.recommendation} onChange={(e) => setScore({ ...score, recommendation: e.target.value })}>
              <option value="advance">Advance</option>
              <option value="hold">Hold</option>
              <option value="decline">Decline</option>
            </select>
          </label>
        </div>
        <label>What stood out<textarea value={score.comment} onChange={(e) => setScore({ ...score, comment: e.target.value })} /></label>
        <button className={styles.btn} type="submit" disabled={pending}>{pending ? "Saving…" : "Save score"}</button>
      </form>
      <form className={styles.form} onSubmit={async (event) => {
        event.preventDefault();
        setPending(true);
        setError("");
        setMessage("");
        try {
          const when = meeting.when ? new Date(meeting.when).toLocaleString() : meeting.when;
          const result = await sendInterview(id, { ...meeting, when });
          const team = meeting.interviewerEmail ? (result.teammateEmailed ? " The interviewer was emailed too." : " The interviewer email was not sent.") : "";
          setMessage(result.emailed ? `The candidate was emailed.${team}` : `The meeting was saved on this application, but the email was not sent${result.emailError ? `: ${result.emailError}` : "."}`);
          router.refresh();
        } catch (err) {
          setError(err instanceof Error ? err.message : "Could not send the interview.");
        }
        setPending(false);
      }}>
        <h2>Send the meeting to the applicant</h2>
        <p className={styles.muted}>HR or the assigned department manager can do this. Choose an online link or an in-person place. The candidate is emailed the round, the time, and where to attend. The same details stay on this application.</p>
        <div className={styles.grid}>
          <label>Round
            {rounds.length > 0 ? (
              <select value={meeting.round} onChange={(e) => setMeeting({ ...meeting, round: e.target.value })}>
                {rounds.map((round) => <option key={round} value={round}>{round}</option>)}
              </select>
            ) : (
              <input value={meeting.round} onChange={(e) => setMeeting({ ...meeting, round: e.target.value })} placeholder="Technical round" required />
            )}
          </label>
          <label>How
            <select value={meeting.mode} onChange={(e) => setMeeting({ ...meeting, mode: e.target.value === "offline" ? "offline" : "online" })}>
              <option value="online">Online — meeting link</option>
              <option value="offline">In person — no link</option>
            </select>
          </label>
          <label>When<input type="datetime-local" value={meeting.when} onChange={(e) => setMeeting({ ...meeting, when: e.target.value })} required /></label>
          {meeting.mode === "online" ? (
            <label>Meeting link<input value={meeting.link} onChange={(e) => setMeeting({ ...meeting, link: e.target.value })} placeholder="https://" required /></label>
          ) : (
            <label>Place<input value={meeting.place} onChange={(e) => setMeeting({ ...meeting, place: e.target.value })} placeholder="Office, floor, or city" required /></label>
          )}
          <label>Interviewer name<input value={meeting.interviewer} onChange={(e) => setMeeting({ ...meeting, interviewer: e.target.value })} /></label>
          <label>Also email<input type="email" value={meeting.interviewerEmail} onChange={(e) => setMeeting({ ...meeting, interviewerEmail: e.target.value })} placeholder="Optional teammate" /></label>
        </div>
        <button className={styles.btn} type="submit" disabled={pending}>{pending ? "Sending…" : "Email the interview"}</button>
      </form>
    </div>
  );
}
