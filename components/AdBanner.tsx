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

  useEffect(() => {
    if (!caPub || !adSlot) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {}
  }, [caPub, adSlot])

  if (!caPub || !adSlot) return null

  const style: React.CSSProperties =
    format === 'horizontal' ? { display: 'block' } :
    format === 'vertical' ? { display: 'block' } :
    format === 'rectangle' ? { display: 'block' } :
    { display: 'block' }

  const dataFormat = format === 'auto' ? 'auto' : format

  return (
    <div className={`w-full flex justify-center py-4 ${className}`}>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={style}
        data-ad-client={caPub}
        data-ad-slot={adSlot}
        data-ad-format={dataFormat}
        data-full-width-responsive="true"
      />
    </div>
  )
}
