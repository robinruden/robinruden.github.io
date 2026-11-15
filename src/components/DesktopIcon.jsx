import { useEffect, useRef, useState } from "react"
import Draggable from "react-draggable"

export default function DesktopIcon({ program, onOpen, inFolder = false }) {
  const [compact, setCompact] = useState(() => window.matchMedia("(max-width: 600px), (max-height: 520px)").matches)
  useEffect(() => {
    const media = window.matchMedia("(max-width: 600px), (max-height: 520px)")
    const update = () => setCompact(media.matches)
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])
  const nodeRef = useRef(null)
  const wasDragged = useRef(false)

  return (
    <Draggable
      nodeRef={nodeRef}
      disabled={compact}
      bounds="parent"
      defaultPosition={inFolder ? undefined : program.desktopPosition}
      onStart={() => { wasDragged.current = false }}
      onDrag={() => { wasDragged.current = true }}
    >
      <button
        ref={nodeRef}
        type="button"
        className={inFolder ? "folder-icon" : "desktop-icon"}
        onClick={(event) => {
          if (event.detail === 0 || !wasDragged.current) onOpen()
          wasDragged.current = false
        }}
      >
        <img src={program.icon} alt="" className="icon-image" draggable={false} />
        <span className="icon-text">{program.title}</span>
      </button>
    </Draggable>
  )
}
