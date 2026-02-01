import React from "react";

export const metadata = {
  title: "Privacy Policy",
  description: "How we collect and use personal data.",
};

export default function PrivacyPage() {
  return (
    <main className="container mx-auto max-w-4xl px-6 py-20">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-muted-foreground mb-6">
        This Privacy Policy describes how and why we might collect, store, and use
        your personal information when you use the site. This is a placeholder — replace
        with your detailed privacy policy text.
      </p>

      <section className="prose">
        <h2>Information We Collect</h2>
        <p>We may collect personal information you provide directly to us.</p>

        <h2>How We Use Information</h2>
        <p>We use information to operate, maintain, and provide features of the site.</p>

        <h2>Contact</h2>
        <p>Contact us at the email provided on the site for privacy-related requests.</p>
      </section>
    </main>
  );
}
