import React, { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { info } from '@/Meditatie'
import Cards from '@/components/Cards'
import { useNavigate } from 'react-router-dom'

const CODE_LINES = [
  { text: 'import heapq',                            color: '#c792ea' },
  { text: '',                                         color: '' },
  { text: 'def dijkstra(graph, start):',             color: '#82aaff' },
  { text: '    dist = {v: float("inf")',             color: '#eeffff' },
  { text: '             for v in graph}',            color: '#eeffff' },
  { text: '    dist[start] = 0',                     color: '#eeffff' },
  { text: '    pq = [(0, start)]',                   color: '#eeffff' },
  { text: '',                                         color: '' },
  { text: '    while pq:',                           color: '#c792ea' },
  { text: '        cost, u = heapq.heappop(pq)',     color: '#eeffff' },
  { text: '        if cost > dist[u]: continue',     color: '#eeffff' },
  { text: '',                                         color: '' },
  { text: '        for v, w in graph[u].items():',   color: '#c792ea' },
  { text: '            d = dist[u] + w',             color: '#eeffff' },
  { text: '            if d < dist[v]:',             color: '#c792ea' },
  { text: '                dist[v] = d',             color: '#eeffff' },
  { text: '                heapq.heappush(',         color: '#eeffff' },
  { text: '                    pq, (d, v))',         color: '#eeffff' },
  { text: '    return dist',                         color: '#82aaff' },
  { text: '',                                         color: '' },
  { text: 'graph = {',                               color: '#eeffff' },
  { text: '  "Start":   {"Matematică": 1},',         color: '#c3e88d' },
  { text: '  "Matematică": {"Algoritmi": 2},',       color: '#c3e88d' },
  { text: '  "Algoritmi":  {"Succes": 1},',          color: '#c3e88d' },
  { text: '}',                                        color: '#eeffff' },
  { text: '',                                         color: '' },
  { text: 'dijkstra(graph, "Start")',                color: '#eeffff' },
  { text: '# → {"Succes": 4} ✓',                    color: '#28c840' },
]

const TypedLine = ({ text, color, delay }: { text: string; color: string; delay: number }) => {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!text) { setDone(true); return }
    let i = 0
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) { clearInterval(iv); setDone(true) }
      }, 18)
      return () => clearInterval(iv)
    }, delay)
    return () => clearTimeout(t)
  }, [text, delay])

  return (
    <div
      className="flex items-center min-h-[1.7rem]"
      style={{ fontFamily: "'Fira Code','Courier New',monospace", fontSize: '0.88rem', lineHeight: '1.7rem' }}
    >
      <span style={{ color: color || 'transparent', whiteSpace: 'pre' }}>{displayed}</span>
      {!done && text && (
        <span className="inline-block w-[2px] h-4 ml-[1px] animate-pulse rounded-[1px] bg-[#6c63ff]" />
      )}
    </div>
  )
}

const phrases = ["cu rezultate.", "cu pasiune.", "cu dedicare.", "cu succes."]

