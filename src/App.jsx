"use client"

import { useState } from "react"
import "./App.css"
import Window from "./components/Window"
import Taskbar from "./components/Taskbar"
import Desktop from "./components/Desktop"
import Notepad from "./components/Notepad"
import SpinningCD from "./components/SpinningCD"
import RexicoCity from "./components/RexicoCity"
import Contact from "./components/Contact"
import Amiga from "./components/Amiga"
import Resume from "./components/Resume"
import Projects from "./components/Folder"

const SIZE_MAP = {
  notepad: { width: 200, height: 200},
  SpinningCD: {width: 150, height: 450},
  RexicoCity: {width: 300, height: 300},
  contact: {width: 300, height: 350},
  amiga: {width: 250, height: 200},
  resume: {width: 250, height: 360},
  Projects: {width: 300, height: 300}
}

function App() {
  const [openWindows, setOpenWindows] = useState([])
  const [activeWindow, setActiveWindow] = useState(null)
  const [minimizedWindows, setMinimizedWindows] = useState([])
  const [startMenuOpen, setStartMenuOpen] = useState(false)

  const openWindow = (windowType) => {

    if (windowType === "RexicoCity") {
    window.open(
      "https://rexicocity.netlify.app",
      "_blank",
      "noopener,noreferrer"
    );
    setStartMenuOpen(false);
    return;
  }

    const id = Date.now()
    const size = SIZE_MAP[windowType] || {}
    const newWindow = { 
      id, 
      type: windowType, 
      title: getWindowTitle(windowType), 
      zIndex: openWindows.length,
      width: size.width,
      height: size.height,
    }
    setOpenWindows([...openWindows, newWindow])
    setActiveWindow(id)
    setStartMenuOpen(false)
  }

  const getWindowTitle = (type) => {
    switch (type) {
      case "Projects":
        return "Projects"
      case "notepad":
        return "About me"
      case "mycomputer":
        return "My Computer"
      case "SpinningCD":
        return "Spinning CD"
      case "RexicoCity":
        return "Rexico City"
      case "contact":
        return "Contact"
      case "amiga":
        return "Amiga"
      case "resume":
        return "Resume"
      default:
        return "Window"
    }
  }

  const closeWindow = (id) => {
    setOpenWindows(openWindows.filter((window) => window.id !== id))
    if (activeWindow === id) {
      setActiveWindow(null)
    }
  }

  const minimizeWindow = (id) => {
    const windowToMinimize = openWindows.find((window) => window.id === id)
    setMinimizedWindows([...minimizedWindows, windowToMinimize])
    setOpenWindows(openWindows.filter((window) => window.id !== id))
    if (activeWindow === id) {
      setActiveWindow(null)
    }
  }

  const restoreWindow = (id) => {
    const windowToRestore = minimizedWindows.find((window) => window.id === id)
    setOpenWindows([...openWindows, windowToRestore])
    setMinimizedWindows(minimizedWindows.filter((window) => window.id !== id))
    setActiveWindow(id)
  }

  const activateWindow = (id) => {
    setActiveWindow(id)
    // Bring window to front by updating z-index
    setOpenWindows(
      openWindows.map((window) => {
        if (window.id === id) {
          return { ...window, zIndex: openWindows.length }
        }
        return window
      }),
    )
  }

  const toggleStartMenu = () => {
    setStartMenuOpen(!startMenuOpen)
  }

  return (
    <div className="win95-app">
      <Desktop onIconClick={openWindow} />

      {openWindows.map((window) => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          active={activeWindow === window.id}
          zIndex={window.zIndex}
          width={window.width}
          height={window.height}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onActivate={() => activateWindow(window.id)}
        >
          {window.type === "notepad" && <Notepad />}
          {window.type === "mycomputer" && <MyComputer />}
          {window.type === "SpinningCD" && <SpinningCD />}
          {window.type === "RexicoCity" && <RexicoCity />}
          {window.type === "contact" && <Contact />}
          {window.type === "amiga" && <Amiga />}
          {window.type === "resume" && <Resume />}
          {window.type === "Projects" && <Projects onIconClick={openWindow} />}
        </Window>
      ))}

      <Taskbar
        openWindows={openWindows}
        minimizedWindows={minimizedWindows}
        activeWindow={activeWindow}
        startMenuOpen={startMenuOpen}
        onWindowSelect={activateWindow}
        onMinimizedSelect={restoreWindow}
        onStartClick={toggleStartMenu}
      />
    </div>
  )
}


export default App
