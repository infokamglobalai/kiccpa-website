export const ROLE_LABELS: Record<string, string> = {
  superadmin: "Super admin",
  admin: "Admin",
  hr: "HR",
  manager: "Department manager",
  seo: "SEO",
  marketing: "Marketing",
};

export function canHire(role?: string | null) {
  return role === "superadmin" || role === "admin" || role === "hr";
}

export function canInterview(role?: string | null) {
  return canHire(role) || role === "manager";
}

export function canPublish(role?: string | null) {
  return role === "superadmin" || role === "admin" || role === "seo" || role === "marketing";
}

export function deskHome(role?: string | null) {
  if (role === "manager") return "/admin/recruitment/applications";
  return canHire(role) ? "/admin/recruitment" : "/admin/studio";
}
