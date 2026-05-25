'use client'

import { useEffect, useRef } from 'react'

interface AdBannerProps {
  caPub: string
  adSlot: string
  format?: 'horizontal' | 'vertical' | 'rectangle' | 'auto'
  className?: string
}

export default function AdBanner({ caPub, adSlot, format = 'auto', className = '' }: AdBannerProps) {
  const insRef = useRef<HTMLModElement>(null)
  const pushed = useRef(false)

  useEffect(() => {
    if (!caPub || !adSlot || pushed.current) return
    const timer = setTimeout(() => {
      try {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
        pushed.current = true
      } catch {}
    }, 200)
    return () => clearTimeout(timer)
  }, [caPub, adSlot])

  if (!caPub || !adSlot) return null

  return (
    <div className={`w-full flex justify-center py-4 ${className}`}>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={caPub}
        data-ad-slot={adSlot}
        data-ad-format={format === 'auto' ? 'auto' : format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
