import type { APIRoute } from "astro";
import sharp from "sharp";
import { buildOgSvg } from "../lib/og";

export const GET: APIRoute = async () => {
  const png = await sharp(Buffer.from(buildOgSvg())).png().toBuffer();

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
