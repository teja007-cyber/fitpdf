export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-4 py-12 md:py-20">
      <div className="w-full max-w-2xl flex flex-col gap-8">
        <header className="text-center animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">About FitPDF</h1>
          <p className="text-text-secondary">Simple, fast, free PDF compression — no signup required</p>
        </header>

        <section className="flex flex-col gap-6 text-text-secondary text-sm leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-2">What We Do</h2>
            <p>FitPDF is a free online tool that instantly optimizes your PDF files for WhatsApp, email, job portals, and anywhere file size matters. Upload your PDF, pick a target size, and download a smaller version — all in your browser, no signup needed.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-2">Why FitPDF?</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Fast</strong> &mdash; Compression happens in seconds, not minutes</li>
              <li><strong>Free</strong> &mdash; No hidden charges, no credit card, no signup</li>
              <li><strong>Private</strong> &mdash; Your files are processed in memory and never stored</li>
              <li><strong>Simple</strong> &mdash; Upload, select your platform, and download</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-2">How It Works</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Upload your PDF file (up to 50MB)</li>
              <li>Choose your target platform &mdash; WhatsApp (2MB), Email (25MB), Job Portal (2MB), or set a custom size</li>
              <li>Click &ldquo;Fix my PDF&rdquo; and download your optimized file instantly</li>
            </ol>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-2">Our Commitment</h2>
            <p>We believe file compression should be accessible to everyone. No accounts, no data collection, no unnecessary friction. Your privacy is built into every part of FitPDF &mdash; files are processed server-side and immediately discarded.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-2">Contact</h2>
            <p>Questions or feedback? Reach out at <a href="mailto:cinemacutsss08@gmail.com" className="text-accent-primary hover:underline">cinemacutsss08@gmail.com</a>.</p>
          </div>
        </section>
      </div>
    </main>
  )
}
