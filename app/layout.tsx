import type { Metadata } from 'next'
import './globals.css'
import ConsentManager from '@/components/ConsentManager'
import { Analytics } from '@vercel/analytics/react'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-EC8PYTQ2HD'
const AD_CLIENT = process.env.NEXT_PUBLIC_AD_CLIENT || ''

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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="Re1YnfDvswmUi2TL0uOMNWSRdRrnqKOVmslBXJXTywE" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{'ad_user_data':'denied','ad_personalization':'denied','ad_storage':'denied','analytics_storage':'denied','wait_for_update':500});`,
          }}
        />
      </head>
      <body>
        <Analytics />
        {children}
        <ConsentManager GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} AD_CLIENT={AD_CLIENT} />
      </body>
    </html>
  )
}