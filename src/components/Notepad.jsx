"use client"

import "../styles/Notepad.css"
import { useState } from "react"

function Notepad() {
  const [text, setText] = useState("")

  return (
    <div className="notepad">
      <textarea
        className="notepad-textarea"
        aria-label="About me notes"
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
