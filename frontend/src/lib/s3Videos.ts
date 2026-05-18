/** S3 object keys in bucket `kiccpa-resources` (ap-south-1). */
export const S3_VIDEO_KEYS = {
  learnx: "LearnX sms video final 2.mp4",
  lms: "LMS only Video Presentation 1.mp4",
} as const;

export type S3VideoSlug = keyof typeof S3_VIDEO_KEYS;

export const S3_RESOURCES_BUCKET =
  process.env.S3_RESOURCES_BUCKET || "kiccpa-resources";

export const S3_RESOURCES_REGION =
  process.env.AWS_REGION || process.env.S3_RESOURCES_REGION || "ap-south-1";

/** Local `public/` path in dev; same-origin S3 proxy in production. */
export function getVideoFileUrl(slug: S3VideoSlug, localPublicPath: string): string {
  const useLocal =
    process.env.NEXT_PUBLIC_USE_LOCAL_VIDEOS === "true" ||
    process.env.NODE_ENV === "development";
  if (useLocal) return localPublicPath;
  return `/api/s3-video/${slug}`;
}
