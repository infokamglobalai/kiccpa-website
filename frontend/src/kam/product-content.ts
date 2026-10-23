export const productCatalog = [
  {
    id: "learnx",
    name: "LearnX",
    audience: "Schools",
    line: "One login for the whole school.",
    summary:
      "learnx.school presents LearnX as the place where attendance, fees, buses, exams, and parent updates run under the school's own name.",
    points: [
      "Student attendance & timetable management",
      "Fee collection, automated billing, and receipt generation",
      "School bus transport management & route tracking",
      "Examination grading, marksheets, and report cards",
      "Real-time parent updates, alerts, and mobile notifications",
      "Branded school portal with custom domain, crest, and colours",
    ],
    href: "https://learnx.school",
    cta: "Open learnx.school",
    image: "/images/resources/learnx-sms-catalog-cover.png",
    alt: "Cover of the LearnX school management catalogue.",
  },
  {
    id: "eduaitutors",
    name: "EduAiTutors",
    audience: "Students and parents",
    line: "NEET, JEE, and foundation classes.",
    summary:
      "eduaitutors.com is online coaching for NEET and JEE, plus a foundation programme for classes 6 to 10. Live sessions are listed for India and for GCC time zones.",
    points: [
      "Foundation programme for classes 6, 7, 8, 9, and 10",
      "Live interactive NEET and JEE masterclasses",
      "Comprehensive mock test series with chapter-level analytics",
      "1-on-1 doubt clearing support and expert mentorship",
    ],
    href: "https://eduaitutors.com",
    cta: "Open eduaitutors.com",
    image: "/images/EduAiTutors Advanced Learning Ecosystem 1.jpeg",
    alt: "Visual published for EduAiTutors learning platform.",
  },
  {
    id: "platform",
    name: "EduAiTutors Platform",
    audience: "Active students and faculty",
    line: "The central address for the digital learning portal.",
    summary:
      "kam.eduaitutors.com is the direct platform address for enrolled students and instructors. Use this link to sign into your virtual classroom, course modules, and assignments.",
    points: [
      "Direct portal access: kam.eduaitutors.com",
      "Enrolled course syllabus, video archives, and homework submissions",
      "Live interactive whiteboard sessions and peer study groups",
    ],
    href: "https://kam.eduaitutors.com",
    cta: "Open kam.eduaitutors.com",
    image: "/assets/products/platform.jpg",
    alt: "EduAiTutors active learning platform dashboard.",
  },
] as const;

export const productsPage = {
  eyebrow: "Products",
  title: "Three learning products. Open the one that fits.",
  lede: "LearnX is the school platform. EduAiTutors is the coaching site. kam.eduaitutors.com is the learning address. Each button leaves this page and opens that product.",
};
