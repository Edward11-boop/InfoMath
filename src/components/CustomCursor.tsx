import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface Particle {
  x: number; y: number; vx: number; vy: number
  life: number; maxLife: number; size: number; color: string
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4', '#ec4899', '#6366f1']

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e: MouseEvent) => {
          if (cursorRef.current) {
            gsap.to(cursorRef.current, { 
              left: e.clientX, 
              top: e.clientY, 
              duration: 0.5, 
              ease: 'power2.out' 
            })
          }
          if (dotRef.current) {
            dotRef.current.style.left = e.clientX + 'px'
            dotRef.current.style.top = e.clientY + 'px'
          }

          for (let i = 0; i < 3; i++) {
            particlesRef.current.push({
              x: e.clientX + (Math.random() - 0.5) * 8,
              y: e.clientY + (Math.random() - 0.5) * 8,
              vx: (Math.random() - 0.5) * 2,
              vy: (Math.random() - 0.5) * 2 - 1,
              life: 1,
              maxLife: 0.6 + Math.random() * 0.4,
              size: 2 + Math.random() * 3,
              color: COLORS[Math.floor(Math.random() * COLORS.length)],
            })
          }
        }

    const onEnter = () => gsap.to(cursorRef.current, { scale: 1.8, duration: 0.3 })
    const onLeave = () => gsap.to(cursorRef.current, { scale: 1, duration: 0.3 })

    document.querySelectorAll('button, a').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particlesRef.current = particlesRef.current.filter(p => p.life > 0)
      particlesRef.current.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.life -= 0.025
        const alpha = Math.max(0, p.life / p.maxLife)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2)
        ctx.fillStyle = p.color + Math.floor(alpha * 255).toString(16).padStart(2, '0')
        ctx.fill()
      })
      rafRef.current = requestAnimationFrame(animate)
    }
    animate()

    window.addEventListener('mousemove', onMove)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 9998, pointerEvents: 'none' }} />
      <div ref={cursorRef} style={{ position: 'fixed', zIndex: 9999, pointerEvents: 'none', width: 36, height: 36, borderRadius: '50%', border: '1.5px solid rgba(99,102,241,0.7)', transform: 'translate(-50%, -50%)', mixBlendMode: 'screen' }} />
      <div ref={dotRef} style={{ position: 'fixed', zIndex: 9999, pointerEvents: 'none', width: 5, height: 5, borderRadius: '50%', background: '#fff', transform: 'translate(-50%, -50%)' }} />
    </>
  )
}