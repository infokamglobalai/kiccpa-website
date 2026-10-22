export const productCatalog = [
  {
    id: "learnx",
    name: "LearnX",
    audience: "Schools",
    line: "One login for the whole school.",
    summary:
      "learnx.school presents LearnX as the place where attendance, fees, buses, exams, and parent updates run under the school's own name.",
    points: [
      "Admissions, academics, exams, fees, and attendance",
      "LMS and live class, as listed on the product site",
      "Transport and day-to-day campus operations",
      "The school's own web address, crest, and colours",
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
      "Live NEET and JEE sessions",
      "Mock tests with chapter-level reports, as the site describes them",
      "Doubt support and mentor sessions",
    ],
    href: "https://eduaitutors.com",
    cta: "Open eduaitutors.com",
    image: "/images/EduAiTutors Advanced Learning Ecosystem 1.jpeg",
    alt: "Visual published for EduAiTutors. Not a capture of a student account.",
  },
  {
    id: "platform",
    name: "EduAiTutors platform",
    audience: "People opening the learning site",
    line: "The address for the learning site.",
    summary:
      "kam.eduaitutors.com is the platform address published with EduAiTutors. Programme descriptions stay on eduaitutors.com. Use this link to open the learning site itself.",
    points: [
      "Learning site: kam.eduaitutors.com",
      "Programmes and enquiries: eduaitutors.com",
      "Schools looking for campus software should open LearnX instead",
    ],
    href: "https://kam.eduaitutors.com",
    cta: "Open kam.eduaitutors.com",
    image: "",
    alt: "",
  },
] as const;

export const productsPage = {
  eyebrow: "Products",
  title: "Three learning products. Open the one that fits.",
  lede: "LearnX is the school platform. EduAiTutors is the coaching site. kam.eduaitutors.com is the learning address. Each button leaves this page and opens that product.",
};
