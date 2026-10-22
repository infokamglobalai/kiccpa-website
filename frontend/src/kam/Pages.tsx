import Link from "next/link";
import { CtaBand, Faq, PageHero } from "./Blocks";
import AboutView from "./AboutView";
import OpenRoles from "./OpenRoles";
import { JobList } from "./JobList";
import { listPublicJobs } from "@/lib/jobs";
import { howWeWork, industries, products, sourcing } from "./site";
import styles from "./kam.module.css";

export function AboutPage() {
  return <AboutView />;
}

export function ServicesHub() {
  const links = [
    ["/services/it-digital-solutions", "IT & Digital Solutions", "Applications, integrations, CRM, and the learning products already on this site."],
    ["/services/cloud-devops", "Cloud & DevOps", "A conversation about deployment, automation, and operations. No uptime figure is published."],
    ["/services/bot-offshore-delivery", "BOT & Offshore Delivery", "Build and operate a capability. Transfer only if the agreement includes it."],
    ["/services/business-process-outsourcing", "Business Process Outsourcing", "Structured process support, with the Philippines named for operations sourcing."],
    ["/services/hr-recruitment", "HR & Recruitment", "Employer and candidate enquiries, kept separate."],
  ];
  return (
    <main>
      <PageHero eyebrow="Services" title="A portfolio, not a single product." lede="Start with the area closest to the requirement. Existing LMS, demo, and resource pages stay available alongside these routes." />
      <section className={styles.section}>
        <div className={`${styles.wrap} ${styles.cards2}`}>
          {links.map(([href, title, text]) => (
            <Link key={href} href={href} className={styles.plain}>
              <h3>{title}</h3>
              <p>{text}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export function ItPage() {
  const items = [
    ["Web and application development", "Custom software, as already described on this website."],
    ["Frontend and backend development", "Interface and service work shaped around an agreed scope."],
    ["API and system integration", "Connecting the systems a project actually uses."],
    ["Custom business applications", "Tools built for a specific workflow rather than a generic template."],
    ["CRM", "Customer systems, listed among the current service areas."],
    ["Learning platforms", "LearnX materials, EduAiTutors, and the LMS packages on this site."],
    ["AI and automation", "Positioned on the current website. Individual use cases are scoped per project."],
    ["Business digitisation", "Moving an existing process into software, where that is the agreed work."],
  ];
  return (
    <main>
      <PageHero eyebrow="IT & digital solutions" title="Digital solutions designed around your business." lede="From application development to digital platforms and system integration, explore solutions aligned with your business goals." />
      <section className={styles.section}>
        <div className={`${styles.wrap} ${styles.split}`}>
          <div className={styles.frame}><img src="/assets/services/digital.jpg" alt="People collaborating in a technology studio." /></div>
          <div>
            <h2 className={styles.h2}>Capabilities taken from the current site.</h2>
            <p className={styles.muted}>A fixed technology list is not published, and no vendor certification is claimed. Tools are chosen for the engagement.</p>
          </div>
        </div>
        <div className={`${styles.wrap} ${styles.cards3}`} style={{ marginTop: 28 }}>
          {items.map(([title, text]) => <article key={title} className={styles.plain}><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>
      <section className={`${styles.section} ${styles.surface}`}>
        <div className={styles.wrap}>
          <h2 className={styles.h2}>Related routes</h2>
          <div className={styles.rowBtns}>
            <Link className={`${styles.btn} ${styles.btnDark}`} href="/services/cloud-devops">Cloud & DevOps</Link>
            <Link className={`${styles.btn} ${styles.btnLine}`} href="/solutions">Digital platforms</Link>
            <Link className={`${styles.btn} ${styles.btnLine}`} href="/contact?service=it-digital">Discuss your project</Link>
          </div>
        </div>
      </section>
      <OpenRoles department="it-digital" />
    </main>
  );
}

export function CloudPage() {
  const steps = ["Plan", "Develop", "Build", "Test", "Deploy", "Monitor"];
  const caps = ["Cloud infrastructure planning", "CI/CD pipeline implementation", "Deployment automation", "Containerisation and orchestration", "Monitoring and operational visibility", "Backup and recovery planning", "Cloud cost and resource discussion"];
  return (
    <main>
      <PageHero eyebrow="Cloud & DevOps" title="Build, deploy and operate with confidence." lede="Explore cloud infrastructure, automation, deployment workflows, and operational practices that support reliable digital delivery. No uptime percentage or vendor badge is stated here." />
      <section className={styles.section}>
        <div className={styles.wrap}>
          <h2 className={styles.h2}>A delivery pipeline to talk through.</h2>
          <div className={styles.pipeline} aria-label="Plan, develop, build, test, deploy, monitor">
            {steps.map((step, i) => <span key={step} className={styles.pipe}><i>0{i + 1}</i>{step}</span>)}
          </div>
          <div className={styles.cards3} style={{ marginTop: 28 }}>
            {caps.map((cap) => <article key={cap} className={styles.plain}><h3>{cap}</h3><p>Included when it is part of the agreed scope. It is not a standing guarantee.</p></article>)}
          </div>
        </div>
      </section>
      <section className={styles.section} style={{ paddingTop: 0 }}>
        <div className={`${styles.wrap} ${styles.frame}`} style={{ minHeight: 360 }}>
          <img src="/assets/services/cloud.jpg" alt="Abstract structures suggesting layered infrastructure." />
        </div>
      </section>
      <OpenRoles department="cloud-devops" />
      <CtaBand title="Discuss your cloud requirements." text="Describe the environment and the outcome you need. The reply can say whether this team is the right fit." primary={{ href: "/contact?service=cloud-devops", label: "Start with cloud" }} secondary={{ href: "/services/it-digital-solutions", label: "Related IT services" }} />
    </main>
  );
}

export function BotPage() {
  const stages = [
    ["01 Build", "Define the required capability, team structure, responsibilities, delivery process, and operating requirements."],
    ["02 Operate", "Establish and operate the agreed delivery model, workflows, reporting, and management processes."],
    ["03 Transfer", "Where the agreement includes it, prepare a transition against written responsibilities and timing. Transfer is not automatic."],
  ];
  return (
    <main>
      <PageHero eyebrow="BOT & offshore delivery" title="Build your team. Establish operations. Plan your next stage." lede="Explore a Build-Operate-Transfer or offshore delivery approach aligned with your team's requirements, operating model, and long-term objectives." />
      <section className={styles.section}>
        <div className={`${styles.wrap} ${styles.cards3}`}>
          {stages.map(([title, text]) => <article key={title} className={styles.plain}><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>
      <section className={`${styles.section} ${styles.surface}`}>
        <div className={`${styles.wrap} ${styles.split}`}>
          <div>
            <h2 className={styles.h2}>What stays in the agreement.</h2>
            <p className={styles.muted}>Scope, ownership, timing, employment arrangements, and any transfer terms depend on the specific agreement. Governance is the reporting rhythm and responsibilities you write down before work starts.</p>
          </div>
          <Faq items={[
            { q: "Does every BOT engagement include a transfer?", a: "No. Transfer happens only when it is part of the agreed arrangement." },
            { q: "Is an offshore team the same as BOT?", a: "No. A dedicated or offshore team can operate without a transfer stage." },
            { q: "Where is technology sourcing described?", a: "India, including Bengaluru and Hyderabad, is named for technology capabilities. That is a sourcing note, not an owned-office claim." },
          ]} />
        </div>
      </section>
      <OpenRoles department="bot" />
      <CtaBand title="Discuss a BOT model." text="Bring the capability you want to build. The conversation can separate build, operate, and any later transfer." primary={{ href: "/contact?service=bot&model=bot", label: "Discuss a BOT model" }} />
    </main>
  );
}

export function BpoPage() {
  return (
    <main>
      <PageHero eyebrow="Business operations" title="Business operations that support your growth." lede="Explore structured business process support designed around agreed workflows, responsibilities, and service requirements." />
      <section className={styles.section}>
        <div className={`${styles.wrap} ${styles.split}`}>
          <div className={styles.frame}><img src="/assets/services/operations.jpg" alt="Colleagues working together in an office." /></div>
          <div>
            <h2 className={styles.h2}>What can be discussed.</h2>
            <div className={styles.cards2}>
              <article className={styles.plain}><h3>Administrative support</h3><p>Coordination of agreed administrative tasks. Savings are not estimated here.</p></article>
              <article className={styles.plain}><h3>Process support</h3><p>A documented workflow, owners, and a review rhythm.</p></article>
              <article className={styles.plain}><h3>Operational coordination</h3><p>Handoffs between teams, including technology or HR where those are in scope.</p></article>
              <article className={styles.plain}><h3>Sourcing note</h3><p>Business operations are described with the Philippines as the sourcing location. No centre address is published.</p></article>
            </div>
          </div>
        </div>
      </section>
      <OpenRoles department="bpo" />
      <CtaBand title="Discuss your operations." text="Describe the workflow. A reply can suggest whether BPO, a BOT conversation, or an internal change is the better next step." primary={{ href: "/contact?service=bpo", label: "Talk about operations" }} secondary={{ href: "/services/hr-recruitment", label: "Related HR services" }} />
    </main>
  );
}

export function HrPage() {
  const steps = ["Understand role requirements", "Define candidate criteria", "Source relevant candidates", "Coordinate screening and interviews", "Support the hiring steps that were agreed"];
  return (
    <main>
      <PageHero eyebrow="HR & recruitment" title="The right people. The right capabilities." lede="Explore recruitment and workforce solutions aligned with your organisation's roles, requirements, and delivery model. Hiring timelines and talent-pool sizes are not published." />
      <section className={styles.section}>
        <div className={`${styles.wrap} ${styles.split}`}>
          <div className={styles.frame}><img src="/assets/services/people.jpg" alt="A recruitment conversation in a modern meeting room." /></div>
          <ol className={styles.timeline} style={{ gridTemplateColumns: "1fr" }}>
            {steps.map((step, i) => <li key={step} className={styles.step}><span className={styles.num}>0{i + 1}</span><strong>{step}</strong></li>)}
          </ol>
        </div>
      </section>
      <section className={`${styles.section} ${styles.surface}`}>
        <div className={styles.wrap}>
          <p className={styles.muted}>Sourcing for HR and recruitment is described across India and the Philippines.</p>
          <div className={styles.rowBtns}>
            <Link className={`${styles.btn} ${styles.btnDark}`} href="/contact?service=hr">Employer enquiry</Link>
            <Link className={`${styles.btn} ${styles.btnLine}`} href="/careers">Candidate enquiry</Link>
          </div>
          <div style={{ marginTop: 28 }}>
            <Faq items={[
              { q: "Are candidates and employers the same form?", a: "No. Employers use the contact form. Candidates apply to a published role on the careers page." },
              { q: "Do you promise a placement?", a: "No. Submitting an application stores it for review. It is not an offer." },
            ]} />
          </div>
        </div>
      </section>
      <OpenRoles department="hr" />
    </main>
  );
}

export function SolutionsPage() {
  return (
    <main>
      <PageHero eyebrow="Solutions" title="Platforms the company already describes." lede="LearnX is the school platform. EduAiTutors is the coaching site. Each card opens the live product." />
      <section className={styles.section}>
        <div className={styles.wrap} style={{ display: "grid", gap: 28 }}>
          {products.map((product) => (
            <article key={product.name} className={styles.split}>
              <div className={styles.frame} style={{ minHeight: 280 }}>
                <img src="/assets/products/platform.jpg" alt={`Conceptual interface illustration beside the ${product.name} description. Not a live product screenshot.`} />
              </div>
              <div>
                <p className={styles.kicker}>{product.status}</p>
                <h2 className={styles.h2}>{product.name}</h2>
                <p className={styles.muted}>{product.text}</p>
                <ul>{product.points.map((point) => <li key={point}>{point}</li>)}</ul>
                {product.external ? <a className={styles.textLink} href={product.href} target="_blank" rel="noreferrer">{product.cta} →</a> : <Link className={styles.textLink} href={product.href}>{product.cta} →</Link>}
              </div>
            </article>
          ))}
          <article className={styles.plain}>
            <h2 className={styles.h2}>Custom digital platforms</h2>
            <p>When a packaged product is not the right fit, application work can be scoped around the process you describe. That work is a project, not a product already in market.</p>
            <Link className={styles.textLink} href="/contact?service=platforms">Discuss a custom platform →</Link>
          </article>
        </div>
      </section>
      <OpenRoles department="platforms" />
    </main>
  );
}

export function IndustriesPage() {
  return (
    <main>
      <PageHero eyebrow="Industries" title="Relevant contexts, without invented case studies." lede="Education platforms and enterprise software are already part of this website. Other industries are places a conversation can start." />
      <section className={styles.section}>
        <div className={`${styles.wrap} ${styles.cards2}`}>
          {industries.map((industry) => (
            <article key={industry.slug} id={industry.slug} className={styles.plain}>
              <div className={styles.frame} style={{ minHeight: 220, marginBottom: 16 }}>
                <img src={industry.image} alt={industry.alt} />
              </div>
              <p className={styles.kicker}>{industry.verified ? "Represented on this site" : "Open for discussion"}</p>
              <h2>{industry.title}</h2>
              <p>{industry.text}</p>
              <Link className={styles.textLink} href={`/contact?service=${industry.slug === "education" ? "platforms" : "other"}`}>Discuss {industry.title.toLowerCase()} →</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export function GlobalPage() {
  return (
    <main>
      <PageHero eyebrow="Global delivery" title="Global capabilities. Connected delivery." lede="Sourcing notes from the project material: technology in India, business operations in the Philippines, and HR across both. Kuwait, Kenya, and Tunisia appear as contact destinations, not as a map of owned offices." />
      <section className={styles.section}>
        <div className={`${styles.wrap} ${styles.cards3}`}>
          {sourcing.map((item) => (
            <article key={item.id} className={styles.plain}>
              <h3>{item.label}</h3>
              <p>{item.summary}</p>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>
      <section className={`${styles.section} ${styles.surface}`}>
        <div className={styles.wrap}>
          <h2 className={styles.h2}>How a delivery conversation runs.</h2>
          <ol className={styles.timeline}>
            {howWeWork.map((step) => <li key={step.n} className={styles.step}><span className={styles.num}>{step.n}</span><strong>{step.title}</strong><p>{step.text}</p></li>)}
          </ol>
          <div className={styles.rowBtns} style={{ marginTop: 20 }}>
            <Link className={`${styles.btn} ${styles.btnDark}`} href="/contact?service=bot">Enquire about delivery</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export async function CareersPage() {
  const { jobs, database } = await listPublicJobs();
  return (
    <main className={styles.sv}>
      <section className={styles.svHero}>
        <div className={styles.wrap}>
          <p className={styles.svEyebrow}>Careers</p>
          <h1>Build your next chapter with us.</h1>
          <p>Open roles are published by the KICCPA hiring team. Choose a role to read the brief and send a complete application. A general note is not a vacancy.</p>
        </div>
      </section>
      <section className={styles.svSection}>
        <div className={styles.wrap}>
          {!database && <p className={styles.muted}>The hiring database is not connected, so live roles cannot be shown yet.</p>}
          {database && jobs.length === 0 && (
            <article className={styles.plain}>
              <h2>No open roles right now</h2>
              <p>When HR publishes a role, it appears here and on the matching service page. There is no general application until a role is posted.</p>
            </article>
          )}
          {jobs.length > 0 && <JobList jobs={jobs} />}
        </div>
      </section>
    </main>
  );
}

export function LegalPage({ kind }: { kind: "privacy" | "terms" | "cookies" }) {
  const title = kind === "privacy" ? "Privacy policy" : kind === "terms" ? "Terms of use" : "Cookie policy";
  const lede = kind === "privacy"
    ? "How KICCPA handles information people send through this website."
    : kind === "terms"
      ? "The rules for using this website."
      : "What this website stores in the browser, and how to change or clear it.";
  return (
    <main>
      <PageHero eyebrow="KICCPA" title={title} lede={lede} />
      <section className={styles.section}>
        <article className={`${styles.wrap} ${styles.legal} ${styles.prose}`}>
          {kind === "privacy" && (
            <>
              <h2>Who this describes</h2>
              <p>This policy is for the KICCPA website, published by Kuwait International Company for Computer Programming Activities. Questions about your information can go to info@kiccpa.com.</p>
              <h2>What people send us</h2>
              <ul>
                <li>Contact and demo forms: name, email, phone if you enter it, the topic, and the message.</li>
                <li>Careers: the application form, a resume, and any documents the role asks for. Those files are kept for the hiring team. They are not shown on a public page.</li>
                <li>Updates: an email address, and only after you open the confirmation message. You can unsubscribe from any update.</li>
              </ul>
              <h2>Why it is kept</h2>
              <p>Enquiries are kept so the team can reply. Applications are kept for that hiring process. A confirmed subscription is kept until you unsubscribe or ask for it to be removed. Cookie choices are kept in your browser for about six months so the site does not ask again on every visit.</p>
              <h2>Who sees it</h2>
              <p>The hiring and enquiry records are for the KICCPA team that handles them. They are not published on the website. Mail is sent through the company mailbox configured for this site.</p>
              <h2>Your choices</h2>
              <p>You can ask info@kiccpa.com for a copy of what you sent, a correction, or deletion, except where a hiring or legal record still has to be kept. You can unsubscribe from updates with the link in each message. You can change or clear cookies from Cookie settings in the footer.</p>
            </>
          )}
          {kind === "terms" && (
            <>
              <h2>Using the site</h2>
              <p>The pages describe KICCPA services, products, and open roles. They are not an offer of employment, a contract, or a promise that a role is still open. A job is open only while it is published on Careers.</p>
              <h2>Accounts and forms</h2>
              <p>Staff sign in to the private desk. Visitors do not need an account to read the site, send an enquiry, apply for a role, or subscribe. You agree that the details you submit are accurate and that you may send them.</p>
              <h2>Updates</h2>
              <p>A subscription starts only after you confirm the email. You can stop it at any time from the link in a message. Stopping updates does not delete a job application or an enquiry you already sent.</p>
              <h2>The company’s material</h2>
              <p>Text, names, and the KICCPA mark on this site belong to the company or its licensors. You may read them and share a link. You may not copy the site or present it as your own.</p>
              <h2>Contact</h2>
              <p>Questions about these terms can go to info@kiccpa.com.</p>
            </>
          )}
          {kind === "cookies" && (
            <>
              <h2>The choice</h2>
              <p>On your first visit you can accept all, keep only necessary cookies, or open settings and choose. You can change this later from Cookie settings in the footer, or clear the saved choice so the question is shown again.</p>
              <h2>Necessary</h2>
              <p>These remember the choice you just made. The private staff desk also uses a sign-in cookie. Necessary cookies stay on, because the site cannot remember your choice or keep a staff session without them.</p>
              <h2>Functional</h2>
              <p>These remember a language or region choice and whether motion is reduced. They are off until you allow them. Choosing only necessary cookies clears those saved preferences.</p>
              <h2>Analytics and marketing</h2>
              <p>This website does not set an advertising or analytics cookie. The settings still include those switches, and both stay off unless you allow them, so a later tool cannot run without a new choice.</p>
              <h2>Email updates are not a cookie</h2>
              <p>Asking for insights and company updates is a separate choice. It needs your email and a confirmation from your inbox. Accepting cookies does not subscribe you.</p>
            </>
          )}
        </article>
      </section>
    </main>
  );
}

export function NotFoundPage() {
  return (
    <div className={styles.notFound}>
      <div>
        <strong>404</strong>
        <h1 className={styles.h2} style={{ color: "#fff", marginTop: 12 }}>This page could not be found.</h1>
        <div className={styles.rowBtns} style={{ justifyContent: "center" }}>
          <Link className={styles.btn} href="/">Back to home</Link>
          <Link className={styles.btnGhost} href="/contact">Contact</Link>
          <Link className={styles.btnGhost} href="/services">Services</Link>
        </div>
      </div>
    </div>
  );
}
