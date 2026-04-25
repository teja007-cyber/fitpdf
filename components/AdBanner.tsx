'use client'

export default function AdBanner({ caPub }: { caPub: string }) {
  return (
    <div className="w-full flex justify-center py-4">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={caPub}
        data-ad-slot="your-ad-slot"
        data-ad-format="horizontal"
        data-full-width-responsive="true"
      />
    </div>
  )
}