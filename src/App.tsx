import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Debit from './pages/debit/page'
import Log from './pages/log/page'
import Jail from './pages/jail/page'
import RadixianProvider from './context'
import Egg from './pages/egg'
import Mall from './pages/mall'
import Store from './pages/store'

function App() {
  return (
    <RadixianProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/debit" element={<Debit />} />
          <Route path="/log" element={<Log />} />
          <Route path="/jail" element={<Jail />} />
          <Route path="/egg" element={<Egg />} />
          <Route path="/mall" element={<Mall />} />
          <Route path="/store" element={<Store />} />
        </Routes>
      </BrowserRouter>
    </RadixianProvider>
  )
}

export default App
