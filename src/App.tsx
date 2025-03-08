import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Debit from './pages/debit/page'
import Log from './pages/log/page'
import Jail from './pages/jail/page'
import RadixianProvider from './context'

function App() {
  return (
    <RadixianProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/debit" element={<Debit />} />
          <Route path="/log" element={<Log />} />
          <Route path="/jail" element={<Jail />} />
        </Routes>
      </BrowserRouter>
    </RadixianProvider>
  )
}

export default App
