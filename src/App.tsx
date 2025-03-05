import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Rent from './pages/rent/page'
import Log from './pages/log/page'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/log" element={<Log />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
