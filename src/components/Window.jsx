import { useState, useRef, useEffect } from "react"
import "../styles/Window.css"

const positionMap = {
  notepad:    { x: 100, y: 120 },
  contact:    { x: 250, y: 140 },
  RexicoCity: { x: 180, y: 200 },
  amiga:      { x: 200, y: 70 },
  resume:     { x: 100, y: 150 },
  projects:     { x: 100, y: 100 },
};


function Window({ 
  id, 
  title, 
  children, 
  defaultPosition,
  active, 
  zIndex, 
  width = 200,
  height = 200,
  onClose, 
  onMinimize, 
  onActivate 
}) {

    const fallbackCascade = {
    x: 35 + (parseInt(id, 10) % 3) * 10,  
    y: 100 + (parseInt(id, 10) % 10) * 10,
  };


  const initialPos = 
  defaultPosition ??
  positionMap[id] ?? 
  fallbackCascade
  
  const [dragging, setDragging] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [size, setSize] = useState({ width, height})
  const windowRef = useRef(null)
  const [position, setPosition] = useState(initialPos)

  const handleMouseDown = (e) => {
    if (e.target.classList.contains("title-bar")) {
      setDragging(true)
      setOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
      onActivate()
    }
  }

  const handleMouseMove = (e) => {
    if (dragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      })
    }
  }

  const handleMouseUp = () => {
    setDragging(false)
  }

  useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    } else {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [dragging])

  return (
    <div
      className={`window ${active ? "active" : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${width}px`,
        height: `${height}px`,
        zIndex,
      }}
      ref={windowRef}
      onMouseDown={onActivate}
    >
      <div className="title-bar" onMouseDown={handleMouseDown}>
        <div className="title-bar-text">{title}</div>
        <div className="title-bar-controls">
          {/* <button aria-label="Minimize" onClick={onMinimize}></button> */}
          {/* <button aria-label="Maximize"></button> */}
          <button aria-label="Close" onClick={onClose}></button>
        </div>
      </div>
      <div className="window-body">{children}</div>
    </div>
  )
}

export default Window
