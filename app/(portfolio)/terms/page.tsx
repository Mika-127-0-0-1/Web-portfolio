import React from "react";

export const metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using this site.",
};

export default function TermsPage() {
  return (
    <main className="container mx-auto max-w-4xl px-6 py-20">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="text-muted-foreground mb-6">
        These Terms of Service govern your use of the site. By accessing or using the
        site you agree to be bound by these Terms. This is a simple placeholder page —
        replace with your full legal terms.
      </p>

      <section className="prose">
        <h2>1. Acceptance</h2>
        <p>By using the site, you accept these terms.</p>

        <h2>2. Use of Service</h2>
        <p>Use the service responsibly and respect the content.</p>

        <h2>3. Contact</h2>
        <p>Contact us at the email provided on the site for any questions.</p>
      </section>
    </main>
  );
}
