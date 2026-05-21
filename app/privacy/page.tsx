export default function PrivacyPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-4 py-12 md:py-20">
      <div className="w-full max-w-2xl flex flex-col gap-8">
        <header className="text-center animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Privacy Policy</h1>
          <p className="text-text-secondary">Last updated: May 21, 2026</p>
        </header>

        <section className="flex flex-col gap-6 text-text-secondary text-sm leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-2">1. Information We Collect</h2>
            <p>When you use FitPDF, we collect the following information:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>PDF files you upload for compression (processed temporarily, not stored)</li>
              <li>Basic usage data through Google Analytics (page views, interactions)</li>
              <li>Ad interaction data through Google AdSense</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-2">2. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To provide PDF compression services</li>
              <li>To improve our website and user experience</li>
              <li>To serve relevant advertisements</li>
              <li>To analyze website traffic and usage patterns</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-2">3. Data Storage and Security</h2>
            <p>Uploaded PDF files are processed in memory and immediately discarded after compression. We do not store, retain, or share your uploaded files. All processing happens securely.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-2">4. Cookies and Consent</h2>
            <p>We use cookies for analytics and advertising purposes. You control your consent through our cookie banner. You can accept or reject non-essential cookies at any time.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-2">5. Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Google Analytics</strong> &mdash; for anonymous usage analytics</li>
              <li><strong>Google AdSense</strong> &mdash; for serving contextual advertisements</li>
              <li><strong>Vercel</strong> &mdash; for website hosting and infrastructure</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-2">6. GDPR Compliance</h2>
            <p>For users in the European Economic Area (EEA), we comply with GDPR requirements. We obtain explicit consent before setting non-essential cookies, and you have the right to access, rectify, or delete your data.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-2">7. Contact</h2>
            <p>For privacy-related inquiries, contact us at: <a href="mailto:cinemacutsss08@gmail.com" className="text-accent-primary hover:underline">cinemacutsss08@gmail.com</a></p>
          </div>
        </section>
      </div>
    </main>
  )
}
