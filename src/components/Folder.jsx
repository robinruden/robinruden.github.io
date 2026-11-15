import "./Folder.css"
import DesktopIcon from "./DesktopIcon"
import { programs } from "../data/programs"

export default function Projects({ onIconClick }) {
  return (
    <div className="folder-content">
      {["RexicoCity", "amiga"].map((id) => (
        <DesktopIcon key={id} program={programs[id]} inFolder onOpen={() => onIconClick(id)} />
      ))}
    </div>
  )
}
