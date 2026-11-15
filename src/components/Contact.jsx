"use client"

import "./Contact.css"



export default function Contact() {
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
        <p>📄 <a href="/Resume.pdf" download="Robin_Ruden_Resume.pdf">Download Resume</a></p>
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
