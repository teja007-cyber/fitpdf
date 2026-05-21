export default function TermsPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-4 py-12 md:py-20">
      <div className="w-full max-w-2xl flex flex-col gap-8">
        <header className="text-center animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Terms of Service</h1>
          <p className="text-text-secondary">Last updated: May 21, 2026</p>
        </header>

        <section className="flex flex-col gap-6 text-text-secondary text-sm leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-2">1. Acceptance of Terms</h2>
            <p>By using FitPDF, you agree to these terms. If you do not agree, do not use the service.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-2">2. Service Description</h2>
            <p>FitPDF provides free PDF compression and optimization tools. All processing happens server-side and files are not stored permanently.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-2">3. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Upload malicious files or content</li>
              <li>Attempt to disrupt or overwhelm the service</li>
              <li>Use the service for illegal purposes</li>
              <li>Upload files you do not have the right to process</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-2">4. Limitation of Liability</h2>
            <p>FitPDF is provided &ldquo;as is&rdquo; without warranty. We are not liable for any damages arising from the use of this service.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-2">5. Changes to Terms</h2>
            <p>We reserve the right to update these terms at any time. Continued use after changes constitutes acceptance.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-2">6. Contact</h2>
            <p>For questions about these terms, contact: <a href="mailto:cinemacutsss08@gmail.com" className="text-accent-primary hover:underline">cinemacutsss08@gmail.com</a></p>
          </div>
        </section>
      </div>
    </main>
  )
}
