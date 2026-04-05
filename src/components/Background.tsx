import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Background() {
  const blob1Ref = useRef<HTMLDivElement>(null)
  const blob2Ref = useRef<HTMLDivElement>(null)
  const blob3Ref = useRef<HTMLDivElement>(null)
  const blob4Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.to(blob1Ref.current, { x: 60, y: -50, scale: 1.15, duration: 11, yoyo: true, repeat: -1, ease: 'sine.inOut' })
    gsap.to(blob2Ref.current, { x: -50, y: 60, scale: 0.9, duration: 14, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 2 })
    gsap.to(blob3Ref.current, { x: 40, y: -30, scale: 1.1, duration: 9, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 1 })
    gsap.to(blob4Ref.current, { x: -30, y: 50, scale: 1.2, duration: 12, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 3 })
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden', background: '#060912' }}>
      <div ref={blob1Ref} style={{ position: 'absolute', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, #3b82f6, #6366f1)', filter: 'blur(120px)', opacity: 0.28, top: -200, left: -150 }} />
      <div ref={blob2Ref} style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, #8b5cf6, #ec4899)', filter: 'blur(110px)', opacity: 0.22, top: 200, right: -150 }} />
      <div ref={blob3Ref} style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, #06b6d4, #3b82f6)', filter: 'blur(100px)', opacity: 0.18, bottom: '20%', left: '25%' }} />
      <div ref={blob4Ref} style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, #6366f1, #8b5cf6)', filter: 'blur(90px)', opacity: 0.15, bottom: 0, right: '5%' }} />
    </div>
  )
}