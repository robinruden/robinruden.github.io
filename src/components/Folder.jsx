"use client"

import "./Folder.css"
import { useState } from "react"

function Folder() {

  return (
    <div className="folder">
      <div className="tech-description">
        <h3>Technologies used in this project:</h3>
        <ul>
          <li><strong>React</strong> - JavaScript library for building user interfaces</li>
          <li><strong>CSS</strong> - Styling the components</li>
        </ul>
      </div>
      <a href="https://folder.netlify.app" target="_blank" rel="noopener noreferrer">
        <img src="/img/folder.png" alt="" />
      </a>

    </div>
  )
}

export default Folder


