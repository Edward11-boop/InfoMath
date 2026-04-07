import { useEffect, useState } from 'react'
import MainSection from '@/components/MainSection'
import Background from '../components/Background'
import Cursor from '../components/CustomCursor'
import Stars from '../components/StarsCanvas'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

function Acasa() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div className="flex flex-col h-full">
      <div className="fixed inset-0 -z-10">
        <Background />
      </div>

    
      {!isMobile && <Cursor />}

      <Stars isMobile={isMobile} />

      <div className="flex-1 overflow-hidden">
        <MainSection />
      </div>
      <Footer />
    </div>
  )
}

export default Acasa