import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


import LandingPage from './components/Landing'
import About from './components/About'

function App() {
  
  return (
    <>
    <Router>
      <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/about" element={<About/>}/>
    
    
    </Routes>
    
    </Router>
    </>
  )
}

export default App
