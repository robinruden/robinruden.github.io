"use client"

import { useEffect } from "react"

import { useState } from "react"

import "../styles/Taskbar.css"
import StartMenu from "./StartMenu"

function Taskbar({
  openWindows,
  minimizedWindows,
  activeWindow,
  startMenuOpen,
  onWindowSelect,
  onMinimizedSelect,
  onStartClick,
}) {
  const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  const [time, setTime] = useState(currentTime)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="taskbar">
      {/* <div className="start-button-container">
        <button className="start-button" onClick={onStartClick}>
          <img src="/img/windows.ico" alt="Windows" className="win-logo" />
          <span>Start</span>
        </button>
        {startMenuOpen && <StartMenu onProgramClick={onStartClick} />}
      </div> */}

      <div className="taskbar-buttons">
        {openWindows.map((window) => (
          <button
            key={window.id}
            className={`taskbar-button ${activeWindow === window.id ? "active" : ""}`}
            onClick={() => onWindowSelect(window.id)}
          >
            {window.title}
          </button>
        ))}

        {minimizedWindows.map((window) => (
          <button key={window.id} className="taskbar-button" onClick={() => onMinimizedSelect(window.id)}>
            {window.title}
          </button>
        ))}
      </div>

      <div className="taskbar-tray">
        <div className="taskbar-time">{time}</div>
      </div>
    </div>
  )
}

export default Taskbar
