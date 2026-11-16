import { useState, useRef, useEffect } from "react"
import "../styles/Window.css"

function viewport() {
  return { width: document.documentElement.clientWidth, height: window.innerHeight - 28 }
}

function constrain(position, size, area) {
  return {
    x: Math.max(0, Math.min(position.x, area.width - size.width)),
    y: Math.max(0, Math.min(position.y, area.height - size.height)),
  }
}

export default function Window({ className = "", title, children, defaultPosition, active, zIndex, width = 200, height = 200, onClose, onActivate }) {
  const [area, setArea] = useState(viewport)
  const [position, setPosition] = useState(defaultPosition ?? { x: 35, y: 100 })
  const drag = useRef(null)
  const size = { width: Math.min(width, area.width), height: Math.min(height, area.height) }
  const visiblePosition = constrain(position, size, area)

  useEffect(() => {
    const resize = () => setArea(viewport())
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [])

  const finishDrag = () => { drag.current = null }

  return (
    <section
      className={`window ${active ? "active" : ""} ${className}`}
      aria-label={title}
      style={{ left: visiblePosition.x, top: visiblePosition.y, ...size, zIndex }}
      onPointerDown={onActivate}
      onFocusCapture={onActivate}
    >
      <div
        className="title-bar"
        tabIndex={0}
        aria-label={`${title}: drag to move, or use arrow keys`}
        onKeyDown={(event) => {
          const directions = { ArrowLeft: [-10, 0], ArrowRight: [10, 0], ArrowUp: [0, -10], ArrowDown: [0, 10] }
          const direction = directions[event.key]
          if (!direction) return
          event.preventDefault()
          setPosition(constrain({ x: visiblePosition.x + direction[0], y: visiblePosition.y + direction[1] }, size, area))
        }}
        onPointerDown={(event) => {
          if (event.target.closest("button") || event.button !== 0) return
          event.currentTarget.setPointerCapture(event.pointerId)
          drag.current = { x: event.clientX - visiblePosition.x, y: event.clientY - visiblePosition.y }
        }}
        onPointerMove={(event) => {
          if (!drag.current) return
          setPosition(constrain({ x: event.clientX - drag.current.x, y: event.clientY - drag.current.y }, size, area))
        }}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onLostPointerCapture={finishDrag}
      >
        <div className="title-bar-text">{title}</div>
        <div className="title-bar-controls">
          <button type="button" aria-label={`Close ${title}`} onClick={onClose}></button>
        </div>
      </div>
      <div className="window-body">{children}</div>
    </section>
  )
}
