import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FitPDF - Make Your PDF Upload-Ready',
  description: 'Optimize your PDF for WhatsApp, Email, and job portals instantly. Free online PDF compression tool.',
  keywords: ['PDF', 'compress', 'optimize', 'WhatsApp', 'Email', 'job portal'],
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
        <Analytics />
      </body>
    </html>
  )
}