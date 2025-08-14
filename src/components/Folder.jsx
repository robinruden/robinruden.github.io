"use client"

import "./Folder.css"


import { useState } from "react"

const folderIcons = [
  { id: "project1", name: "Rexico City", icon: "/img/rexico-logga.ico" },
  { id: "project2", name: "Amiga Dashboard", icon: "/img/amiga.ico" },
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


