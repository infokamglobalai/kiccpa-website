export type FeatureBlock = {
  id: string;
  title: string;
  summary: string;
  keyFeatures: readonly string[];
  businessImpact: readonly string[];
  quote: string;
};

export const experienceFeatures: readonly FeatureBlock[] = [
  {
    id: "modern-ui",
    title: "Modern UI/UX",
    summary:
      "A clean, intuitive, and visually appealing platform that ensures ease of use for students, faculty, and administrators.",
    keyFeatures: [
      "Simple and intuitive navigation",
      "Personalized dashboards (student / faculty / admin views)",
      "Minimal clicks to access content",
      "Responsive design (works across devices)",
      "Multilingual interface support",
    ],
    businessImpact: [
      "Higher student engagement",
      "Reduced learning curve for users",
      "Better adoption rates across institutions",
    ],
    quote: "",
  },
  {
    id: "ml-recs",
    title: "Machine learning recommendations",
    summary:
      "The system analyses student behaviour and performance to automatically suggest the next best learning action.",
    keyFeatures: [
      "Topic-wise recommendation based on performance",
      "Suggested practice questions and tests",
      "Difficulty level adjustment (easy → advanced)",
      "Learning path optimization",
      "Behaviour-based insights (time spent, accuracy, attempts)",
    ],
    businessImpact: [
      "Personalized learning experience",
      "Improved student outcomes",
      "Increased course completion rates",
    ],
    quote:
      "Our platform doesn’t just deliver content—it intelligently guides each student on what to learn next.",
  },
  {
    id: "dashboards",
    title: "Student performance dashboards",
    summary:
      "Real-time visualization of student performance for students, parents, faculty, and management.",
    keyFeatures: [
      "Subject-wise and topic-wise performance tracking",
      "Attendance and engagement metrics",
      "Test scores, rankings, and comparisons",
      "Weak area identification",
      "Progress over time (trend analysis)",
    ],
    businessImpact: [
      "Data-driven academic decisions",
      "Early identification of weak students",
      "Better parent engagement",
      "Improved academic outcomes",
    ],
    quote:
      "Instead of guessing student performance, you get real-time data to take immediate action.",
  },
  {
    id: "mobile-web",
    title: "Mobile & web compatibility",
    summary:
      "The LMS works seamlessly across mobile phones, tablets, and desktops, ensuring anytime-anywhere learning.",
    keyFeatures: [
      "Android & iOS mobile apps",
      "Web-based platform (no installation needed)",
      "Sync across devices",
      "Offline access (for selected content)",
      "Push notifications for reminders & updates",
    ],
    businessImpact: [
      "Increased accessibility",
      "Higher student engagement (especially mobile users)",
      "Wider reach across geographies",
      "Improved retention",
    ],
    quote:
      "Your students can learn anytime, anywhere—whether they’re at home, commuting, or in class.",
  },
  {
    id: "bilingual",
    title: "Bilingual & RTL support",
    summary:
      "Full English and Arabic interfaces with right-to-left layouts for Gulf institutions—content, notifications, and reports in the language your community uses.",
    keyFeatures: [
      "RTL-native UI and navigation",
      "Arabic and English content delivery",
      "Bilingual parent communications",
      "Regional compliance-ready reporting",
      "Locale-aware dates and calendars",
    ],
    businessImpact: [
      "Higher adoption in Kuwait and GCC",
      "Inclusive access for diverse families",
      "Alignment with national education standards",
    ],
    quote:
      "Your platform speaks the language of your community—not just in translation, but in experience.",
  },
  {
    id: "stakeholders",
    title: "Parent & stakeholder engagement",
    summary:
      "Keep families and leadership informed with portals, alerts, and dashboards—so communication is proactive, not reactive.",
    keyFeatures: [
      "Parent mobile summaries and alerts",
      "Teacher–parent messaging workflows",
      "Leadership and board reporting views",
      "Attendance and performance notifications",
      "Role-based access for every stakeholder",
    ],
    businessImpact: [
      "Stronger trust with families",
      "Fewer manual update requests",
      "Faster intervention when issues arise",
    ],
    quote: "",
  },
] as const;

export const aiFeatures: readonly FeatureBlock[] = [
  {
    id: "adaptive",
    title: "AI adaptive learning",
    summary:
      "The LMS dynamically adjusts content, difficulty, and pace based on each student’s learning behaviour and performance.",
    keyFeatures: [
      "Personalized learning paths for every student",
      "Difficulty auto-adjustment (basic → advanced)",
      "Topic mastery tracking before progression",
      "Real-time content recommendations",
      "Continuous learning optimization",
    ],
    businessImpact: [
      "Faster learning outcomes",
      "Increased student satisfaction",
      "Reduced dropouts",
      "Higher course completion rates",
    ],
    quote:
      "Every student gets a customized learning journey, just like having a personal tutor.",
  },
  {
    id: "grading",
    title: "Automated grading",
    summary:
      "AI-powered evaluation of assignments, quizzes, and tests—reducing manual effort and improving accuracy.",
    keyFeatures: [
      "Instant grading for MCQs and objective tests",
      "AI-assisted evaluation for subjective answers",
      "Performance-based scoring analytics",
      "Instant result publishing",
      "Feedback generation for students",
    ],
    businessImpact: [
      "Saves faculty time significantly",
      "Faster feedback loop for students",
      "Consistent and unbiased evaluation",
      "Scalable assessment system",
    ],
    quote:
      "What used to take days is now done in seconds—with accuracy and consistency.",
  },
  {
    id: "predictive",
    title: "Predictive analytics",
    summary:
      "Using AI and data models to forecast future outcomes—so institutions can take proactive decisions.",
    keyFeatures: [
      "Student performance prediction",
      "Dropout risk identification",
      "Admission & enrolment forecasting",
      "Learning behaviour analysis",
      "Early warning alerts",
    ],
    businessImpact: [
      "Proactive academic interventions",
      "Increased retention rates",
      "Better planning (faculty, batches, resources)",
      "Data-driven decision-making",
    ],
    quote:
      "Instead of reacting to problems, you can predict and prevent them before they happen.",
  },
  {
    id: "ai-counselor",
    title: "AI counsellor & support",
    summary:
      "Intelligent guidance for academic and wellbeing questions—scaling student support without adding headcount.",
    keyFeatures: [
      "24/7 AI-assisted student queries",
      "Escalation paths to human counsellors",
      "Topic and sentiment-aware responses",
      "Integration with LMS progress data",
      "Privacy-aware conversation logging",
    ],
    businessImpact: [
      "Earlier support for at-risk students",
      "Reduced counsellor workload on routine queries",
      "More consistent student experience",
    ],
    quote:
      "Every student gets a first line of support—intelligent, immediate, and always available.",
  },
] as const;
