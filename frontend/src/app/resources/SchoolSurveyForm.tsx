"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle2, Sparkles } from "lucide-react";
import styles from "./SchoolSurveyForm.module.css";
import {
  CHALLENGE_OPTIONS,
  CURRICULUM_OPTIONS,
  DEMO_MODE_OPTIONS,
  DEMO_SOLUTION_OPTIONS,
  GOAL_OPTIONS,
} from "./schoolSurveyOptions";

const STEPS = [
  "School information",
  "Current challenges",
  "Digital transformation goals",
  "Current systems",
  "Demo request",
];

type FormState = {
  schoolName: string;
  curriculum: string[];
  curriculumOther: string;
  contactName: string;
  designation: string;
  mobile: string;
  email: string;
  challenges: string[];
  challengesOther: string;
  goals: string[];
  goalsOther: string;
  usingSystems: "yes" | "no" | "unsure" | "";
  currentSystemName: string;
  demoSolutions: string[];
  demoMode: string;
  preferredDateTime: string;
  company_website: string;
};

const initial: FormState = {
  schoolName: "",
  curriculum: [],
  curriculumOther: "",
  contactName: "",
  designation: "",
  mobile: "",
  email: "",
  challenges: [],
  challengesOther: "",
  goals: [],
  goalsOther: "",
  usingSystems: "",
  currentSystemName: "",
  demoSolutions: [],
  demoMode: "",
  preferredDateTime: "",
  company_website: "",
};

function toggleId(list: string[], id: string): string[] {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}

