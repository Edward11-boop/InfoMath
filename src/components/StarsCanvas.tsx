import { useEffect, useRef } from 'react'

interface Star {
  x: number; y: number; vx: number; vy: number
  size: number; alpha: number; color: string; connections: number[]
}

type Props = { isMobile?: boolean }

export default function StarsCanvas({ isMobile = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4', '#ffffff', '#6366f1']

    const STAR_COUNT = isMobile ? 40 : 120
    const CONNECTION_DIST = isMobile ? 0 : 100   // pe mobil nu desenăm linii
    const MOUSE_DIST = isMobile ? 0 : 150         // pe mobil nu e repulsie mouse

    const initStars = () => {
      starsRef.current = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        size: 0.5 + Math.random() * 1.5, alpha: 0.2 + Math.random() * 0.6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)], connections: [],
      }))
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initStars()
    }

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const stars = starsRef.current
      const mouse = mouseRef.current

      stars.forEach(s => {
        if (MOUSE_DIST > 0) {
          const dx = mouse.x - s.x
          const dy = mouse.y - s.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_DIST) { s.x -= dx * 0.015; s.y -= dy * 0.015 }
        }
        s.x += s.vx; s.y += s.vy
        if (s.x < 0) s.x = canvas.width
        if (s.x > canvas.width) s.x = 0
        if (s.y < 0) s.y = canvas.height
        if (s.y > canvas.height) s.y = 0
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fillStyle = s.color + Math.floor(s.alpha * 255).toString(16).padStart(2, '0')
        ctx.fill()
      })

      if (CONNECTION_DIST > 0) {
        for (let i = 0; i < stars.length; i++) {
          for (let j = i + 1; j < stars.length; j++) {
            const dx = stars[i].x - stars[j].x
            const dy = stars[i].y - stars[j].y
            const d = Math.sqrt(dx * dx + dy * dy)
            if (d < CONNECTION_DIST) {
              ctx.beginPath()
              ctx.moveTo(stars[i].x, stars[i].y)
              ctx.lineTo(stars[j].x, stars[j].y)
              ctx.strokeStyle = `rgba(99,102,241,${(1 - d / CONNECTION_DIST) * 0.15})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    resize()
    animate()
    window.addEventListener('resize', resize)
    if (!isMobile) window.addEventListener('mousemove', onMove)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [isMobile])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
    />
  )
}