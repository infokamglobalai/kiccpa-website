import { NextRequest, NextResponse } from "next/server";

function backendBase(): string {
  return (
    process.env.BACKEND_PROXY_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "http://127.0.0.1:5000"
  ).replace(/\/$/, "");
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type RouteCtx = { params: Promise<{ path: string[] }> };

/** Serve uploaded files from Express via same-origin `/uploads/*` (matches brochure PDFs, etc.). */
export async function GET(req: NextRequest, ctx: RouteCtx) {
  const { path } = await ctx.params;
  const segments = path ?? [];
  if (segments.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const target = `${backendBase()}/uploads/${segments.join("/")}${req.nextUrl.search}`;
  let upstream: Response;
  try {
    upstream = await fetch(target, { method: "GET", redirect: "manual" });
  } catch (e) {
    console.error("[uploads proxy] fetch failed:", target, e);
    return NextResponse.json({ error: "Backend unreachable" }, { status: 502 });
  }

  const headers = new Headers(upstream.headers);
  headers.delete("transfer-encoding");

  return new NextResponse(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers,
  });
}
