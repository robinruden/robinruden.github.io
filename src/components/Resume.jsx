"use client"

import "./Resume.css"
import { useState } from "react"

function Resume() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf'; 
    link.download = 'Robin_Ruden_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="resume">
      <div onClick={handleDownload} style={{ cursor: 'pointer' }}>
        <img src="/img/resume-img.png" alt="Download Resume" />
      </div>
    </div>
  )
}

export default Resume
