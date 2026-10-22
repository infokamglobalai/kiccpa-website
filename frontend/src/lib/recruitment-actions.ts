"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth-config";
import type { PublicJob } from "./jobs";

const HIRING = ["superadmin", "admin", "hr"];
const PANEL = ["superadmin", "admin", "hr", "manager"];
const CONTENT = ["superadmin", "admin", "seo", "marketing"];
const ALL = ["superadmin", "admin", "hr", "manager", "seo", "marketing"];

function apiBase() {
  return (process.env.BACKEND_PROXY_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:5000").replace(/\/$/, "");
}

async function staffHeaders(allowed: string[]) {
  const session = await getServerSession(authOptions);
  const secret = process.env.STAFF_API_SECRET;
  const role = session?.user?.role || "";
  if (!session?.user?.email || !secret || !allowed.includes(role)) {
    throw new Error("This desk is outside your access.");
  }
  return {
    "content-type": "application/json",
    "x-staff-key": secret,
    "x-staff-role": role,
    "x-staff-email": session.user.email,
  };
}

async function staffFetch(path: string, allowed: string[], init?: RequestInit) {
  const headers = await staffHeaders(allowed);
  const response = await fetch(`${apiBase()}${path}`, {
    ...init,
    headers: { ...headers, ...(init?.headers || {}) },
    cache: "no-store",
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error((data as { error?: string }).error || "Request failed.");
  return data;
}

export async function recruitmentSummary() {
  return staffFetch("/api/admin/recruitment/summary", HIRING) as Promise<{
    jobs: Record<string, number>;
    applications: Record<string, number>;
    applicationTotal: number;
    storage?: string;
  }>;
}

export async function adminJobs() {
  return staffFetch("/api/admin/recruitment/jobs", HIRING) as Promise<{ jobs: Array<PublicJob & { stages?: Record<string, number> }> }>;
}

export async function screenSuggested(jobId: string) {
  return staffFetch(`/api/admin/recruitment/jobs/${jobId}/screen`, HIRING, {
    method: "POST",
    body: JSON.stringify({}),
  }) as Promise<{ success: boolean; moved: number }>;
}

export async function saveJob(id: string | null, payload: Record<string, unknown>) {
  return staffFetch(id ? `/api/admin/recruitment/jobs/${id}` : "/api/admin/recruitment/jobs", HIRING, {
    method: id ? "PATCH" : "POST",
    body: JSON.stringify(payload),
  });
}

export async function adminApplications(query = "") {
  return staffFetch(`/api/admin/recruitment/applications${query}`, PANEL) as Promise<{ applications: Array<Record<string, string | number>> }>;
}

export async function adminApplication(id: string) {
  return staffFetch(`/api/admin/recruitment/applications/${id}`, PANEL) as Promise<{ application: Record<string, unknown> }>;
}

export async function applicationLetters(id: string) {
  return staffFetch(`/api/admin/recruitment/applications/${id}/letters`, HIRING) as Promise<{
    letters: Record<string, { subject: string; body: string }>;
  }>;
}

export async function updateApplication(id: string, payload: Record<string, unknown>) {
  return staffFetch(`/api/admin/recruitment/applications/${id}`, PANEL, {
    method: "PATCH",
    body: JSON.stringify(payload),
  }) as Promise<{ success: boolean; status: string; emailed: boolean; emailError: string; notified?: boolean }>;
}

export async function listStaff() {
  return staffFetch("/api/admin/recruitment/staff", ["superadmin", "admin"]) as Promise<{ staff: Array<Record<string, string | boolean>> }>;
}

export async function teamActivity() {
  return staffFetch("/api/admin/recruitment/activity", ["superadmin", "admin"]) as Promise<{
    activity: Array<{ _id: string; actor: string; action: string; detail: string; at: string }>;
  }>;
}

export async function createStaff(payload: { name: string; email: string; password: string; role: string }) {
  const origin = (process.env.NEXTAUTH_URL || "http://localhost:3000").replace(/\/$/, "");
  return staffFetch("/api/admin/recruitment/staff", ["superadmin"], {
    method: "POST",
    body: JSON.stringify({ ...payload, signInUrl: origin }),
  }) as Promise<{ staff: { email: string; role: string }; emailed: boolean; emailError: string }>;
}

export async function setStaffActive(id: string, active: boolean) {
  return staffFetch(`/api/admin/recruitment/staff/${id}`, ["superadmin"], {
    method: "PATCH",
    body: JSON.stringify({ active }),
  });
}

export async function setStaffPassword(id: string, password: string) {
  return staffFetch(`/api/admin/recruitment/staff/${id}`, ["superadmin"], {
    method: "PATCH",
    body: JSON.stringify({ password }),
  });
}

export async function sendResetLink(id: string) {
  const origin = (process.env.NEXTAUTH_URL || "http://localhost:3000").replace(/\/$/, "");
  return staffFetch(`/api/admin/recruitment/staff/${id}/reset-link`, ["superadmin"], {
    method: "POST",
    body: JSON.stringify({ signInUrl: origin }),
  }) as Promise<{ emailed: boolean; emailError: string }>;
}

export async function listManagers() {
  return staffFetch("/api/admin/recruitment/managers", HIRING) as Promise<{ managers: Array<{ name: string; email: string; title: string; department: string }> }>;
}

export async function assignInterview(id: string, payload: { round: string; managerEmail: string }) {
  const origin = (process.env.NEXTAUTH_URL || "http://localhost:3000").replace(/\/$/, "");
  return staffFetch(`/api/admin/recruitment/applications/${id}/assign`, HIRING, {
    method: "POST",
    body: JSON.stringify({ ...payload, deskUrl: origin }),
  }) as Promise<{ emailed: boolean; emailError: string }>;
}

export async function sendInterview(id: string, payload: { round: string; when: string; mode: "online" | "offline"; link: string; place: string; interviewer: string; interviewerEmail: string }) {
  return staffFetch(`/api/admin/recruitment/applications/${id}/interview`, PANEL, {
    method: "POST",
    body: JSON.stringify(payload),
  }) as Promise<{ emailed: boolean; emailError: string; teammateEmailed: boolean }>;
}

export async function sendOnboarding(id: string, payload: { earliestJoin: string; latestJoin: string; documents: string[] }) {
  const origin = (process.env.NEXTAUTH_URL || "http://localhost:3000").replace(/\/$/, "");
  return staffFetch(`/api/admin/recruitment/applications/${id}/onboarding`, HIRING, {
    method: "POST",
    body: JSON.stringify({ ...payload, deskUrl: origin }),
  }) as Promise<{ emailed: boolean; emailError: string; link: string }>;
}

export async function confirmJoining(id: string, confirmedJoin: string) {
  return staffFetch(`/api/admin/recruitment/applications/${id}/onboarding/confirm`, HIRING, {
    method: "POST",
    body: JSON.stringify({ confirmedJoin }),
  }) as Promise<{ emailed: boolean; emailError: string }>;
}

export async function myProfile() {
  return staffFetch("/api/staff/me", ALL) as Promise<{ profile: { name: string; email: string; role: string; phone: string; title: string; department: string; owner: boolean } }>;
}

export async function saveProfile(payload: { name: string; phone: string; title: string; department: string }) {
  return staffFetch("/api/staff/me", ALL, { method: "PATCH", body: JSON.stringify(payload) }) as Promise<{ profile: { name: string; email: string; role: string; phone: string; title: string; department: string; owner: boolean } }>;
}

export async function changeOwnPassword(current: string, next: string) {
  return staffFetch("/api/staff/me/password", ALL, { method: "POST", body: JSON.stringify({ current, next }) });
}

export async function myNotices() {
  return staffFetch("/api/staff/notices", ALL) as Promise<{ notices: Array<{ _id: string; applicationId: string; title: string; detail: string; read: boolean; at: string }> }>;
}

export async function markNoticeRead(id: string) {
  return staffFetch(`/api/staff/notices/${id}/read`, ALL, { method: "POST" });
}

export async function completeReset(token: string, password: string) {
  const response = await fetch(`${apiBase()}/api/staff/reset`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ token, password }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error((data as { error?: string }).error || "Could not reset the password.");
  return data;
}

export type StudioPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  authorName: string;
  status: string;
  updatedAt?: string;
};

export type SocialDraft = {
  _id: string;
  channel: string;
  purpose: string;
  body: string;
  link: string;
  hashtags: string;
  status: string;
  updatedAt?: string;
};

export async function studioPosts() {
  return staffFetch("/api/admin/studio/posts", CONTENT) as Promise<{ posts: StudioPost[] }>;
}

export async function saveStudioPost(id: string | null, payload: Record<string, unknown>) {
  return staffFetch(id ? `/api/admin/studio/posts/${id}` : "/api/admin/studio/posts", CONTENT, {
    method: id ? "PATCH" : "POST",
    body: JSON.stringify(payload),
  });
}

export async function deleteStudioPost(id: string) {
  return staffFetch(`/api/admin/studio/posts/${id}`, CONTENT, { method: "DELETE" });
}

export async function studioSocial() {
  return staffFetch("/api/admin/studio/social", CONTENT) as Promise<{ social: SocialDraft[] }>;
}

export async function saveSocialDraft(id: string | null, payload: Record<string, unknown>) {
  return staffFetch(id ? `/api/admin/studio/social/${id}` : "/api/admin/studio/social", CONTENT, {
    method: id ? "PATCH" : "POST",
    body: JSON.stringify(payload),
  });
}

export async function deleteSocialDraft(id: string) {
  return staffFetch(`/api/admin/studio/social/${id}`, CONTENT, { method: "DELETE" });
}
