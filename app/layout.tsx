import type { Metadata } from 'next'
import './globals.css'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import AdSense from '@/components/AdSense'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-EC8PYTQ2HD'
const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-xxxxxxxxxxxxxxx'

export const metadata: Metadata = {
  title: 'FitPDF - Make Your PDF Upload-Ready',
  description: 'Optimize your PDF for WhatsApp, Email, and job portals instantly. Free online PDF compression tool.',
  keywords: ['PDF', 'compress', 'optimize', 'WhatsApp', 'Email', 'job portal'],
  metadataBase: new URL('https://fitpdf-mu.vercel.app'),
  openGraph: {
    title: 'FitPDF - Make Your PDF Upload-Ready',
    description: 'Optimize your PDF for WhatsApp, Email, and job portals instantly. Free online PDF compression tool.',
    type: 'website',
  },
  other: {
    'google-site-verification': 'google2f828285b496f153',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AdSense caPub={ADSENSE_CLIENT_ID} />
        {children}
        <GoogleAnalytics GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />
      </body>
    </html>
  )
}