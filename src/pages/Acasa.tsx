import MainSection from '@/components/MainSection'
import Background from '../components/Background'
import Cursor from '../components/CustomCursor'
import Stars from '../components/StarsCanvas'
import Navbar from '@/components/Navbar'


function Acasa() {
  return (
    <div className = "min-h-screen ">
      <div className = "fixed inset-0 -z-10">
        <Background />  
      </div>
      <Cursor/>
      <Stars/>
      <MainSection/>

    </div>
  )
}

export default Acasa