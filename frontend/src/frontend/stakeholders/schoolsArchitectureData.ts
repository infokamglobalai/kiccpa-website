/** Comprehensive School Management System — feature architecture for /schools */

export type ArchSubsection = {
  title?: string;
  items: string[];
};

export type ArchSection = {
  num: string;
  title: string;
  icon: string;
  items?: string[];
  subsections?: ArchSubsection[];
};

export const schoolsArchitecture: ArchSection[] = [
  {
    num: "01",
    title: "Student Information Management (Core ERP)",
    icon: "🎓",
    items: [
      "Student profile (personal, academic, medical, documents)",
      "Admission & enrollment workflows",
      "Class/section allocation",
      "Student ID generation",
      "Parent/guardian linkage (multi-guardian support)",
      "Transfer certificates & migration tracking",
      "Alumni management",
    ],
  },
  {
    num: "02",
    title: "Staff & Teacher Management",
    icon: "👩‍🏫",
    items: [
      "Teacher profiles & qualifications",
      "Work allocation & subject mapping",
      "Teacher attendance (biometric/manual/app-based)",
      "Leave management & approvals",
      "Payroll integration (optional but powerful)",
      "Performance evaluation system",
      "Substitute teacher allocation",
    ],
  },
  {
    num: "03",
    title: "Attendance Management",
    icon: "📋",
    subsections: [
      {
        title: "Student attendance",
        items: [
          "Daily attendance (manual, RFID, biometric, QR)",
          "Period-wise attendance",
          "Auto alerts to parents (SMS/app notification)",
          "Attendance analytics (low attendance alerts)",
        ],
      },
      {
        title: "Teacher attendance",
        items: [
          "Login-based / biometric tracking",
          "Late mark, half-day, leave integration",
        ],
      },
    ],
  },
  {
    num: "04",
    title: "Fees & Financial Management",
    icon: "💳",
    items: [
      "Fee structure setup (class-wise, category-wise)",
      "Online payments (UPI, cards, net banking)",
      "Auto receipts & invoices",
      "Late fee automation",
      "Scholarship & concession tracking",
      "Refund management",
      "Financial reports & dashboards",
    ],
  },
  {
    num: "05",
    title: "Academic Management",
    icon: "📚",
    items: [
      "Subject & curriculum mapping",
      "Timetable scheduling (AI-optimized possible)",
      "Homework/classwork management",
      "Assignment submission (file/photo upload)",
      "Lesson planning tools for teachers",
    ],
  },
  {
    num: "06",
    title: "Examination & Results System",
    icon: "📝",
    items: [
      "Exam creation (unit test, mid-term, finals)",
      "Marks entry (manual + bulk upload)",
      "Auto grading system",
      "Report card generation",
      "Rank, percentile, and analytics",
      "Result publishing (web/app)",
    ],
  },
  {
    num: "07",
    title: "AI-Powered Academic Intelligence",
    icon: "🤖",
    subsections: [
      {
        title: "AI evaluation tools",
        items: [
          "Answer sheet correction (handwritten recognition)",
          "Homework auto-evaluation",
          "MCQ auto grading",
          "Descriptive answer analysis with feedback",
        ],
      },
      {
        title: "AI insights",
        items: [
          "Student performance prediction",
          "Weak area identification",
          "Personalized learning suggestions",
          "Teacher performance insights",
        ],
      },
      {
        title: "AI content generation",
        items: [
          "PTM report auto-generation",
          "Student progress summaries (daily/weekly/monthly)",
          "Behavioural analysis reports",
          "Question paper generation",
          "Homework/worksheet generation",
        ],
      },
    ],
  },
  {
    num: "08",
    title: "Student Progress & Analytics Dashboard",
    icon: "📊",
    subsections: [
      {
        title: "Student dashboard",
        items: [
          "Academic performance trends",
          "Attendance tracking",
          "Homework completion rate",
          "Activity participation",
          "AI-generated improvement suggestions",
        ],
      },
      {
        title: "Teacher dashboard",
        items: [
          "Class performance overview",
          "Weak student identification",
          "Teaching effectiveness metrics",
        ],
      },
      {
        title: "Parent dashboard",
        items: [
          "Real-time child performance",
          "Notifications & alerts",
          "Fee/payment tracking",
        ],
      },
    ],
  },
  {
    num: "09",
    title: "Report Cards & PTM Management",
    icon: "📄",
    items: [
      "AI-generated report cards",
      "Custom grading formats (CBSE, ICSE, IB, etc.)",
      "PTM scheduling system",
      "Auto-generated PTM reports: academic scores, behavioral feedback, activity participation, teacher comments",
    ],
  },
  {
    num: "10",
    title: "Canteen Management System",
    icon: "🍽️",
    items: [
      "Digital menu display",
      "Pre-order meals",
      "Wallet-based payments",
      "Nutrition tracking (optional advanced feature)",
      "Vendor management",
    ],
  },
  {
    num: "11",
    title: "Transport & Bus Tracking",
    icon: "🚌",
    items: [
      "GPS-based real-time tracking",
      "Route optimization",
      "Pickup/drop notifications",
      "Driver & vehicle management",
      "Safety alerts (route deviation, delay)",
    ],
  },
  {
    num: "12",
    title: "Communication & Notification System",
    icon: "📣",
    items: [
      "Push notifications (app)",
      "SMS & email integration",
      "Circulars & announcements",
      "Parent-teacher chat (controlled/moderated)",
      "Emergency alerts",
    ],
  },
  {
    num: "13",
    title: "Event & Calendar Management",
    icon: "📅",
    items: [
      "Academic calendar",
      "Holiday list",
      "School events planning",
      "RSVP & participation tracking",
      "Event reminders",
    ],
  },
  {
    num: "14",
    title: "Extracurricular & Activity Management",
    icon: "🏅",
    items: [
      "Sports, quiz, competitions registration",
      "Participation tracking",
      "Results & rankings",
      "Media uploads (photos/videos)",
      "Certificates generation",
    ],
  },
  {
    num: "15",
    title: "Cultural Program Management",
    icon: "🎭",
    items: [
      "Event planning & scheduling",
      "Student participation tracking",
      "Practice session management",
      "Role assignment (dance, drama, etc.)",
      "Performance evaluation",
    ],
  },
  {
    num: "16",
    title: "Document Management System",
    icon: "🗂️",
    items: [
      "Secure storage of certificates, ID proofs, report cards",
      "Easy sharing with parents",
      "Digital signatures",
    ],
  },
  {
    num: "17",
    title: "Security & Compliance",
    icon: "🔐",
    items: [
      "Role-based access control (Admin/Teacher/Parent/Student)",
      "Data encryption",
      "Audit logs",
      "GDPR / data protection compliance",
      "Backup & disaster recovery",
    ],
  },
  {
    num: "18",
    title: "Mobile App (Critical)",
    icon: "📱",
    items: [
      "Separate interfaces for students, parents, and teachers",
      "Real-time notifications",
      "Offline capabilities",
    ],
  },
  {
    num: "19",
    title: "Admin & Automation Engine",
    icon: "⚙️",
    items: [
      "Workflow automation (admissions, fees, attendance)",
      "Custom rule engine",
      "Multi-school management (for chains)",
      "API integrations (payments, SMS, biometrics)",
    ],
  },
  {
    num: "20",
    title: "AI Behavior & Emotion Tracking",
    icon: "🧠",
    items: [
      "Teacher inputs → AI analyzes discipline, participation, and social behavior",
    ],
  },
  {
    num: "21",
    title: "Parent Engagement Score",
    icon: "📈",
    items: [
      "Tracks PTM attendance, app usage, and interaction with school",
    ],
  },
  {
    num: "22",
    title: "Smart Timetable Generator (AI)",
    icon: "🕐",
    items: [
      "Auto-create conflict-free schedules",
      "Optimize teacher workload",
    ],
  },
  {
    num: "23",
    title: "Health & Wellness Tracking",
    icon: "❤️",
    items: [
      "Basic medical records",
      "Sick leave trends",
      "Mental wellness indicators (future-ready)",
    ],
  },
  {
    num: "24",
    title: "Hostel Management (if applicable)",
    icon: "🏠",
    items: ["Room allocation", "Attendance", "Meal tracking"],
  },
  {
    num: "25",
    title: "Alumni Network",
    icon: "🎓",
    items: ["Engagement platform", "Events & mentorship"],
  },
];
