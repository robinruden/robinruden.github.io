"use client"

import "./Contact.css"
import { useState } from "react"



export default function Contact() {
  /* const [open, setOpen] = useState(false); */
  /* const [pos, setPos] = useState({ x: 50, y: 50 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 }); */

/*   const onMouseDown = e => {
    if (e.target.closest(".title-bar")) {
      setDragging(true);
      setOffset({ x: e.clientX - pos.x, y: e.clientY - pos.y });
    }
  }; */

 /*  const onMouseMove = e => {
    if (dragging) {
      setPos({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  };

  const onMouseUp = () => setDragging(false); */

   const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Resume.pdf'; 
    link.download = 'Robin_Ruden_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
   }

  return (
    <div className="contact">
      <div className="contact-header">
        <div className="contact-photo"> 
          <img src="/img/robin.png" alt="Robin Rudén" />
        </div>   
        
        <div className="contact-title-bar">
          <h2>Robin Rudén</h2>
          <p>Web Developer</p>
        </div>
      </div>

      <div className="contact-content">  
        <p>✉️ <a href="mailto:robinruden@gmail.com">robinruden@gmail.com</a></p> 
        <p>📞 <a href="tel:0730502608">0730502608</a></p>
        <p>🌐 <a href="https://github.com/robinruden">github.com/robinruden</a></p>
        <p>🔗 <a href="https://www.linkedin.com/in/robin-rudén-60959762" target="_blank" rel="noopener noreferrer">www.linkedin.com/in/robin-rudén-60959762</a></p>
        <p>📄 <a href="#" onClick={handleDownload}>Download Resume</a></p>
      </div>

      <div className="contact-send-message">
        <button 
          className="contact-send-btn"
          onClick={() => window.location.href = "mailto:robinruden@gmail.com"}  
        >
          Send Message
        </button>
      </div>
    </div>
  );
}
