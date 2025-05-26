"use client"

import "../styles/Notepad.css"
import { useState } from "react"

function Notepad() {
  const [text, setText] = useState("")

  return (
    <div className="notepad">
     {/*  <div className="notepad-menu">
        <div className="menu-item">File</div>
        <div className="menu-item">Edit</div>
        <div className="menu-item">Search</div>
        <div className="menu-item">Help</div>
      </div> */}
      <textarea
        className="notepad-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Welcome to my portfolio

Just click on the icons to the left to open them and explore my projects

Contact me at: 
Contact.exe
        
        "
      />
    </div>
  )
}

export default Notepad
