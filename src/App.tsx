import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Acasa from './pages/Acasa'
import DespreNoi from './pages/DespreNoi'
import Programare from './pages/Programare'


function Layout() {
  const location = useLocation()
  const hideNavbar = location.pathname === '/despre-noi' || location.pathname === '/programare'

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div className={hideNavbar ? 'pt-0' : 'pt-[72px]'}>
        <Routes>
          <Route path="/" element={<Acasa />} />
          <Route path="/despre-noi" element={<DespreNoi />} />
          <Route path="/programare" element={<Programare />} />
        </Routes>
      </div>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

export default App