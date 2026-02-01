import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const clerk = clerkMiddleware();

// Small in-memory cache to reduce Sanity API calls when under heavy bot traffic
const CACHE_TTL = 30_000; // 30s
let cache: { settings: any | null; expires: number } = { settings: null, expires: 0 };

export default async function middleware(req: NextRequest) {
  const ua = req.headers.get("user-agent") || "";
  const isBot = /bot|crawl|slurp|spider|bingpreview|facebookexternalhit|googlebot/i.test(ua);

  if (isBot) {
    const now = Date.now();

    if (!cache.settings || cache.expires < now) {
      const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
      const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

      if (projectId && dataset) {
        const query = encodeURIComponent(`*[_id == "singleton-siteSettings"][0]{maintenanceMode, maintenanceMessage, siteTitle}`);
        const url = `https://${projectId}.api.sanity.io/v1/data/query/${dataset}?query=${query}`;

        try {
          const res = await fetch(url, { cache: "no-cache" });
          if (res.ok) {
            const json = await res.json();
            cache.settings = json?.result || null;
          } else {
            cache.settings = null;
          }
        } catch (err) {
          cache.settings = null;
        }
      }

      cache.expires = Date.now() + CACHE_TTL;
    }

    const settings = cache.settings;
    if (settings?.maintenanceMode) {
      const title = settings.siteTitle || "Site maintenance";
      const message =
        settings.maintenanceMessage ||
        "The site is temporarily unavailable due to maintenance. Please check back later.";

      const body = `<!doctype html><html><head><meta charset="utf-8"/><meta name="robots" content="noindex,nofollow"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${title}</title></head><body><main style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px;text-align:center;font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial"><div><h1 style="font-size:28px;margin-bottom:16px">We'll be back soon</h1><p style="font-size:16px;color:#666">${message}</p></div></main></body></html>`;

      return new Response(body, {
        status: 503,
        statusText: "Service Unavailable",
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Retry-After": "3600",
          "x-robots-tag": "noindex, nofollow",
        },
      });
    }
  }

  // Fallback to Clerk middleware for normal requests
  return clerk(req as any, {} as any);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
