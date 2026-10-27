import type { APIRoute } from "astro";
import { buildOgSvg } from "../lib/og";

export const GET: APIRoute = () =>
  new Response(buildOgSvg(), {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
