import React, { useEffect, useRef } from 'react'
import { type Meditatie } from '@/Meditatie'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
type CardsProps = Omit<Meditatie, 'id'> & { index: number }

const variants = {
  blue: {
    bg: 'from-[#0d1b4b] to-[#0a1128]',
    line: 'from-[#6B8CFF] to-[#38bdf8]',
    label: 'text-[#6B8CFF]',
    glow: 'rgba(107,140,255,0.12)',
    border: 'hover:border-[#6B8CFF]/50',
    shadow: 'hover:shadow-[0_0_60px_rgba(107,140,255,0.2)]',
  },
  purple: {
    bg: 'from-[#1e0b4b] to-[#0f0828]',
    line: 'from-[#a855f7] to-[#ec4899]',
    label: 'text-[#a855f7]',
    glow: 'rgba(168,85,247,0.12)',
    border: 'hover:border-[#a855f7]/50',
    shadow: 'hover:shadow-[0_0_60px_rgba(168,85,247,0.2)]',
  },
  pink: {
    bg: 'from-[#4b0b2e] to-[#1a0514]',
    line: 'from-[#ec4899] to-[#f97316]',
    label: 'text-[#ec4899]',
    glow: 'rgba(236,72,153,0.12)',
    border: 'hover:border-[#ec4899]/50',
    shadow: 'hover:shadow-[0_0_60px_rgba(236,72,153,0.2)]',
  },
}

const Cards = ({ title, description, variant, index }: CardsProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const v = variants[variant]

  useEffect(() => {
    const card = cardRef.current
    const line = lineRef.current
    if (!card || !line) return

    gsap.set(card, { opacity: 0, y: 80, scale: 0.92 })
    gsap.set(line, { scaleX: 0, transformOrigin: 'left center' })

    ScrollTrigger.create({
      trigger: card,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(card, {
          opacity: 1, y: 0, scale: 1,
          duration: 0.8, delay: index * 0.15, ease: 'power3.out',
        })
        gsap.to(line, {
          scaleX: 1,
          duration: 1, delay: index * 0.15 + 0.3, ease: 'power2.out',
        })
      },
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [index])

  return (
    <div
      ref={cardRef}
      className={`group relative w-full min-h-[70vh] overflow-hidden rounded-2xl p-8 flex flex-col gap-6
        bg-gradient-to-br ${v.bg}
        border border-white/10 ${v.border} ${v.shadow}
        shadow-[0_8px_32px_rgba(0,0,0,0.5)]
        transition-all duration-500 cursor-pointer`}
    >
      {/* Linie animată sus */}
      <div ref={lineRef} className={`absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r ${v.line} rounded-t-2xl`} />

      {/* Glow radial fundal */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-30"
        style={{ background: `radial-gradient(ellipse at top left, ${v.glow} 0%, transparent 60%)` }}
      />

      {/* Glow hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: `radial-gradient(ellipse at top, ${v.glow} 0%, transparent 70%)` }}
      />

      <span className={`${v.label} text-xs font-semibold tracking-widest uppercase`}>Meditație</span>

      <h3 className="text-3xl font-black text-white leading-tight">{title}</h3>

      <div className="w-full h-px bg-white/10" />

      <p className="text-base text-white/60 leading-relaxed">{description}</p>

      <div className={`absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
    </div>
  )
}

export default Cards
