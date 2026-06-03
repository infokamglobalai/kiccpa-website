export const CONTACT_STATS = [
  { value: "24h", label: "Typical response", hint: "Business days" },
  { value: "GCC + IN", label: "Regional coverage", hint: "Kuwait & India hubs" },
  { value: "EN • AR", label: "Languages", hint: "Bilingual support" },
  { value: "Free", label: "Discovery calls", hint: "No-pressure demos" },
] as const;

export const CONTACT_CHANNELS = [
  {
    id: "email",
    title: "Email us",
    regions: [
      {
        label: "GCC region",
        lines: ["marketing.gcc@kiccpa.com", "sales1.gcc@kiccpa.com"],
      },
      {
        label: "Africa region",
        lines: ["marketing.africa@kiccpa.com", "sales1.africa@kiccpa.com"],
      },
    ],
  },
  {
    id: "phone",
    title: "Call us",
    regions: [
      {
        label: "Kuwait",
        lines: ["+965 6091 9345", "+965 6078 0180", "+965 9879 3440"],
        tel: ["+96560919345", "+96560780180", "+96598793440"],
      },
      {
        label: "USA",
        lines: ["+1 252 410 8568"],
        tel: ["+12524108568"],
      },
    ],
  },
  {
    id: "hours",
    title: "Response time",
    summary: "Usually within one business day",
    detail: "Urgent GCC inquiries prioritized during regional hours",
  },
  {
    id: "office",
    title: "Our offices",
    summary: "Kuwait & India",
    detail: "Part of the KAM International ecosystem",
  },
] as const;

export const CONTACT_EXPECT = [
  "Every message is read and routed to the right domain specialist.",
  "A concise reply—usually within one business day.",
  "Interactive demos scheduled at your convenience, with no pressure.",
] as const;

export const CONTACT_BENEFITS = [
  { title: "Fast track", desc: "Deployment in 8–24 weeks" },
  { title: "Agile squads", desc: "Dedicated talent from day one" },
  { title: "Global support", desc: "English & Arabic native speakers" },
  { title: "AI native", desc: "Intelligent architecture by default" },
] as const;

export const INQUIRY_OPTIONS = [
  "Product demo",
  "LMS / EdTech project",
  "Enterprise software",
  "Partnership",
  "Support",
  "Other",
] as const;

export const CONTACT_CTA = {
  title: "Prefer a live walkthrough?",
  lead: "Book a demo and see LMS, school management, and AI modules in action.",
  primary: { label: "Book a demo", href: "/demo" },
  secondary: { label: "Explore services", href: "/services" },
} as const;
