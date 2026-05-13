/**
 * Curated resources shipped with the app (no CMS required).
 * Files live under `frontend/public/` — URLs are root-relative (e.g. `/brochures/...`).
 */

export type CatalogResource = {
  _id: string;
  title: string;
  description?: string;
  category: string;
  fileUrl: string;
  thumbnailUrl?: string;
  fileType: string;
  date: string;
};

/** Brochures & PDFs — Documents section */
export const STATIC_DOCUMENT_RESOURCES: CatalogResource[] = [
  {
    _id: "static-brochure-learnx-catalog",
    title: "LearnX (School Management System catalog)",
    description: "Version 1 — School Management System catalog PDF.",
    category: "Brochure",
    fileUrl: "/brochures/LearnX (School Management System catalog) Version 1 (2).pdf",
    thumbnailUrl: "/images/resources/learnx-sms-catalog-cover.png",
    fileType: "pdf",
    date: "2026-05-12T12:00:00.000Z",
  },
  {
    _id: "static-brochure-01",
    title: "Brochure 01",
    description: "Product brochure PDF.",
    category: "Brochure",
    fileUrl: "/brochures/Brochure 01.pdf",
    thumbnailUrl: "/images/resources/brochure-01-cover.png",
    fileType: "pdf",
    date: "2026-05-12T12:00:00.000Z",
  },
];

/** Videos — YouTube or MP4 under `public/` */
export const STATIC_VIDEO_RESOURCES: CatalogResource[] = [
  {
    _id: "static-video-learnx-sms-final",
    title: "LearnX SMS — final video",
    description: "School Management System walkthrough.",
    category: "Video",
    fileUrl: "/LearnX sms video final 1.mp4",
    thumbnailUrl: "/images/hero-human-education.png",
    fileType: "mp4",
    date: "2026-05-12T12:00:00.000Z",
  },
  {
    _id: "static-video-lms-presentation",
    title: "LMS only — video presentation",
    description: "LMS-focused presentation video.",
    category: "Video",
    fileUrl: "/LMS only Video Presentation.mp4",
    thumbnailUrl: "/images/home-edtech-hero-reference.png",
    fileType: "mp4",
    date: "2026-05-12T12:00:00.000Z",
  },
];
