import { NextRequest, NextResponse } from "next/server";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  S3_RESOURCES_BUCKET,
  S3_RESOURCES_REGION,
  S3_VIDEO_KEYS,
  type S3VideoSlug,
} from "@/lib/s3Videos";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function isVideoSlug(slug: string): slug is S3VideoSlug {
  return slug in S3_VIDEO_KEYS;
}

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ slug: string }> }
) {
  const { slug } = await ctx.params;
  if (!isVideoSlug(slug)) {
    return NextResponse.json({ error: "Unknown video" }, { status: 404 });
  }

  const key = S3_VIDEO_KEYS[slug];
  const range = req.headers.get("range") ?? undefined;

  const client = new S3Client({ region: S3_RESOURCES_REGION });

  try {
    const output = await client.send(
      new GetObjectCommand({
        Bucket: S3_RESOURCES_BUCKET,
        Key: key,
        Range: range,
      })
    );

    if (!output.Body) {
      return NextResponse.json({ error: "Empty object" }, { status: 502 });
    }

    const headers = new Headers();
    headers.set("Content-Type", output.ContentType || "video/mp4");
    headers.set("Accept-Ranges", "bytes");
    if (output.ContentLength != null) {
      headers.set("Content-Length", String(output.ContentLength));
    }
    if (output.ContentRange) {
      headers.set("Content-Range", output.ContentRange);
    }
    headers.set("Cache-Control", "public, max-age=3600");

    const status = range && output.ContentRange ? 206 : 200;

    return new NextResponse(output.Body.transformToWebStream(), {
      status,
      headers,
    });
  } catch (e) {
    console.error("[s3-video]", slug, key, e);
    return NextResponse.json(
      {
        error:
          "Could not load video from S3. Set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and S3_RESOURCES_BUCKET on the host.",
      },
      { status: 502 }
    );
  }
}
