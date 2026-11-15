import { useEffect, useState } from "react"
import { programs } from "../data/programs"
import "../styles/Taskbar.css"

const currentTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

export default function Taskbar({ windows, activeWindow, onWindowSelect }) {
  const [time, setTime] = useState(currentTime)
  useEffect(() => {
    const timer = setInterval(() => setTime(currentTime()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="taskbar">
      <div className="taskbar-buttons">
        {[...windows].sort((a, b) => a.type.localeCompare(b.type)).map((item) => (
          <button key={item.id} type="button" className={`taskbar-button ${activeWindow === item.id ? "active" : ""}`} aria-pressed={activeWindow === item.id} onClick={() => onWindowSelect(item.id)}>
            {programs[item.type].title.replace(/\.exe$/, "")}
          </button>
        ))}
      </div>
      <div className="taskbar-tray"><div className="taskbar-time">{time}</div></div>
    </div>
  )
}
