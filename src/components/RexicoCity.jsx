"use client"

import "./RexicoCity.css"
import { useState } from "react"

function RexicoCity() {
  

  return (
    <div className="rexico-city">
       {/* <div className="tech-description"> */}
        <h2>Welcome to Rexico City. Just click on the image to enter the site. Be aware of the dinosaurs!</h2>
        
          
        
      <div class="rexico-img">
      <a href="https://rexicocity.netlify.app" target="_blank" rel="noopener noreferrer">
      <img src="/img/rexico.png" alt="" />
      </a>
      </div>
      <div className="tech-description">
      <h4>Technoligies used:</h4>
      <li><strong>Vue</strong> - Component-based UI framework</li>
      <li><strong>Vite</strong> - Fast build tool and development server</li>
      </div>
    </div>
  )
}

export default RexicoCity
