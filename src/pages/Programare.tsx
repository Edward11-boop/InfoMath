import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const SUBJECTS = [
  {
    id: 'matematica',
    label: 'Matematică',
    accent: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    calendarSrc: 'https://calendly.com/sorinabanut77/30min',
  },
  {
    id: 'informatica',
    label: 'Informatică',
    accent: '#3b82f6',
    gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
    calendarSrc: 'https://calendly.com/mathminds26/edin-a-consultare-online-informatica',
  },
]

function Programare() {
  const [selected, setSelected] = useState<'matematica' | 'informatica'>('matematica')

  const active = SUBJECTS.find((s) => s.id === selected)!

  return (
    <div className="bg-[#060912] min-h-screen relative overflow-x-hidden">

      {/* Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full blur-[110px] opacity-30"
          style={{ background: 'radial-gradient(circle, #6366f1, #3b82f6)', top: -150, left: -120 }} />
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-25"
          style={{ background: 'radial-gradient(circle, #8b5cf6, #ec4899)', top: 100, right: -100 }} />
        <div className="absolute w-[400px] h-[400px] rounded-full blur-[90px] opacity-20"
          style={{ background: 'radial-gradient(circle, #06b6d4, #3b82f6)', bottom: '20%', left: '35%' }} />
      </div>

      <main className="relative z-10">
        <Navbar/>
        {/* Hero */}
        <section className="flex flex-col items-center text-center px-6 pt-20 pb-12">
          <div className="inline-flex items-center gap-2.5 bg-white/[0.07] border border-white/[0.13] rounded-full px-6 py-2 mb-8 backdrop-blur-xl">
            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6] shrink-0" />
            <span className="text-[11px] text-white/75 tracking-[3px] font-sans uppercase">
              Programează o ședință
            </span>
          </div>

          <h1 className="text-[clamp(36px,6vw,68px)] font-black text-white leading-[1.1] font-serif mb-5 max-w-[700px]">
            Alege o{' '}
            <span className="bg-gradient-to-br from-blue-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
              dată și oră
            </span>
          </h1>

          <p className="text-[clamp(15px,1.8vw,18px)] text-white/50 leading-[1.85] font-sans max-w-[500px]">
            Rezervă o ședință de consultanță cu unul dintre îndrumătorii noștri.
            Alege materia și găsește un interval care ți se potrivește.
          </p>
        </section>

        {/* Subject selector */}
        <section className="flex justify-center px-6 mb-10">
          <div className="inline-flex items-center gap-2 bg-white/[0.05] border border-white/[0.1] rounded-full p-1.5 backdrop-blur-xl">
            {SUBJECTS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelected(s.id as any)}
                className="relative px-8 py-2.5 rounded-full text-sm font-semibold font-sans transition-all duration-300"
                style={{
                  color: selected === s.id ? '#fff' : 'rgba(255,255,255,0.45)',
                  background: selected === s.id ? s.gradient : 'transparent',
                  boxShadow: selected === s.id ? `0 4px 20px ${s.accent}44` : 'none',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </section>

        {/* Info cards */}
        <section className="flex justify-center gap-4 px-6 mb-10 flex-wrap">
          {[
            { label: 'Durată', value: '30 minute' },
            {label: 'Format', value: '100% online' },
            { label: 'Disponibilitate', value: 'Lun – Sâm' },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-5 py-3 backdrop-blur-xl"
            >
              <div>
                <p className="text-[11px] text-white/40 font-sans uppercase tracking-widest">{item.label}</p>
                <p className="text-sm font-semibold text-white font-sans">{item.value}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Calendar */}
        <section className="px-6 pb-20 flex justify-center">
          <div
            className="w-full rounded-3xl overflow-hidden border border-white/[0.08] backdrop-blur-xl"
            style={{
              maxWidth: 900,
              background: 'rgba(255,255,255,0.03)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.07]"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: active.accent, boxShadow: `0 0 10px ${active.accent}` }}
              />
              <span className="text-sm font-semibold text-white/80 font-sans">
                Ședință de {active.label} — Google Calendar
              </span>
            </div>

            {/* Iframe */}
            <iframe
              src={active.calendarSrc}
              className="w-full border-0"
              style={{ height: 700 }}
              title={`Programare ${active.label}`}
            />
          </div>
        </section>

        <Footer/>
      </main>
    </div>
  )
}

export default Programare