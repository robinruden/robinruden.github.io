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
  const dragStart = useRef({ x: 0, y: 0 })
  const wasDragged = useRef(false)

  const trackDrag = (_event, { x, y }) => {
    // Allow a little finger movement without treating a tap as a drag.
    if (Math.hypot(x - dragStart.current.x, y - dragStart.current.y) > 6) {
      wasDragged.current = true
    }
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      disabled={compact}
      bounds="parent"
      defaultPosition={inFolder ? undefined : program.desktopPosition}
      onStart={(_event, { x, y }) => {
        dragStart.current = { x, y }
        wasDragged.current = false
      }}
      onDrag={trackDrag}
      onStop={(event, data) => {
        trackDrag(event, data)
        // react-draggable cancels touchstart, so touch taps never produce onClick.
        if (event.type === "touchend" && event.touches.length === 0 && !wasDragged.current) onOpen()
      }}
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
