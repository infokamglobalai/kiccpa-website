/**
 * Curated resources shipped with the app (no CMS required).
 * Videos: local `public/` in dev; production streams from S3 via `/api/s3-video/*`.
 */

import { getVideoFileUrl } from "@/lib/s3Videos";

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

/** Videos — S3 in production (`/api/s3-video/*`), local MP4 in dev. */
export const STATIC_VIDEO_RESOURCES: CatalogResource[] = [
  {
    _id: "static-video-learnx-sms-final",
    title: "LearnX SMS — final video",
    description: "School Management System walkthrough.",
    category: "Video",
    fileUrl: getVideoFileUrl("learnx", "/LearnX sms video final 2.mp4"),
    thumbnailUrl: "/images/hero-human-education.png",
    fileType: "mp4",
    date: "2026-05-12T12:00:00.000Z",
  },
  {
    _id: "static-video-lms-presentation",
    title: "LMS only — video presentation",
    description: "LMS-focused presentation video.",
    category: "Video",
    fileUrl: getVideoFileUrl("lms", "/LMS only Video Presentation 1.mp4"),
    thumbnailUrl: "/images/home-edtech-hero-reference.png",
    fileType: "mp4",
    date: "2026-05-12T12:00:00.000Z",
  },
];
