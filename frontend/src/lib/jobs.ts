export type PublicJob = {
  id: string;
  title: string;
  slug: string;
  reference: string;
  department: string;
  location: string;
  workplace: string;
  employmentType: string;
  experienceMin: number;
  experienceMax: number;
  openings: number;
  summary: string;
  about: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  benefits: string[];
  deadline: string | null;
  status: string;
  salaryCurrency?: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryPeriod?: string;
  managerName?: string;
  managerRole?: string;
  hiringCountry?: string;
  documents?: string[];
  rounds?: string[];
  applicants?: number;
};

function apiBase() {
  return (process.env.BACKEND_PROXY_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:5000").replace(/\/$/, "");
}

export async function listPublicJobs(department?: string): Promise<{ jobs: PublicJob[]; database: boolean }> {
  const query = department ? `?department=${encodeURIComponent(department)}` : "";
  try {
    const response = await fetch(`${apiBase()}/api/jobs${query}`, { cache: "no-store" });
    if (!response.ok) return { jobs: [], database: false };
    return (await response.json()) as { jobs: PublicJob[]; database: boolean };
  } catch {
    return { jobs: [], database: false };
  }
}

export async function getPublicJob(slug: string): Promise<PublicJob | null> {
  try {
    const response = await fetch(`${apiBase()}/api/jobs/${encodeURIComponent(slug)}`, { cache: "no-store" });
    if (!response.ok) return null;
    const data = (await response.json()) as { job: PublicJob };
    return data.job;
  } catch {
    return null;
  }
}
