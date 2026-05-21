'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

export default function ConsentManager({ GA_MEASUREMENT_ID }: { GA_MEASUREMENT_ID: string }) {
  const [consent, setConsent] = useState<'granted' | 'denied' | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('consentGranted')
    if (stored === 'true') {
      window.gtag?.('consent', 'update', {
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        ad_storage: 'granted',
        analytics_storage: 'granted',
      })
      setConsent('granted')
    } else if (stored === 'false') {
      setConsent('denied')
    }
  }, [])

  function handleAccept() {
    localStorage.setItem('consentGranted', 'true')
    window.gtag?.('consent', 'update', {
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      ad_storage: 'granted',
      analytics_storage: 'granted',
    })
    setConsent('granted')
  }

  function handleReject() {
    localStorage.setItem('consentGranted', 'false')
    setConsent('denied')
  }

  return (
    <>
      {consent === 'granted' && (
        <>
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      )}
      {consent === null && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4">
            <p className="text-sm text-gray-600 flex-1">
              We use cookies to improve your experience and analyze site usage.
              By clicking &ldquo;Accept All&rdquo;, you consent to our use of cookies.
            </p>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={handleReject}
                className="px-4 py-2 text-sm border rounded hover:bg-gray-50 transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={handleAccept}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
