export const offerDocuments = [
  { id: "signed-offer", label: "Signed offer acknowledgement" },
  { id: "noc", label: "No-objection or relieving letter" },
  { id: "bank-proof", label: "Bank proof for salary" },
  { id: "address-proof", label: "Address proof" },
  { id: "attested-degree", label: "Attested degree certificate" },
  { id: "police-clearance", label: "Police clearance certificate" },
  { id: "medical", label: "Medical fitness certificate" },
  { id: "photo", label: "Photograph" },
] as const;

export function offerDocumentLabel(id: string) {
  return offerDocuments.find((item) => item.id === id)?.label || id;
}
