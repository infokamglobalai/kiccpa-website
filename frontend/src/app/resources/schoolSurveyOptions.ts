export const CURRICULUM_OPTIONS = [
  { id: "American", label: "American" },
  { id: "British", label: "British" },
  { id: "CBSE", label: "CBSE" },
  { id: "IGCSE", label: "IGCSE" },
  { id: "Bilingual", label: "Bilingual" },
  { id: "Other", label: "Other" },
] as const;

export const CHALLENGE_OPTIONS = [
  { id: "student-attendance", label: "Student Attendance Management" },
  { id: "parent-communication", label: "Parent Communication" },
  { id: "online-learning", label: "Online Learning Management" },
  { id: "academic-reporting", label: "Academic Reporting & Analytics" },
  { id: "homework-tracking", label: "Homework / Assignment Tracking" },
  { id: "fee-management", label: "Fee Management" },
  { id: "staff-hr", label: "Staff Attendance & HR Management" },
  { id: "timetable", label: "Timetable & Scheduling" },
  { id: "student-performance", label: "Student Performance Tracking" },
  { id: "paper-processes", label: "Paper-Based Processes" },
  { id: "data-centralization", label: "Data Centralization" },
  { id: "ai-automation", label: "AI & Automation Integration" },
  { id: "mobile-app", label: "Mobile App Requirements" },
  { id: "cybersecurity", label: "Cybersecurity / Data Management" },
] as const;

export const GOAL_OPTIONS = [
  { id: "ai-learning", label: "AI-Powered Learning Environment" },
  { id: "smart-campus", label: "Smart Campus Transformation" },
  { id: "centralized-ops", label: "Centralized School Operations" },
  { id: "analytics", label: "Advanced Analytics & Reporting" },
  { id: "engagement", label: "Parent & Student Engagement Enhancement" },
  { id: "cloud", label: "Cloud-Based Infrastructure" },
  { id: "hybrid-learning", label: "Hybrid / Online Learning Expansion" },
  { id: "hr-payroll", label: "HR & Payroll Automation" },
  { id: "accreditation", label: "Future Global Accreditation Readiness" },
  { id: "multi-branch", label: "Scalable Multi-Branch School Management" },
  { id: "ai-insights", label: "AI-Driven Student Performance Insights" },
  { id: "governance", label: "Digital Governance & Compliance" },
  { id: "cost-optimization", label: "Long-Term Operational Cost Optimization" },
] as const;

export const DEMO_SOLUTION_OPTIONS = [
  { id: "lms", label: "AI Powered LMS (Learning Management System)" },
  { id: "sms", label: "School Management System (SMS)" },
  { id: "hrms", label: "HRMS (Human Resource Management System)" },
  { id: "mobile", label: "Mobile Application" },
  { id: "analytics-dash", label: "AI Analytics Dashboard" },
  { id: "full-transform", label: "Complete School Digital Transformation Solution" },
] as const;

export const DEMO_MODE_OPTIONS = [
  { id: "online", label: "Online Demo" },
  { id: "onsite", label: "Onsite School Visit" },
  { id: "hybrid", label: "Hybrid" },
] as const;
