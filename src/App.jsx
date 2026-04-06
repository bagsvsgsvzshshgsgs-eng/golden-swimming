import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Store from './pages/Store/Store'
import Admin from './pages/Admin/Admin'
import HallOfFame from './pages/HallOfFame/HallOfFame'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content-area">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/gallery" element={<HallOfFame />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
