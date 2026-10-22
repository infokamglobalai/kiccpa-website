export const hiringCountries = [
  { id: "kuwait", label: "Kuwait", currency: "KWD" },
  { id: "uae", label: "United Arab Emirates", currency: "AED" },
  { id: "india", label: "India", currency: "INR" },
  { id: "kenya", label: "Kenya", currency: "KES" },
  { id: "tunisia", label: "Tunisia", currency: "TND" },
  { id: "other", label: "Other country", currency: "USD" },
] as const;

const identityDocuments: Record<string, { id: string; label: string }[]> = {
  kuwait: [
    { id: "civil-id", label: "Civil ID" },
    { id: "passport", label: "Passport" },
    { id: "visa-page", label: "Visa or residency page" },
    { id: "police-clearance", label: "Police clearance certificate" },
    { id: "medical", label: "Medical fitness certificate" },
  ],
  uae: [
    { id: "emirates-id", label: "Emirates ID" },
    { id: "passport", label: "Passport" },
    { id: "visa-page", label: "Visa or residency page" },
    { id: "police-clearance", label: "Police clearance certificate" },
    { id: "medical", label: "Medical fitness certificate" },
  ],
  india: [
    { id: "aadhaar", label: "Aadhaar" },
    { id: "pan", label: "PAN" },
    { id: "passport", label: "Passport" },
    { id: "cancelled-cheque", label: "Cancelled cheque or bank proof" },
  ],
  kenya: [
    { id: "national-id", label: "National ID" },
    { id: "kra-pin", label: "KRA PIN" },
    { id: "passport", label: "Passport" },
  ],
  tunisia: [
    { id: "cin", label: "National identity card (CIN)" },
    { id: "passport", label: "Passport" },
  ],
  other: [
    { id: "government-id", label: "Government photo ID" },
    { id: "passport", label: "Passport" },
    { id: "work-authorisation", label: "Work authorisation or visa" },
  ],
};

export const professionalDocuments = [
  { id: "photo", label: "Photograph" },
  { id: "degree", label: "Degree certificate" },
  { id: "experience-letter", label: "Experience letter" },
  { id: "relieving-letter", label: "Relieving letter" },
  { id: "salary-slip", label: "Latest salary slip" },
];

export function countryLabel(id?: string) {
  return hiringCountries.find((item) => item.id === id)?.label || "Kuwait";
}

export function documentsForCountry(country?: string) {
  return identityDocuments[country || "kuwait"] || identityDocuments.other;
}

export function documentLabel(id: string) {
  for (const list of Object.values(identityDocuments)) {
    const match = list.find((item) => item.id === id);
    if (match) return match.label;
  }
  return professionalDocuments.find((item) => item.id === id)?.label || id;
}
