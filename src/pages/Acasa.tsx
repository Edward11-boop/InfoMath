import MainSection from '@/components/MainSection'
import Background from '../components/Background'
import Cursor from '../components/CustomCursor'
import Stars from '../components/StarsCanvas'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'


function Acasa() {
  return (
    <div className="flex flex-col h-full">
      <div className="fixed inset-0 -z-10">
        <Background />  
      </div>
      <Cursor/>
      <Stars/>
      <div className="flex-1 overflow-hidden">
        <MainSection/>
      </div>
      <Footer/>
    </div>
  )
}

export default Acasa