import "../styles/Desktop.css"
import Draggable from 'react-draggable'
import { useRef, useEffect, useState, use } from 'react'

function Desktop({ onIconClick }) {
  const [hasOpenedNotepad, setHasOpenedNotepad] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0)
  }, [])

  const desktopIcons = [
    /* { id: "mycomputer", name: "My Computer", icon: "/img/computer_explorer.ico" }, */
    { id: "notepad", name: "About me", icon: "/img/notepad.ico", defaultPosition: {x: 300, y: 400} },
    /* { id: "recycle", name: "Recycle Bin", icon: "/img/recycle_bin_empty.ico" }, */
   /*  { id: "portfolio", name: "Portfolio", icon :"/img/briefcase-4.png"}, */
   /*  { id: "SpinningCD", name: "Spinning CD.exe", icon :"/img/cd_drive.ico", defaultPosition: {x: 10, y: 60}}, */
     { id: "RexicoCity", name: "Rexico City.exe", icon :"/img/rexico-logga.ico", defaultPosition: {x: 10, y: 40}},
     { id: "contact", name: "Contact.exe", icon :"/img/contact-1.ico", defaultPosition: {x: 10, y: 400}},
     { id: "amiga", name: "Amiga.exe", icon :"/img/amiga.ico", defaultPosition: {x: 10, y: 200}},
  ]

  useEffect(() => {
    if (!hasOpenedNotepad) {
       onIconClick("notepad")
       setHasOpenedNotepad(true)
    }
  }, [hasOpenedNotepad, onIconClick])   
       
  return (
 <div className="desktop">
       {desktopIcons.map((icon, i) => {
        const nodeRef = useRef(null)
        return (
         <Draggable
           key={icon.id}
           nodeRef={nodeRef}
           bounds="parent"
           defaultPosition={icon.defaultPosition}
           handle=".icon-image"
           disabled={isTouch}
         >
          <div
            ref={nodeRef}
            className={`desktop-icon 
              ${icon.id === "notepad" ? "notepad-icon" : ""}
              ${icon.id === "RexicoCity" ? "rexico-icon" : ""}
              ${icon.id === "contact" ? "contact-icon" : ""}
              ${icon.id === "amiga" ? "amiga-icon" : ""}
              `}
            onClick={() => onIconClick(icon.id)}
            onTouchEnd={() => onIconClick(icon.id)}
          >
            <img
              src={icon.icon}
              alt={icon.name}
              className="icon-image"
              style={{ cursor: 'pointer' }}
              onClick={() => onIconClick(icon.id)}
              onTouchEnd={() => onIconClick(icon.id)}
            />
            <div 
              className="icon-text"
              style={{ cursor: 'pointer' }}
              onClick={() => onIconClick(icon.id)}
              onTouchEnd={() => onIconClick(icon.id)}
            >
              {icon.name}
            </div>
           </div>
         </Draggable>
        )
      })}
     </div>
  )
}

export default Desktop
