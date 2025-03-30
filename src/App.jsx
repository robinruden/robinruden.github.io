import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
/* import LandingPage from './components/Landing' */
/* import About from './components/About' */
import { Terminal } from "./components/terminal"

const App = () => {
  
  return (
    <>

<main className="flex min-h-screen flex-col items-center justify-center bg-black p-4">
      <Terminal />
    </main>

 {/*    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/about" element={<About/>}/>
    
    
      </Routes>
    
    </Router> */}
    </>
  )
}

export default App
