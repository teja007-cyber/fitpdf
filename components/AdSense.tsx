'use client'

import Script from 'next/script'

export default function AdSense({ caPub }: { caPub?: string }) {
  if (!caPub) return null

  return (
    <Script
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${caPub}`}
      crossOrigin="anonymous"
    />
  )
}