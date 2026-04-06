import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import sorina from '../assets/poza_sorina.jpeg'
import eduard from '../assets/poza_edi2.jpeg'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

gsap.registerPlugin(ScrollTrigger)

const teachers = [
  {
    name: 'Tomulescu Eduard',
    role: 'Îndrumătorul tău la Informatică',
    subject: 'Informatică',
    quote: '"Pentru a putea întrebuinţa calculatorul la studiul problemelor concrete, omul e obligat să înveţe să gândească exact şi abstract." (Grigore Moisil)',
    paragraphs: [
      'Sunt student la Facultatea de Inginerie în Limbi Străine (Calculatoare și Tehnologia Informației). Pentru mine, programarea nu înseamnă doar să scrii linii de cod, ci să înțelegi logica din spatele lor.',
      'Te voi învăța să gândești algoritmic, pas cu pas, astfel încât orice problemă de informatică să devină un puzzle pe care știi cum să-l rezolvi.',
      
    ],
    gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
    accentColor: '#3b82f6',
    image: eduard,
    reverse: false,
  },
  {
    name: 'Sorina Bănuț',
    role: 'Îndrumătorul tău la Matematică',
    subject: 'Matematică',
    quote: '„Matematica este limba cu care Dumnezeu a scris universul.” (Galileo Galilei)',
    paragraphs: [
      'Sunt studentă la Facultatea de Matematică și Informatică (Universitatea din București). Scopul meu este să îți arăt că matematica este logică și plină de sens.',
      'Indiferent de nivelul de la care pornești, vom lucra împreună în ritmul tău, construind o bază solidă care să te ajute să obții rezultatele pe care ți le dorești.',
    ],
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    accentColor: '#8b5cf6',
    image: sorina,
    reverse: true,
  },
]

const ValueIcon = ({ type, color }: { type: string; color: string }) => {
  const base = {
    width: 26, height: 26, strokeWidth: 1.75,
    fill: 'none' as const, stroke: color,
    strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
  }
  if (type === 'target') return (
    <svg {...base} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
      <line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/>
      <line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/>
    </svg>
  )
  if (type === 'brain') return (
    <svg {...base} viewBox="0 0 24 24">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
    </svg>
  )
  if (type === 'monitor') return (
    <svg {...base} viewBox="0 0 24 24">
      <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
      <polyline points="7 10 10 13 13 10 17 14"/>
    </svg>
  )
  if (type === 'users') return (
    <svg {...base} viewBox="0 0 24 24">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )
  return null
}

const values = [
  {
    iconType: 'target',
    accent: '#3b82f6',
    title: 'Rezultate reale',
    text: 'Măsurăm succesul prin notele elevilor, nu prin promisiuni. Fiecare lecție are un scop clar.',
  },
  {
    iconType: 'brain',
    accent: '#8b5cf6',
    title: 'Înțelegere, nu memorare',
    text: 'Predăm conceptele de la zero. Un elev care înțelege cu adevărat nu uită niciodată.',
  },
  {
    iconType: 'monitor',
    accent: '#06b6d4',
    title: '100% online',
    text: 'Accesezi orice lecție, oricând, de pe orice dispozitiv. Fără drum, fără timp pierdut.',
  },
  {
    iconType: 'users',
    accent: '#ec4899',
    title: 'Comunitate',
    text: 'Nu ești singur în pregătire. Faci parte dintr-o comunitate de elevi cu același obiectiv.',
  },
]

