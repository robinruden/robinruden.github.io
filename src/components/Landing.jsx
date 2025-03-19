import React, { useState } from "react";

const LandingPage = () => {
  const [output, setOutput] = useState("");
  const [startMenuOpen, setStartMenuOpen] = useState(false);

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
    <div style={styles.container}>
      <div style={styles.terminal}>
        <pre style={styles.ascii}>
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
        <div>
          <button style={styles.option} onClick={() => handleCommand("about")}>📁 About Me</button>
          <button style={styles.option} onClick={() => handleCommand("projects")}>💾 Projects</button>
          <button style={styles.option} onClick={() => handleCommand("contact")}>📞 Contact</button>
          <button style={styles.option} onClick={() => handleCommand("easteregg")}>🔍 Easter Egg</button>
        </div>
        <pre>{output}</pre>
      </div>

      {/* Start Button */}
      {/* <button style={styles.startButton} onClick={() => setStartMenuOpen(!startMenuOpen)}>Start</button> */}

      {/* Start Menu */}
      {/* {startMenuOpen && (
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

// CSS-in-JS styles
const styles = {
    container: {
        background: "black",
        color: "#00ff00",
        fontFamily: "'Press Start 2P', monospace",
        padding: "10px",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    
  },
  terminal: {
    border: "3px solid #00ff00",
    padding: "20px",
    maxWidth: "600px",
    margin: "auto",
    textAlign: "left",
    background: "rgba(0, 0, 0, 0.8)",
    boxShadow: "0 0 10px #00ff00",
    overflowX: "auto",
  },
  ascii: {
    fontSize: "8px", // Smaller for mobile
    color: "#00ff00",
    lineHeight: "1.2",
    textAlign: "center",
    display: "block", // To ensure it respects the container
    maxWidth: "100%",
    overflowX: "auto", // Horizontal scroll for the ASCII art
    whiteSpace: "pre",
    '@media (min-width: 768px)': {
      fontSize: "12px", // Larger on desktop
    }
  },
  option: {
    background: "#00ff00",
    color: "black",
    padding: "8px",
    margin: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    borderRadius: "4px",
    textTransform: "uppercase",
    transition: "0.3s",
    border: "none",
    fontSize: "12px",
    display: "inline-block",
    width: "calc(50% - 10px)", // Two buttons per row on mobile
    '@media (min-width: 500px)': {
      width: "auto", // Natural width on larger screens
      padding: "10px",
      margin: "10px",
    }
  },
  startButton: {
    position: "fixed",
    bottom: "10px",
    left: "10px",
    background: "#c0c0c0",
    border: "2px outset white",
    fontFamily: "Arial, sans-serif",
    fontSize: "14px",
    padding: "8px 15px",
    cursor: "pointer",
  },
  startMenu: {
    position: "fixed",
    bottom: "50px",
    left: "10px",
    width: "200px",
    background: "#c0c0c0",
    border: "3px outset white",
    padding: "5px",
    boxShadow: "5px 5px 10px rgba(0,0,0,0.3)",
  },
  menuItem: {
    background: "#e0e0e0",
    padding: "5px",
    margin: "2px",
    cursor: "pointer",
    fontFamily: "Arial, sans-serif",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
  },
};

export default LandingPage;
