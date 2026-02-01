"use client";
import { useEffect } from "react";
import type { SiteSettings } from "@/sanity.types";

export default function SiteSettingsClient({
  settings,
}: {
  settings?: SiteSettings | null;
}) {
  useEffect(() => {
    if (!settings) return;

    const root = document.documentElement;

    if (settings.primaryColor) {
      root.style.setProperty("--primary", settings.primaryColor);
    }
    if (settings.secondaryColor) {
      root.style.setProperty("--secondary", settings.secondaryColor);
    }
    if (settings.accentColor) {
      root.style.setProperty("--accent", settings.accentColor);
    }

    if (settings.siteTitle) {
      document.title = settings.siteTitle;
      const meta = document.querySelector('meta[name="description"]');
      if (meta && settings.siteDescription) {
        meta.setAttribute("content", settings.siteDescription);
      }
    }

    // favicon (if asset url is provided) — expects a full URL string in settings.favicon?.asset?->_ref is not resolved here,
    // but if Studio stores an URL field or the query passes a resolved URL, this will work. Otherwise Studio needs to publish a url.
    // This keeps it simple and non-breaking.
    try {
      const favicon = (settings as any)?.favicon?.asset?.url;
      if (favicon) {
        const link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
        if (link) {
          link.href = favicon;
        } else {
          const newLink = document.createElement("link");
          newLink.rel = "icon";
          newLink.href = favicon;
          document.head.appendChild(newLink);
        }
      }
    } catch (e) {
      // ignore
    }

    // Optionally handle maintenance mode by toggling a data-attribute on body
    if (typeof settings.maintenanceMode !== "undefined") {
      if (settings.maintenanceMode) {
        document.body.setAttribute("data-maintenance", "true");
      } else {
        document.body.removeAttribute("data-maintenance");
      }
    }
  }, [settings]);

  return null;
}
