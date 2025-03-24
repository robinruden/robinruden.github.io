import React, { useState } from "react";
import { Link } from 'react-router-dom'
import './Landing.css'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const [output, setOutput] = useState("");
  

  const handleCommand = (command) => {
    let text = "";
    switch (command) {
      case "about":
        text = "I'm a frontend developer who loves creative UIs!";
        break;
      case "projects":
        text = "💾 My projects:\n1. Cool Website\n2. Interactive App";
        break;
      case "contact":
        text = " E-mail: robinruden@gmail.com🖥️ GitHub: https://github.com/robinruden";
        break;
      case "easteregg":
        text = "🐱 You found the secret! The cake is a lie.";
        break;
      default:
        text = "Command not found.";
    }

    // Simulated typing effect
    let i = 0;
    setOutput("");
    const typeEffect = () => {
      if (i < text.length) {
        setOutput((prev) => prev + text.charAt(i));
        i++;
        setTimeout(typeEffect, 30);
      }
    };
    typeEffect();
  };

  return (
    <div className="container">
      <div className="terminal">
        <div className="content">
          <pre className="ascii">
{`
░▒▓███████▓▒░   ░▒▓██████▓▒░  ░▒▓███████▓▒░  ░▒▓█▓▒░ ░▒▓███████▓▒░  
░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓███████▓▒░  ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓███████▓▒░  ░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░  ░▒▓██████▓▒░  ░▒▓███████▓▒░  ░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░ 
                                                                                                                                        
`}
        </pre>
        <p>🔹 Welcome to my portfolio!</p>
        <p>🔹 Choose an option below:</p>
        <div className="button-container">
          <Link to='/about'><button onClick={() => handleCommand("about")}>📁 About Me</button>
          </Link>
          <button onClick={() => handleCommand("projects")}>💾 Projects</button>
          <button onClick={() => handleCommand("contact")}>📞 Contact</button>
          <button onClick={() => handleCommand("easteregg")}>🔍 Easter Egg</button>
        </div>
        <pre>{output}</pre>
        </div>
      </div>
    </div>
  );
};



export default LandingPage;
