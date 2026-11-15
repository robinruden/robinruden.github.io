import "../styles/Desktop.css"
import DesktopIcon from "./DesktopIcon"
import { programs } from "../data/programs"

export default function Desktop({ onIconClick }) {
  return (
    <div className="desktop" aria-label="Desktop">
      {Object.entries(programs).map(([id, program]) => (
        <DesktopIcon key={id} program={program} onOpen={() => onIconClick(id)} />
      ))}
    </div>
  )
}
