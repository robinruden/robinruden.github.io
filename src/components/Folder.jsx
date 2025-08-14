"use client"

import "./Folder.css"


import { useState } from "react"

const folderIcons = [
  { id: "RexicoCity", name: "Rexico City.exe", icon: "/img/rexico-logga.ico" },
  { id: "amiga", name: "Amiga.exe", icon: "/img/amiga.ico" },
  // Add more icons as needed
]


function Folder({ onIconClick }) {
  return (
    <div className="folder-content">
      {folderIcons.map(icon => (
        <div
          key={icon.id}
          className="folder-icon"
          onClick={() => onIconClick && onIconClick(icon.id)}
        >
          <img src={icon.icon} alt={icon.name} className="icon-image" />
          <div className="icon-text">{icon.name}</div>
        </div>
      ))}
    </div>
  )
}

export default Folder