export default function SchoolSurveyForm() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ referenceId: string } | null>(null);

  const progress = useMemo(() => ((step + 1) / STEPS.length) * 100, [step]);

  const validateStep = (s: number): boolean => {
    setError(null);
    if (s === 0) {
      if (form.schoolName.trim().length < 2) {
        setError("Please enter your school name.");
        return false;
      }
      if (form.contactName.trim().length < 2) {
        setError("Please enter the contact person name.");
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
        setError("Please enter a valid email address.");
        return false;
      }
    }
    return true;
  };

  const next = () => {
    if (!validateStep(step)) return;
    setStep((x) => Math.min(x + 1, STEPS.length - 1));
  };

  const back = () => {
    setError(null);
    setStep((x) => Math.max(x - 1, 0));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(0)) {
      setStep(0);
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/school-surveys", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          schoolName: form.schoolName,
          curriculum: form.curriculum,
          curriculumOther: form.curriculumOther,
          contactName: form.contactName,
          designation: form.designation,
          mobile: form.mobile,
          email: form.email,
          challenges: form.challenges,
          challengesOther: form.challengesOther,
          goals: form.goals,
          goalsOther: form.goalsOther,
          usingSystems: form.usingSystems,
          currentSystemName: form.currentSystemName,
          demoSolutions: form.demoSolutions,
          demoMode: form.demoMode,
          preferredDateTime: form.preferredDateTime,
          company_website: form.company_website,
        }),
      });
      const raw = await res.text();
      let data: Record<string, unknown> = {};
      if (raw) {
        try {
          data = JSON.parse(raw) as Record<string, unknown>;
        } catch {
          setError(`Server returned an invalid response (${res.status}). Is the backend running?`);
          return;
        }
      }
      if (!res.ok) {
        const errMsg =
          typeof data.error === "string"
            ? data.error
            : typeof data.message === "string"
              ? data.message
              : res.status === 502 || res.status === 503
                ? "Could not reach the server. Start the backend (port 5000) and try again."
                : `Request failed (${res.status}). Please try again.`;
        setError(errMsg);
        return;
      }
      const ref = data.referenceId;
      if (typeof ref !== "string") {
        setError("Submitted, but no reference id was returned. Please contact us if you need confirmation.");
        return;
      }
      setDone({ referenceId: ref });
      setForm(initial);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const slide = reduce ? {} : { initial: { opacity: 0, x: 24 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -16 } };

  return (
    <section id="survey" className={styles.formSection} aria-labelledby="survey-heading">
      <div className={styles.inner}>
        <header className={styles.introCard}>
          <p className={styles.introEyebrow}>
            <span className={styles.introEyebrowDot} aria-hidden />
            KICCPA — AI Powered LMS, SMS &amp; HRMS
          </p>
          <h2 id="survey-heading" className={styles.introTitle}>
            School Digital Transformation Survey &amp; <em>Demo Request</em>
          </h2>
          <p className={styles.introDesc}>
            Thank you for your interest in KICCPA AI-Powered Education Solutions. Complete this short survey so we can
            understand your institution&apos;s challenges, digital transformation goals, and requirements for LMS, SMS,
            and HRMS. We support schools in Kuwait and the GCC with scalable, AI-powered platforms for academic growth,
            operational efficiency, and future-ready transformation.
          </p>
        </header>

        <div className={styles.formShell}>
          {done ? (
            <motion.div
              className={styles.successCard}
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <div className={styles.successIcon}>
                <CheckCircle2 size={36} strokeWidth={2.25} />
              </div>
              <h3 className={styles.successTitle}>Thank you</h3>
              <p className={styles.successRef}>Reference: {done.referenceId}</p>
              <p className={styles.successText}>
                We received your survey. Our team will review your responses and contact you to arrange a free demo
                tailored to your school&apos;s goals.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={step === STEPS.length - 1 ? submit : (e) => e.preventDefault()} noValidate>
              <input
                className={styles.honeypot}
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                value={form.company_website}
                onChange={(e) => setForm((f) => ({ ...f, company_website: e.target.value }))}
              />

              <div className={styles.progressWrap}>
                <div className={styles.progressLabels}>
                  <span>
                    Step {step + 1} of {STEPS.length}
                  </span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className={styles.progressTrack} aria-hidden>
                  <motion.div
                    className={styles.progressFill}
                    initial={false}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: "spring", stiffness: 120, damping: 22 }}
                  />
                </div>
                <div className={styles.stepDots} role="tablist" aria-label="Form steps">
                  {STEPS.map((label, i) => (
                    <span
                      key={label}
                      className={`${styles.stepDot} ${i === step ? styles.active : ""} ${i < step ? styles.done : ""}`}
                      aria-current={i === step ? "step" : undefined}
                    />
                  ))}
                </div>
              </div>

              {error && (
                <div className={styles.errorBanner} role="alert">
                  {error}
                </div>
              )}

              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div key="s0" {...slide} transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}>
                    <h3 className={styles.stepTitle}>1. School information</h3>
                    <div className={styles.fieldGrid}>
                      <div>
                        <label className={styles.label} htmlFor="schoolName">
                          School name
                        </label>
                        <input
                          id="schoolName"
                          className={styles.input}
                          value={form.schoolName}
                          onChange={(e) => setForm((f) => ({ ...f, schoolName: e.target.value }))}
                          required
                          autoComplete="organization"
                        />
                      </div>
                      <div>
                        <span className={styles.label}>Curriculum</span>
                        <div className={`${styles.checkboxGrid} ${styles.twoCol}`}>
                          {CURRICULUM_OPTIONS.map((o) => (
                            <label
                              key={o.id}
                              className={`${styles.checkRow} ${form.curriculum.includes(o.id) ? styles.selected : ""}`}
                            >
                              <input
                                type="checkbox"
                                checked={form.curriculum.includes(o.id)}
                                onChange={() =>
                                  setForm((f) => ({ ...f, curriculum: toggleId(f.curriculum, o.id) }))
                                }
                              />
                              <span className={styles.checkLabel}>{o.label}</span>
                            </label>
                          ))}
                        </div>
                        {form.curriculum.includes("Other") && (
                          <div style={{ marginTop: 12 }}>
                            <label className={styles.label} htmlFor="curriculumOther">
                              Other curriculum
                            </label>
                            <input
                              id="curriculumOther"
                              className={styles.input}
                              value={form.curriculumOther}
                              onChange={(e) => setForm((f) => ({ ...f, curriculumOther: e.target.value }))}
                              placeholder="Specify"
                            />
                          </div>
                        )}
                      </div>
                      <div className={`${styles.fieldGrid} ${styles.two}`}>
                        <div>
                          <label className={styles.label} htmlFor="contactName">
                            Contact person name
                          </label>
                          <input
                            id="contactName"
                            className={styles.input}
                            value={form.contactName}
                            onChange={(e) => setForm((f) => ({ ...f, contactName: e.target.value }))}
                            autoComplete="name"
                          />
                        </div>
                        <div>
                          <label className={styles.label} htmlFor="designation">
                            Designation
                          </label>
                          <input
                            id="designation"
                            className={styles.input}
                            value={form.designation}
                            onChange={(e) => setForm((f) => ({ ...f, designation: e.target.value }))}
                          />
                        </div>
                        <div>
                          <label className={styles.label} htmlFor="mobile">
                            Mobile number
                          </label>
                          <input
                            id="mobile"
                            className={styles.input}
                            type="tel"
                            value={form.mobile}
                            onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value }))}
                            autoComplete="tel"
                          />
                        </div>
                        <div>
                          <label className={styles.label} htmlFor="email">
                            Email address
                          </label>
                          <input
                            id="email"
                            className={styles.input}
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                            autoComplete="email"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div key="s1" {...slide} transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}>
                    <h3 className={styles.stepTitle}>2. Current challenges / pain points</h3>
                    <p className={styles.introDesc} style={{ textAlign: "left", marginBottom: 18, fontSize: "0.88rem" }}>
                      Select the areas where your school currently faces challenges.
                    </p>
                    <div className={`${styles.checkboxGrid} ${styles.twoCol}`}>
                      {CHALLENGE_OPTIONS.map((o) => (
                        <label
                          key={o.id}
                          className={`${styles.checkRow} ${form.challenges.includes(o.id) ? styles.selected : ""}`}
                        >
                          <input
                            type="checkbox"
                            checked={form.challenges.includes(o.id)}
                            onChange={() =>
                              setForm((f) => ({ ...f, challenges: toggleId(f.challenges, o.id) }))
                            }
                          />
                          <span className={styles.checkLabel}>{o.label}</span>
                        </label>
                      ))}
                    </div>
                    <div style={{ marginTop: 16 }}>
                      <label className={styles.label} htmlFor="challengesOther">
                        Other (optional)
                      </label>
                      <textarea
                        id="challengesOther"
                        className={styles.textarea}
                        value={form.challengesOther}
                        onChange={(e) => setForm((f) => ({ ...f, challengesOther: e.target.value }))}
                        rows={3}
                      />
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="s2" {...slide} transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}>
                    <h3 className={styles.stepTitle}>3. Long-term digital transformation goals</h3>
                    <p className={styles.introDesc} style={{ textAlign: "left", marginBottom: 18, fontSize: "0.88rem" }}>
                      Select your institution&apos;s future priorities.
                    </p>
                    <div className={`${styles.checkboxGrid} ${styles.twoCol}`}>
                      {GOAL_OPTIONS.map((o) => (
                        <label
                          key={o.id}
                          className={`${styles.checkRow} ${form.goals.includes(o.id) ? styles.selected : ""}`}
                        >
                          <input
                            type="checkbox"
                            checked={form.goals.includes(o.id)}
                            onChange={() => setForm((f) => ({ ...f, goals: toggleId(f.goals, o.id) }))}
                          />
                          <span className={styles.checkLabel}>{o.label}</span>
                        </label>
                      ))}
                    </div>
                    <div style={{ marginTop: 16 }}>
                      <label className={styles.label} htmlFor="goalsOther">
                        Other (optional)
                      </label>
                      <textarea
                        id="goalsOther"
                        className={styles.textarea}
                        value={form.goalsOther}
                        onChange={(e) => setForm((f) => ({ ...f, goalsOther: e.target.value }))}
                        rows={3}
                      />
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="s3" {...slide} transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}>
                    <h3 className={styles.stepTitle}>4. Current systems</h3>
                    <p className={styles.label}>Are you using any LMS, SMS, or HRMS platform today?</p>
                    <div className={styles.radioRow}>
                      {(
                        [
                          ["yes", "Yes"],
                          ["no", "No"],
                          ["unsure", "Not sure"],
                        ] as const
                      ).map(([val, label]) => (
                        <label
                          key={val}
                          className={`${styles.radioPill} ${form.usingSystems === val ? styles.active : ""}`}
                        >
                          <input
                            type="radio"
                            name="usingSystems"
                            checked={form.usingSystems === val}
                            onChange={() => setForm((f) => ({ ...f, usingSystems: val }))}
                          />
                          {label}
                        </label>
                      ))}
                    </div>
                    <div style={{ marginTop: 20 }}>
                      <label className={styles.label} htmlFor="currentSystemName">
                        If yes, system name (optional)
                      </label>
                      <input
                        id="currentSystemName"
                        className={styles.input}
                        value={form.currentSystemName}
                        onChange={(e) => setForm((f) => ({ ...f, currentSystemName: e.target.value }))}
                        placeholder="Vendor or product name"
                      />
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="s4" {...slide} transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}>
                    <h3 className={styles.stepTitle}>5. Demo session request</h3>
                    <span className={styles.label}>Interested solutions</span>
                    <div className={`${styles.checkboxGrid} ${styles.twoCol}`} style={{ marginBottom: 20 }}>
                      {DEMO_SOLUTION_OPTIONS.map((o) => (
                        <label
                          key={o.id}
                          className={`${styles.checkRow} ${form.demoSolutions.includes(o.id) ? styles.selected : ""}`}
                        >
                          <input
                            type="checkbox"
                            checked={form.demoSolutions.includes(o.id)}
                            onChange={() =>
                              setForm((f) => ({ ...f, demoSolutions: toggleId(f.demoSolutions, o.id) }))
                            }
                          />
                          <span className={styles.checkLabel}>{o.label}</span>
                        </label>
                      ))}
                    </div>
                    <span className={styles.label}>Preferred demo mode</span>
                    <div className={styles.radioRow} style={{ marginBottom: 20 }}>
                      {DEMO_MODE_OPTIONS.map((o) => (
                        <label
                          key={o.id}
                          className={`${styles.radioPill} ${form.demoMode === o.id ? styles.active : ""}`}
                        >
                          <input
                            type="radio"
                            name="demoMode"
                            checked={form.demoMode === o.id}
                            onChange={() => setForm((f) => ({ ...f, demoMode: o.id }))}
                          />
                          {o.label}
                        </label>
                      ))}
                    </div>
                    <div>
                      <label className={styles.label} htmlFor="preferredDateTime">
                        Preferred date &amp; time
                      </label>
                      <input
                        id="preferredDateTime"
                        className={styles.input}
                        value={form.preferredDateTime}
                        onChange={(e) => setForm((f) => ({ ...f, preferredDateTime: e.target.value }))}
                        placeholder="e.g. Week of June 2, mornings Kuwait time"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className={styles.navRow}>
                <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={back} disabled={step === 0 || submitting}>
                  <ChevronLeft size={18} />
                  Back
                </button>
                {step < STEPS.length - 1 ? (
                  <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={next}>
                    Next
                    <ChevronRight size={18} />
                  </button>
                ) : (
                  <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`} disabled={submitting}>
                    {submitting ? "Sending…" : (
                      <>
                        <Sparkles size={18} />
                        Submit survey
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          )}

          <p className={styles.footerNote}>
            <strong>Kuwait International Company for Computer Programming Activities (KICCPA)</strong>
            <br />
            Digital Transformation · IT Solutions · AI Solutions · AI Media Solutions · AI Powered LMS | SMS | HRMS
          </p>
        </div>
      </div>
    </section>
  );
}
