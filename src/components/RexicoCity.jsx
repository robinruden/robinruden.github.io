"use client"

import "./RexicoCity.css"
import { useState } from "react"

function RexicoCity() {
  

  return (
    <div className="rexico-city">
       <div className="tech-description">
        <h2>Welcome to Rexico City. Feel free to explore our brand new dinosaur park. Your journey starts here!</h2>
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

export default RexicoCity
