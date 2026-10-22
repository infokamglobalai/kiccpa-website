import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth-config";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  const secret = process.env.STAFF_API_SECRET;
  const hiring = role === "hr" || role === "admin" || role === "superadmin";
  if (!session?.user?.email || !secret || !hiring) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }
  const api = (process.env.BACKEND_PROXY_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:5000").replace(/\/$/, "");
  const upstream = await fetch(`${api}/api/admin/recruitment/applications.csv${req.nextUrl.search}`, {
    headers: {
      "x-staff-key": secret,
      "x-staff-role": role,
      "x-staff-email": session.user.email,
    },
  });
  if (!upstream.ok) {
    const data = await upstream.json().catch(() => ({ error: "Export unavailable." }));
    return NextResponse.json(data, { status: upstream.status });
  }
  return new NextResponse(upstream.body, {
    status: 200,
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="kiccpa-applications.csv"',
    },
  });
}
