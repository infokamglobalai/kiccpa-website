import type { SolutionSlug } from "@/lib/solutionsContent";
import { SOLUTIONS } from "@/lib/solutionsContent";
import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  Calendar,
  FileText,
  GraduationCap,
  HeartHandshake,
  Layers,
  MessageSquare,
  Radio,
  ShieldCheck,
} from "lucide-react";

/** Reference layout: 3×3 grid (rows: LearnX/LMS/SMS, etc.) */
export type OfferingDropdownItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const OFFERING_DROPDOWN_GRID: OfferingDropdownItem[] = [
  { href: "/learnx", label: "LearnX", icon: Layers },
  { href: "/solutions/lms", label: "LMS", icon: GraduationCap },
  { href: "/solutions/sms", label: "SMS", icon: MessageSquare },
  {
    href: "/solutions/calendar-management",
    label: "Calendar Management",
    icon: Calendar,
  },
  { href: "/solutions/ai-counselor", label: "AI Counsellor", icon: HeartHandshake },
  {
    href: "/solutions/question-paper",
    label: "Question Paper Creation",
    icon: FileText,
  },
  { href: "/solutions/assessment", label: "Assessment", icon: ShieldCheck },
  {
    href: "/solutions/career-counseling",
    label: "Career Counseling",
    icon: Briefcase,
  },
  { href: "/solutions/webcast", label: "Webcast", icon: Radio },
];

export type OfferingGroup = {
  id: string;
  label: string;
  slugs: SolutionSlug[];
};

export const OFFERING_GROUPS: OfferingGroup[] = [
  {
    id: "core",
    label: "Core platform",
    slugs: ["lms", "sms"],
  },
  {
    id: "teaching",
    label: "Teaching & assessment",
    slugs: ["calendar-management", "question-paper", "assessment"],
  },
  {
    id: "student",
    label: "Student & engagement",
    slugs: ["ai-counselor", "career-counseling", "webcast"],
  },
];

export function offeringGroupItems(group: OfferingGroup) {
  return group.slugs.map((slug) => ({
    slug,
    href: `/solutions/${slug}`,
    label: SOLUTIONS[slug].navLabel,
    hint: SOLUTIONS[slug].title,
  }));
}

export const STAKEHOLDER_ITEMS = [
  {
    href: "/schools",
    label: "For schools",
    hint: "Deploy LearnX across your campus",
  },
  {
    href: "/parents",
    label: "For parents",
    hint: "Stay connected to learning progress",
  },
  {
    href: "/investors",
    label: "For investors",
    hint: "Scale and governance at a glance",
  },
] as const;

export type ServiceGroup = {
  id: string;
  label: string;
  items: { href: string; label: string; hint: string }[];
};

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    id: "build",
    label: "Build & integrate",
    items: [
      { href: "/services", label: "Custom software", hint: "Web, mobile, and cloud delivery" },
      { href: "/services", label: "CRM solutions", hint: "Sales, support, and ops in one stack" },
    ],
  },
  {
    id: "edu-ai",
    label: "Education & AI",
    items: [
      { href: "/services", label: "LMS platforms", hint: "Implementation and rollout" },
      { href: "/services", label: "AI solutions", hint: "Automation, analytics, and copilots" },
    ],
  },
];
