import "./Folder.css"
import Draggable from 'react-draggable'

import { useState, useRef } from "react"

const folderIcons = [
  { id: "RexicoCity", name: "Rexico City.exe", icon: "/img/rexico-logga.ico" },
  { id: "amiga", name: "Amiga.exe", icon: "/img/amiga.ico" },
  
]


function Projects({ onIconClick }) {
  return (
    
     <div className="folder-content">
      
      {folderIcons.map(icon => {
        const nodeRef = useRef(null)
        return (
          <Draggable
          
            key={icon.id}
            nodeRef={nodeRef}
            bounds="parent"
            defaultPosition={icon.defaultPosition}
            handle=".icon-image"
          >
            

            <div
            
              ref={nodeRef}
              className="folder-icon"
              onClick={() => onIconClick && onIconClick(icon.id)}
            >
              <img src={icon.icon} alt={icon.name} className="icon-image" />
              <div className="icon-text">{icon.name}</div>
            </div>
          </Draggable>
        )
      })}
      
    </div>
  )
}

export default Projects