const MainSection = () => {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[index]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60)
    }
    if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800)
    }
    if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, displayed.length - 1)), 35)
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false)
      setIndex((i) => (i + 1) % phrases.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, index])

  const lineDelays = CODE_LINES.reduce<number[]>((acc, _, i) => {
    const prev = acc[i - 1] ?? 0
    const prevLen = CODE_LINES[i - 1]?.text.length ?? 0
    acc.push(prev + prevLen * 18 + 55)
    return acc
  }, [])

  const navigate = useNavigate()
  

  return (
    <>
      <section className="flex w-full items-start gap-12 lg:pr-16">

        <div className="w-full lg:ml-12 flex flex-col lg:items-start items-center text-center lg:text-left gap-7 text-white px-6 pt-4">

          
          <div className="w-16 h-1 bg-gradient-to-r from-[#6B8CFF] to-[#a855f7] rounded-full mx-auto lg:mx-0" />

       
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full w-fit bg-[#0f1a4a]/60 border border-[#4a6aff]/30 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#6B8CFF] shrink-0" />
            <span className="text-[#C8D8FF] text-xs font-semibold tracking-widest uppercase whitespace-nowrap">
              Pregătire pentru examenul de Bacalaureat
            </span>
          </div>

       
          <div className="font-black leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
            <span className="block text-[clamp(44px,7vw,88px)] font-black text-white leading-[1.05]">
              Matematică și
            </span>
            <span className="block text-[clamp(44px,7vw,88px)] font-black text-white leading-[1.05]">
              Informatică,
            </span>
            <span className="block text-[clamp(44px,7vw,88px)] font-black leading-[1.05] bg-gradient-to-r from-[#6B8CFF] to-[#a855f7] bg-clip-text text-transparent">
              {displayed}
              <span className="text-purple-400 opacity-50">|</span>
            </span>
          </div>

       
          <div className="mt-4 max-w-3/4">
            <p className="text-gray-400 text-lg tracking-widest">
              Nu memorare, nu stres, nu pierdere de timp. Metode clare, profesori cu rezultate
              și o platformă construită pentru elevul din 2026.
            </p>
          </div>

     
          <div className="md:mt-2">
            <Button
              onClick={() => navigate('/programare')}
              className="h-12 w-50 text-md font-bold cursor-pointer rounded-full
                bg-gradient-to-b from-[#6B8CFF] to-[#a855f7]
                backdrop-blur-md border border-white/30
                shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]
                text-white
                hover:from-[#6B8CFF]/80 hover:to-[#a855f7]/80
                hover:shadow-[inset_0_2px_8px_rgba(107,140,255,0.6),inset_0_-2px_8px_rgba(168,85,247,0.6)]
                transition ease-in-out duration-300 hover:-translate-y-2">
              Înscrie-te acum <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="hidden lg:flex flex-col w-full max-w-[500px] ml-auto">
          <div
            className="rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: 'rgba(10,6,32,0.88)',
              backdropFilter: 'blur(30px)',
              border: '1px solid rgba(108,99,255,0.18)',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.04), 0 30px 80px rgba(0,0,0,0.7)',
            }}
          >
            <div
              className="flex items-center gap-2 px-4 py-3 border-b"
              style={{ borderColor: 'rgba(108,99,255,0.15)', background: 'rgba(255,255,255,0.03)' }}
            >
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 flex justify-center">
                <div
                  className="px-4 py-1 rounded-md text-xs"
                  style={{
                    background: 'rgba(108,99,255,0.15)',
                    color: 'rgba(255,255,255,0.5)',
                    fontFamily: "'Fira Code',monospace",
                  }}
                >
                   dijkstra.py
                </div>
              </div>
              <span
                className="text-xs"
                style={{ color: 'rgba(255,255,255,0.18)', fontFamily: "'Fira Code',monospace" }}
              >
                Python 3.12
              </span>
            </div>
            <div className="flex overflow-hidden h-[510px]">
              <div
                className="flex flex-col pt-3 pb-3 px-3 select-none min-w-[40px]"
                style={{
                  background: 'rgba(0,0,0,0.2)',
                  borderRight: '1px solid rgba(108,99,255,0.08)',
                }}
              >
                {CODE_LINES.map((_, i) => (
                  <div
                    key={i}
                    className="text-right"
                    style={{
                      fontFamily: "'Fira Code',monospace",
                      fontSize: '0.88rem',
                      lineHeight: '1.7rem',
                      color: 'rgba(255,255,255,0.13)',
                    }}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>

              {/* Code lines */}
              <div className="flex-1 overflow-y-auto pt-3 pb-3 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {CODE_LINES.map((line, i) => (
                  <TypedLine key={i} text={line.text} color={line.color} delay={lineDelays[i]} />
                ))}
              </div>
            </div>

            {/* Status bar */}
            <div
              className="flex items-center justify-between px-4 py-2 border-t"
              style={{ borderColor: 'rgba(108,99,255,0.12)', background: 'rgba(0,0,0,0.25)' }}
            >
              <span
                className="text-xs flex items-center gap-1.5"
                style={{ color: 'rgba(108,99,255,0.8)', fontFamily: "'Fira Code',monospace" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
                Running…
              </span>
              <span
                className="text-xs"
                style={{ color: 'rgba(255,255,255,0.18)', fontFamily: "'Fira Code',monospace" }}
              >
                Ln {CODE_LINES.length}
              </span>
            </div>
          </div>

          <style>{`@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap');`}</style>
        </div>
      </section>
      
    </>
  )
}

export default MainSection