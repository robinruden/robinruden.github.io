import React, { useState } from "react";
import './Landing.css'

const LandingPage = () => {
  const [output, setOutput] = useState("");
  // Removed unused state variable

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
        text = "📞 Email: robinruden@gmail.com🖥️ GitHub: https://github.com/robinruden";
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
          <button onClick={() => handleCommand("about")}>📁 About Me</button>
          <button onClick={() => handleCommand("projects")}>💾 Projects</button>
          <button onClick={() => handleCommand("contact")}>📞 Contact</button>
          <button onClick={() => handleCommand("easteregg")}>🔍 Easter Egg</button>
        </div>
        <pre>{output}</pre>
      </div>

      {/* Start Button - Uncomment if needed
      <button style={styles.startButton} onClick={() => setStartMenuOpen(!startMenuOpen)}>Start</button> */}

      {/* Start Menu - Uncomment if needed
      {startMenuOpen && (
        <div style={styles.startMenu}>
          <div style={styles.menuItem} onClick={() => handleCommand("about")}>📁 About Me</div>
          <div style={styles.menuItem} onClick={() => handleCommand("projects")}>💾 Projects</div>
          <div style={styles.menuItem} onClick={() => handleCommand("contact")}>📞 Contact</div>
          <div style={styles.menuItem} onClick={() => alert("System shutting down... 😂")}>🔻 Shut Down</div>
        </div>
      )} */}
    </div>
  );
};



export default LandingPage;
