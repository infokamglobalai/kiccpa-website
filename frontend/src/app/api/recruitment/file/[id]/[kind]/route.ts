import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth-config";

export async function GET(_req: Request, ctx: { params: Promise<{ id: string; kind: string }> }) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  const secret = process.env.STAFF_API_SECRET;
  const hiring = role === "hr" || role === "admin" || role === "superadmin" || role === "manager";
  if (!session?.user?.email || !secret || !hiring) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }
  const { id, kind } = await ctx.params;
  const allowed = ["resume", "extra", "civil-id", "emirates-id", "aadhaar", "pan", "passport", "visa-page", "police-clearance", "medical", "cancelled-cheque", "national-id", "kra-pin", "cin", "government-id", "work-authorisation", "photo", "degree", "experience-letter", "relieving-letter", "salary-slip", "signed-offer", "noc", "bank-proof", "address-proof", "attested-degree"];
  if (!allowed.includes(kind)) {
    return NextResponse.json({ error: "Unknown file." }, { status: 404 });
  }
  const api = (process.env.BACKEND_PROXY_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:5000").replace(/\/$/, "");
  const upstream = await fetch(`${api}/api/admin/recruitment/applications/${id}/file/${kind}`, {
    headers: {
      "x-staff-key": secret,
      "x-staff-role": role,
      "x-staff-email": session.user.email,
    },
  });
  if (!upstream.ok) {
    const data = await upstream.json().catch(() => ({ error: "File unavailable." }));
    return NextResponse.json(data, { status: upstream.status });
  }
  const headers = new Headers();
  const disposition = upstream.headers.get("content-disposition");
  const type = upstream.headers.get("content-type");
  if (disposition) headers.set("content-disposition", disposition);
  if (type) headers.set("content-type", type);
  return new NextResponse(upstream.body, { status: 200, headers });
}
