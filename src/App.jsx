import { useState } from "react"
import "./App.css"
import Window from "./components/Window"
import Taskbar from "./components/Taskbar"
import Desktop from "./components/Desktop"
import Notepad from "./components/Notepad"
import Contact from "./components/Contact"
import Resume from "./components/Resume"
import Projects from "./components/Folder"
import { programs } from "./data/programs"

export default function App() {
  // Array order is also the stacking order: the last window is in front.
  const [windows, setWindows] = useState([])
  const activeWindow = windows.at(-1)?.id

  const openWindow = (type) => {
    const program = programs[type]
    if (!program) return
    if (program.url) {
      window.open(program.url, "_blank", "noopener,noreferrer")
      return
    }
    setWindows((current) => {
      const existing = current.find((item) => item.type === type)
      if (existing) return [...current.filter((item) => item.id !== existing.id), existing]
      return [...current, { id: crypto.randomUUID(), type }]
    })
  }

  const activateWindow = (id) => {
    setWindows((current) => {
      const selected = current.find((item) => item.id === id)
      return selected ? [...current.filter((item) => item.id !== id), selected] : current
    })
  }

  return (
    <div className="win95-app">
      <Desktop onIconClick={openWindow} />
      {windows.map((item, index) => {
        const program = programs[item.type]
        return (
          <Window
            className={item.type === "Projects" ? "window--projects" : item.type === "notepad" ? "window--about" : item.type === "contact" ? "window--contact" : ""}
            key={item.id}
            title={program.title.replace(/\.exe$/, "")}
            active={activeWindow === item.id}
            zIndex={index + 1}
            width={program.width}
            height={program.height}
            defaultPosition={program.position}
            defaultMobilePosition={program.mobilePosition}
            onClose={() => setWindows((current) => current.filter((entry) => entry.id !== item.id))}
            onActivate={() => activateWindow(item.id)}
          >
            {item.type === "notepad" && <Notepad />}
            {item.type === "contact" && <Contact />}
            {item.type === "resume" && <Resume />}
            {item.type === "Projects" && <Projects />}
          </Window>
        )
      })}
      <Taskbar windows={windows} activeWindow={activeWindow} onWindowSelect={activateWindow} />
    </div>
  )
}
