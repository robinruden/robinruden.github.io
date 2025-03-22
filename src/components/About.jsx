import React, { useState, useEffect} from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './About.css'


const About = () => {
    const [displayedText, setDisplayedText] = useState('');
    const aboutText = `
      > NAME: Robin Ruden
      > OCCUPATION: Frontend Developer
      > LOCATION: Sweden
      
      > SKILLS:
      • HTML/CSS
      • JavaScript
      • React.js
      • UI/UX Design
      • Creative Interfaces
      
      > ABOUT:
      I'm a frontend developer with a passion for creating unique, interactive 
      user experiences. With a background in [YOUR BACKGROUND], I bring both 
      technical skills and creative vision to every project.
      
      My approach combines clean code with innovative design, focusing on 
      building interfaces that are both functional and engaging. When I'm not 
      coding, you can find me [YOUR HOBBIES/INTERESTS].
      
      > STATUS: Available for new opportunities
    `;
  
    useEffect(() => {
      let index = 0;
      const typeEffect = setInterval(() => {
        if (index < aboutText.length) {
          setDisplayedText(aboutText.substring(0, index + 1));
          index++;
        } else {
          clearInterval(typeEffect);
        }
      }, 20);
  
      return () => clearInterval(typeEffect);
    }, []);
  
    return (
      <div className="container">
        <div className="terminal about-terminal">
          <div className="terminal-header">
            <div className="terminal-title">about.exe</div>
            <div className="terminal-controls">
              <span className="control minimize">_</span>
              <span className="control maximize">□</span>
              <span className="control close">×</span>
            </div>
          </div>
          
          <div className="terminal-content">
            <pre className="about-text">{displayedText}</pre>
          </div>
          
          <div className="terminal-footer">
            <Link to="/" className="back-button">
              <button>← Back</button>
            </Link>
          </div>
        </div>
      </div>
    );
  };
  
  export default About;