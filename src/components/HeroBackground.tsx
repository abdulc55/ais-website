'use client'

import dynamic from 'next/dynamic'

/** Lazy-load the spiral animation (GSAP ~50KB) — only loads when hero is visible */
const SpiralAnimation = dynamic(
  () => import('@/components/ui/spiral-animation').then((m) => m.SpiralAnimation),
  { ssr: false }
)

export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <SpiralAnimation />
      {/* Gradient overlay so text is readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#263353]/40 via-transparent to-[#263353]/60" />
    </div>
  )
}
