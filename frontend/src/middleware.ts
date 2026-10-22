import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

function home(role?: string) {
  if (role === "manager") return "/admin/recruitment/applications";
  if (role === "seo" || role === "marketing") return "/admin/studio";
  return "/admin/recruitment";
}

export default withAuth(
  function middleware(req) {
    const role = (req.nextauth.token as { role?: string } | null)?.role;
    const path = req.nextUrl.pathname;
    if (!role) return NextResponse.next();
    const hiring = role === "superadmin" || role === "admin" || role === "hr";
    const content = role === "superadmin" || role === "admin" || role === "seo" || role === "marketing";
    const manager = role === "manager";
    if (path.startsWith("/admin/settings")) return NextResponse.next();
    if (manager && (path === "/admin/recruitment" || path.startsWith("/admin/recruitment/jobs") || path.startsWith("/admin/recruitment/staff"))) {
      return NextResponse.redirect(new URL("/admin/recruitment/applications", req.url));
    }
    if (path.startsWith("/admin/recruitment/staff") && role !== "superadmin" && role !== "admin") {
      return NextResponse.redirect(new URL(home(role), req.url));
    }
    if (path.startsWith("/admin/recruitment") && !hiring && !manager) {
      return NextResponse.redirect(new URL(home(role), req.url));
    }
    if ((path.startsWith("/admin/studio") || path.startsWith("/admin/posts")) && !content) {
      return NextResponse.redirect(new URL(home(role), req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;
        if (path === "/admin/login" || path.startsWith("/admin/login/") || path.startsWith("/admin/reset-password")) return true;
        return Boolean(token);
      },
    },
    pages: {
      signIn: "/admin/login",
    },
  }
);

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
