import type { Metadata } from 'next'
import './globals.css'
import GoogleAnalytics from '@/components/GoogleAnalytics'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'

export const metadata: Metadata = {
  title: 'FitPDF - Make Your PDF Upload-Ready',
  description: 'Optimize your PDF for WhatsApp, Email, and job portals instantly. Free online PDF compression tool.',
  keywords: ['PDF', 'compress', 'optimize', 'WhatsApp', 'Email', 'job portal'],
  openGraph: {
    title: 'FitPDF - Make Your PDF Upload-Ready',
    description: 'Optimize your PDF for WhatsApp, Email, and job portals instantly. Free online PDF compression tool.',
    type: 'website',
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
        {children}
        <GoogleAnalytics GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />
      </body>
    </html>
  )
}