const DespreNoi = () => {
  const pageRef = useRef<HTMLDivElement>(null)
  const blob1Ref = useRef<HTMLDivElement>(null)
  const blob2Ref = useRef<HTMLDivElement>(null)
  const blob3Ref = useRef<HTMLDivElement>(null)
  const blob4Ref = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const heroTitleRef = useRef<HTMLHeadingElement>(null)
  const heroSubRef = useRef<HTMLParagraphElement>(null)
  const valuesGridRef = useRef<HTMLDivElement>(null)
  const valuesTitleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(blob1Ref.current, { x: 60, y: -40, scale: 1.15, duration: 10, yoyo: true, repeat: -1, ease: 'sine.inOut' })
      gsap.to(blob2Ref.current, { x: -50, y: 50, scale: 0.9, duration: 13, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 1.5 })
      gsap.to(blob3Ref.current, { x: 30, y: -30, scale: 1.1, duration: 9, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 3 })
      gsap.to(blob4Ref.current, { x: -40, y: 60, scale: 1.2, duration: 12, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 2 })

      const heroTl = gsap.timeline({ delay: 0.3 })
      heroTl
        .fromTo(badgeRef.current, { opacity: 0, y: 30, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(2)' })
        .fromTo(heroTitleRef.current, { opacity: 0, y: 50, letterSpacing: '0.1em' }, { opacity: 1, y: 0, letterSpacing: 'normal', duration: 0.9, ease: 'power4.out' }, '-=0.3')
        .fromTo(heroSubRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')

      const teacherRows = document.querySelectorAll('.teacher-row')
      teacherRows.forEach((row) => {
        const photo = row.querySelector('.t-photo')
        const text = row.querySelector('.t-text')
        const isReversed = row.classList.contains('reversed')

        gsap.fromTo(photo,
          { opacity: 0, x: isReversed ? 100 : -100, scale: 0.92 },
          { opacity: 1, x: 0, scale: 1, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: row, start: 'top 75%' } }
        )
        gsap.fromTo(text?.querySelectorAll('.t-child') ?? [],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out', delay: 0.2, scrollTrigger: { trigger: row, start: 'top 75%' } }
        )
        gsap.fromTo(row.querySelector('.t-line'),
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: 'power2.out', delay: 0.4, scrollTrigger: { trigger: row, start: 'top 75%' } }
        )
      })

      gsap.fromTo(valuesTitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: valuesTitleRef.current, start: 'top 85%' } }
      )

      const valueCards = valuesGridRef.current?.querySelectorAll('.value-card')
      if (valueCards) {
        gsap.fromTo(valueCards,
          { opacity: 0, y: 40, scale: 0.93 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.65, ease: 'back.out(1.4)', scrollTrigger: { trigger: valuesGridRef.current, start: 'top 80%' } }
        )
      }
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="bg-[#060912] min-h-screen relative overflow-x-hidden">

      {/* Animated blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div ref={blob1Ref} className="absolute w-[600px] h-[600px] rounded-full blur-[110px] opacity-35"
          style={{ background: 'radial-gradient(circle, #3b82f6, #6366f1)', top: -150, left: -120 }} />
        <div ref={blob2Ref} className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-30"
          style={{ background: 'radial-gradient(circle, #8b5cf6, #ec4899)', top: 100, right: -100 }} />
        <div ref={blob3Ref} className="absolute w-[400px] h-[400px] rounded-full blur-[90px] opacity-25"
          style={{ background: 'radial-gradient(circle, #06b6d4, #3b82f6)', bottom: '30%', left: '30%' }} />
        <div ref={blob4Ref} className="absolute w-[350px] h-[350px] rounded-full blur-[80px] opacity-20"
          style={{ background: 'radial-gradient(circle, #6366f1, #8b5cf6)', bottom: 0, right: '10%' }} />
      </div>

      <main className="relative z-10 pt-0">
        <Navbar />

       
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">

          <div ref={badgeRef} className="inline-flex items-center gap-2.5 bg-white/[0.07] border border-white/[0.13] rounded-full px-[22px] py-2 mb-9 backdrop-blur-xl">
            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6] shrink-0 inline-block" />
            <span className="text-[11px] text-white/75 tracking-[3px] font-sans uppercase">
              Echipa InfoMath
            </span>
          </div>

          <h1
            ref={heroTitleRef}
            className="text-[clamp(42px,7vw,80px)] font-black text-white leading-[1.1] font-serif mb-7 max-w-[800px] opacity-0"
          >
            Oamenii din spatele{' '}
            <span className="bg-gradient-to-br from-blue-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
              InfoMath
            </span>
          </h1>

          <p
            ref={heroSubRef}
            className="text-[clamp(16px,2vw,20px)] text-white/50 leading-[1.85] font-sans max-w-[580px] opacity-0"
          >
            Ești gata să faci upgrade la cunoștințele tale? Oferim meditații la Matematică și Informatică axate strict pe înțelegerea reală a materiei, fără memorare mecanică.
          </p>

          <div className="mt-16 flex flex-col items-center gap-2 opacity-40">
            <span className="text-xs text-white font-sans tracking-[2px] uppercase">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
          </div>
        </section>

        {/* Teachers */}
        {teachers.map((teacher) => (
          <section
            key={teacher.name}
            className={`teacher-row${teacher.reverse ? ' reversed' : ''} min-h-screen flex items-center px-6 lg:px-[clamp(24px,8vw,120px)] py-20`}
          >
            <div
              className="w-full grid grid-cols-2 items-center gap-[clamp(40px,6vw,96px)]"
              style={{ direction: teacher.reverse ? 'rtl' : 'ltr' }}
            >
              {/* Photo */}
              <div className="t-photo opacity-0" style={{ direction: 'ltr' }}>
                <div className="relative w-full aspect-[4/5] rounded-[28px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.06)]">
                  <img src={teacher.image} alt={teacher.name} className="w-full h-full object-cover block" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/55" />
                  <div className="absolute bottom-6 left-6 flex items-center gap-2.5 bg-black/45 backdrop-blur-xl border border-white/[0.12] rounded-xl px-4 py-2.5">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: teacher.accentColor, boxShadow: `0 0 10px ${teacher.accentColor}` }}
                    />
                    <span className="text-[13px] font-semibold text-white font-sans">{teacher.subject}</span>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="t-text" style={{ direction: 'ltr' }}>
                <span
                  className="t-child inline-block text-[11px] font-bold font-sans tracking-[3px] uppercase mb-4"
                  style={{ color: teacher.accentColor }}
                >
                  {teacher.role}
                </span>

                <h2 className="t-child text-[clamp(32px,4vw,52px)] font-black text-white font-serif leading-[1.15] mb-3">
                  {teacher.name}
                </h2>

                <div
                  className="t-line h-[3px] w-[60px] rounded-sm mb-7 origin-left"
                  style={{ background: teacher.gradient }}
                />

                {teacher.paragraphs.map((p, i) => (
                  <p key={i} className="t-child text-[clamp(14px,1.5vw,17px)] text-white/60 leading-[1.85] font-sans mb-4">
                    {p}
                  </p>
                ))}

                <blockquote
                  className="t-child pl-5 mt-7"
                  style={{ borderLeft: `3px solid ${teacher.accentColor}` }}
                >
                  <p className="text-[clamp(14px,1.4vw,16px)] italic text-white/45 leading-[1.8] font-serif">
                    {teacher.quote}
                  </p>
                </blockquote>
              </div>
            </div>
          </section>
        ))}

        <Footer/>
      </main>
    </div>
  )
}

export default DespreNoi