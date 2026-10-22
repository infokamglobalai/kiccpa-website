export type Insight = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  metaTitle: string;
  metaDescription: string;
  author: string;
  publishedAt: string;
};

function apiBase() {
  return (process.env.BACKEND_PROXY_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:5000").replace(/\/$/, "");
}

export async function listInsights(): Promise<Insight[]> {
  try {
    const response = await fetch(`${apiBase()}/api/insights`, { cache: "no-store" });
    if (!response.ok) return [];
    const data = (await response.json()) as { posts?: Insight[] };
    return data.posts || [];
  } catch {
    return [];
  }
}

export async function getInsight(slug: string): Promise<Insight | null> {
  try {
    const response = await fetch(`${apiBase()}/api/insights/${encodeURIComponent(slug)}`, { cache: "no-store" });
    if (!response.ok) return null;
    const data = (await response.json()) as { post?: Insight };
    return data.post || null;
  } catch {
    return null;
  }
}
