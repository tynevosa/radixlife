import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Debit from './pages/debit/page'
import Log from './pages/log/page'
import Jail from './pages/jail/page'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/debit" element={<Debit />} />
        <Route path="/log" element={<Log />} />
        <Route path="/jail" element={<Jail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
