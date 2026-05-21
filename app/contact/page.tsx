export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-4 py-12 md:py-20">
      <div className="w-full max-w-2xl flex flex-col gap-8">
        <header className="text-center animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Contact Us</h1>
          <p className="text-text-secondary">Have questions or feedback? Reach out to us.</p>
        </header>

        <section className="flex flex-col gap-6 text-text-secondary text-sm leading-relaxed">
          <div className="p-6 rounded-xl border border-border bg-bg-card animate-fade-in">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Get in Touch</h2>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-text-primary">Email</p>
                <a href="mailto:cinemacutsss08@gmail.com" className="text-accent-primary hover:underline">
                  cinemacutsss08@gmail.com
                </a>
              </div>
              <div>
                <p className="font-medium text-text-primary">Response Time</p>
                <p>We typically respond within 24&ndash;48 hours.</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-bg-card animate-fade-in">
            <h2 className="text-lg font-semibold text-text-primary mb-2">About FitPDF</h2>
            <p>FitPDF is a free online PDF compression tool that helps you optimize your PDFs for WhatsApp, email, and job portals. No signup required, no file storage, completely free.</p>
          </div>
        </section>
      </div>
    </main>
  )
}
