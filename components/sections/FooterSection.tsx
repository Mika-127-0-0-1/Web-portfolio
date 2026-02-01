import Link from "next/link";
import type { SiteSettings } from "@/sanity.types";

export default function FooterSection({
  footer,
}: {
  footer?: SiteSettings["footer"] | null;
}) {
  // If no footer configured, still render nothing (this keeps behavior stable)
  if (!footer) return null;

  const links = footer.links || [];
  const defaultLinks = [
    { title: "Terms", url: "/terms" },
    { title: "Privacy", url: "/privacy" },
  ];

  // Combine configured links with default ones (avoid duplicates by url)
  const combinedLinks = [...links];
  for (const dl of defaultLinks) {
    if (!combinedLinks.some((l) => l.url === dl.url)) {
      combinedLinks.push({ _key: dl.url, title: dl.title, url: dl.url } as any);
    }
  }

  return (
    <footer id="contact-footer" className="mt-12 pt-10 border-t border-border">
      <div className="container mx-auto max-w-6xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          {footer.text && <p className="mb-2">{footer.text}</p>}
          {footer.copyrightText && (
            <p className="text-xs opacity-80">{footer.copyrightText}</p>
          )}
        </div>

        {combinedLinks.length > 0 && (
          <nav className="flex flex-wrap gap-3">
            {combinedLinks.map((l) => (
              <a
                key={(l as any)._key ?? l.url}
                href={l.url}
                target={l.url?.startsWith("http") ? "_blank" : undefined}
                rel={l.url?.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-sm hover:underline text-primary"
              >
                {l.title || l.url}
              </a>
            ))}
          </nav>
        )}
      </div>
    </footer>
  );
}
