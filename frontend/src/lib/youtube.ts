/** Extract YouTube video id from common URL shapes (watch, embed, shorts, youtu.be). */
export function extractYoutubeId(url: string | undefined | null): string | null {
  if (!url || typeof url !== "string") return null;
  const u = url.trim();
  let m = u.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (m) return m[1];
  m = u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (m) return m[1];
  m = u.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (m) return m[1];
  return null;
}

export function youtubeThumb(id: string, quality: "hq" | "mq" | "sd" = "hq"): string {
  const q = quality === "hq" ? "hqdefault" : quality === "mq" ? "mqdefault" : "sddefault";
  return `https://img.youtube.com/vi/${id}/${q}.jpg`;
}
