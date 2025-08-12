"use client"

import "./Folder.css"
import { useState } from "react"

function Folder() {

  return (
    <div className="folder">
      <div className="tech-description">
        <h3>This is my projects. Just click to open!</h3>
        <ul>
          
        </ul>
      </div>
      <a href="https://folder.netlify.app" target="_blank" rel="noopener noreferrer">
        <img src="/img/folder.png" alt="" />
      </a>

    </div>
  )
}

export default Folder


