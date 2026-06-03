/** Small rectangular flags for hero region pills (reference-style). */

export function FlagIndia({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 16" width={20} height={14} aria-hidden>
      <rect width="24" height="5.33" fill="#FF9933" />
      <rect y="5.33" width="24" height="5.34" fill="#FFFFFF" />
      <rect y="10.67" width="24" height="5.33" fill="#138808" />
      <circle cx="12" cy="8" r="2" fill="none" stroke="#000080" strokeWidth="0.5" />
    </svg>
  );
}

export function FlagKuwait({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 16" width={20} height={14} aria-hidden>
      <rect width="24" height="16" fill="#007A3D" />
      <rect y="5.33" width="24" height="5.34" fill="#FFFFFF" />
      <rect y="10.67" width="24" height="5.33" fill="#CE1126" />
      <path d="M0 0 L9 8 L0 16 Z" fill="#000000" />
    </svg>
  );
}

export function FlagUk({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 16" width={20} height={14} aria-hidden>
      <rect width="24" height="16" fill="#012169" />
      <path d="M0 0 L24 16 M24 0 L0 16" stroke="#FFFFFF" strokeWidth="2.5" />
      <path d="M0 0 L24 16 M24 0 L0 16" stroke="#C8102E" strokeWidth="1.2" />
      <path d="M12 0 V16 M0 8 H24" stroke="#FFFFFF" strokeWidth="4" />
      <path d="M12 0 V16 M0 8 H24" stroke="#C8102E" strokeWidth="2" />
    </svg>
  );
}
