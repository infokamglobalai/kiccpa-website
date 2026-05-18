import { NextRequest, NextResponse } from "next/server";

/** Express base URL (server-side only; not exposed to the browser). */
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

async function proxyToExpress(req: NextRequest, pathSegments: string[]) {
  const path = pathSegments.join("/");
  const target = `${backendBase()}/api/${path}${req.nextUrl.search}`;

  const method = req.method;
  const init: RequestInit = {
    method,
    redirect: "manual",
  };

  if (!["GET", "HEAD"].includes(method)) {
    const rawCt = req.headers.get("content-type") || "";
    const buf = await req.arrayBuffer();
    const headers = new Headers();

    if (rawCt.includes("multipart/form-data")) {
      headers.set("content-type", rawCt);
    } else if (rawCt) {
      headers.set("content-type", rawCt);
    } else if (buf.byteLength > 0) {
      headers.set("content-type", "application/json; charset=utf-8");
    }

    if (buf.byteLength > 0) {
      init.body = buf;
    }
    if ([...headers.keys()].length > 0) {
      init.headers = headers;
    }
  }

  let upstream: Response;
  try {
    upstream = await fetch(target, init);
  } catch (e) {
    console.error("[api proxy] fetch failed:", target, e);
    const hint =
      process.env.NODE_ENV === "production"
        ? "Set BACKEND_PROXY_URL in Amplify to your live API (e.g. https://your-ec2-host)."
        : "Start Express: cd backend && npm run dev (port 5000).";
    return NextResponse.json(
      { error: `Backend unreachable at ${target}. ${hint}` },
      { status: 502 }
    );
  }

  const headers = new Headers(upstream.headers);
  headers.delete("transfer-encoding");

  return new NextResponse(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers,
  });
}

async function handle(req: NextRequest, ctx: RouteCtx) {
  const { path } = await ctx.params;
  const segments = path ?? [];
  if (segments.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return proxyToExpress(req, segments);
}

export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const PATCH = handle;
export const DELETE = handle;
export const OPTIONS = handle;
