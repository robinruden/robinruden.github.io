"use client"

import "./RexicoCity.css"
import { useState } from "react"

function RecicoCity() {
  

  return (
    <div className="rexico-city">
       <div className="tech-description">
        <h3>Technologies used in this poject</h3>
        <ul>
          <li><strong>Vue</strong> - Component-based UI framework</li>
          <li><strong>Vite</strong> - Fast build tool and development server</li>
        </ul>
      </div>
      <a href="https://rexicocity.netlify.app" target="_blank" rel="noopener noreferrer">
      <img src="/img/rexico.png" alt="" />
      </a>

      
    </div>
  )
}

export default RecicoCity
