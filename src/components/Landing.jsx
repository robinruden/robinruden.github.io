import React, { useState } from "react";
import { useNavigation } from 'react-router-dom'
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

  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="terminal">
        
          <pre className="ascii">
{`
__                                             
/  |                                            
__   __   __   ______  $$ |  _______   ______   _____  ____    ______  
/  | /  | /  | /      \ $$ | /       | /      \ /     \/    \  /      \ 
$$ | $$ | $$ |/$$$$$$  |$$ |/$$$$$$$/ /$$$$$$  |$$$$$$ $$$$  |/$$$$$$  |
$$ | $$ | $$ |$$    $$ |$$ |$$ |      $$ |  $$ |$$ | $$ | $$ |$$    $$ |
$$ \_$$ \_$$ |$$$$$$$$/ $$ |$$ \_____ $$ \__$$ |$$ | $$ | $$ |$$$$$$$$/ 
$$   $$   $$/ $$       |$$ |$$       |$$    $$/ $$ | $$ | $$ |$$       |
$$$$$/$$$$/   $$$$$$$/ $$/  $$$$$$$/  $$$$$$/  $$/  $$/  $$/  $$$$$$$/ 
                                                                                                          
                                                                                                                                        
`}      
        </pre>
      <p>🔥 Choose an option below:</p>
      <pre>{output}</pre>
    
    <div className="button-container">
      <button onClick={() => {
        handleCommand("about");
        navigate("/about");
      }}>📁 About Me</button>
      
      <button onClick={() => handleCommand("projects")}>💾 Projects</button>
      <button onClick={() => handleCommand("contact")}>📞 Contact</button>
      <button onClick={() => handleCommand("easteregg")}>🔍 Easter Egg</button>
    </div>
  </div>
</div>
  );
};



export default LandingPage;
