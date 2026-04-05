import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Acasa from './pages/Acasa'
import DespreNoi from './pages/DespreNoi'
import Programare from './pages/Programare'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Acasa />} />
        <Route path="/despre-noi" element={<DespreNoi />} />
        <Route path="/programare" element={<Programare />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App