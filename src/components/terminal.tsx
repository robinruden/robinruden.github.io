import React, { useState, useEffect, useRef, JSX, useCallback } from "react"
import { ChevronRight } from "lucide-react"
import './Terminal.css'
import { AboutPage } from './AboutPage'

/* let menuInitialized = false */


//Typewriter function. 
export function Typewriter({ 
  text, 
  speed = 40, 
  onComplete = () => {},
 }: {
  text: string;
  speed?: number;
  onComplete?: (finalText?: string) => void;
}) {

  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => {
      const updatedText = prev + text[currentIndex]
      currentIndex++;
      if (currentIndex === text.length) {
        clearInterval(intervalId);
        onComplete(updatedText)
      }
      return updatedText
    })
    }, speed);
    return () => clearInterval(intervalId);
  }, [text, speed, onComplete]);

  return <span>{displayedText}</span>;
}




export function Terminal() {
  
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<(string | JSX.Element)[]>([])
  const [bannerText, setBannerText] = useState("")

  const [cursorVisible, setCursorVisible] = useState(true)
  const [powerOn, setPowerOn] = useState(true)

  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const [activeSection, setActiveSection] = useState<string | null>(null);

  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);



  const AVAILABLE_COMMANDS_HEADER = 
  [" ", 
  "AVAILABLE COMMANDS:",
  " ",
  ];

  const AVAILABLE_COMMANDS_LIST = [ 
    
    "PORTFOLIO",
    "SKILLS",
    "ABOUT",
    "CONTACT",
    " ",
    /* "DATE", */
    "BACK",
  ]
  
  // Render a command element: header and blank lines are not clickable
  const renderAvailableCommand = (cmd: string, index: number) => {
      if (cmd === "AVAILABLE COMMANDS:" || cmd.trim() === "") {
        return <span key={index}>{cmd}</span>;
      }
      return (
        <span
          key={index}
          className="available-command"
          onClick={() => handleCommandClick(cmd.toLowerCase())}
        >
          {cmd}
        </span>
      );
    };

  const handleBannerComplete = useCallback((finalText?: string) => {
    if (finalText) {
      setBannerText(finalText);
      const delayBetweenCommands = 100; // delay in ms between each command
      const baseDelay = 1000; // delay after banner completion
  
      // First, print header commands
      AVAILABLE_COMMANDS_HEADER.forEach((cmd, index) => {
        setTimeout(() => {
          setHistory((prev) => [
            ...prev,
            renderAvailableCommand(cmd, index),
          ]);
        }, baseDelay + index * delayBetweenCommands);
      });
  
      // Then, print the list commands after the header commands
      const headerLength = AVAILABLE_COMMANDS_HEADER.length;
      AVAILABLE_COMMANDS_LIST.forEach((cmd, index) => {
        setTimeout(() => {
          setHistory((prev) => [
            ...prev,
            renderAvailableCommand(cmd, headerLength + index),
          ]);
        }, baseDelay + (headerLength + index) * delayBetweenCommands);
      });
    }
  }, []);

  // Process a command and return a text response.
  // The actual section content is rendered conditionally below.
  const processCommand = (command: string): (string | JSX.Element)[] => {
    let response: (string | JSX.Element)[] = [];
    const cmd = command.trim().toLowerCase();

    if (cmd === "help") {
      // If help is already displayed, send a message
      const helpAlreadyDisplayed = history.some(
        (line) => typeof line === "string" && line === "AVAILABLE COMMANDS:"
      );
      if (helpAlreadyDisplayed) {
        response = [
          "Commands are already displayed above. Type 'CLEAR' first to reset.",
        ];
      }
    } else if (cmd === "about") {
      response = [""];
    } else if (cmd === "date") {
      response = [new Date().toLocaleString()];
    } else if (cmd === "back") {
      window.location.reload()
      return [];
    } else if (cmd === "skills" || cmd === "2") {
      response = [""];
    } else if (cmd === "portfolio" || cmd === "1") {
      response = [""];
    } else if (cmd === "contact") {
      response = [""];
    } else if (cmd.startsWith("open ")) {
      const id = parseInt(cmd.split(" ")[1]);
      const project = projectsData.find((p) => p.id === id);
      if (project) {
        response = [
          `PROJECT: ${project.title}`,
          `STACK: ${project.stack}`,
          `DESCRIPTION: ${project.description}`,
          project.link,
        ];
      } else {
        response = ["PROJECT NOT FOUND."];
      }
    } else {
      response = [`COMMAND NOT FOUND: ${cmd.toUpperCase()}`];
    }
    return response;
  };


  // A helper function that appends the command and its response to the history.
  const handleCommand = (command: string) => {
    const lowerCmd = command.trim().toLowerCase();
  
   // Update active section for section commands.
    // Toggle: if already active, set to null; otherwise, set to new section.
    if (["about", "portfolio", "skills", "contact"].includes(lowerCmd)) {
      setActiveSection((prev) => (prev === lowerCmd ? null : lowerCmd));
    }
  
    const responses = processCommand(command);
    setHistory((prev) => [...prev, `> ${command}`, ...responses]);
  };

  // Handler for form submit (using the typed input)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;
    handleCommand(input.trim());
    setInput("");
  };

  // Handler for clicking on an available command
  const handleCommandClick = (cmd: string) => {
    handleCommand(cmd);
  };


  interface Project {
    id: number;
    title: string;
    stack: string;
    description: string;
    link: string;
    image: string;
  }

  const projectsData: Project[] = [
    {
      id: 1,
      title: "Amusement Park Website",
      stack: "Vue / JavaScript (2024)",
      description: "Amusement park website with booking system",
      link: "https://rexicocity.netlify.app/",
      image: "/img/rexico.png",
    },
    {
      id: 2,
      title: "Amiga styled Dashboard",
      stack: "React / JavaScript (2024)",
      description: "Amiga 500 dashboard with games and apps",
      link: "https://amigadashboard.netlify.app/",
      image: "/img/amiga.png",
    },
  ]

  function ProjectGrid({
    projectsData,
    selectedProjectId,
    onProjectClick,
  }: {
    projectsData: Project[];
    selectedProjectId: number | null;
    onProjectClick: (id: number) => void;
  }) {
    const selectedProject = projectsData.find(
      (project) => project.id === selectedProjectId
    );
    
    return (
      <div>
      <div className="projects-grid">
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="project-item"
            onClick={() => onProjectClick(project.id)} 
          >
            <img
              src={project.image}
              alt={project.title}
              className="project-image"
            />
            <div className="project-title">{project.title}</div>
          </div>
        ))}
      </div>
       {selectedProject && (
        <div className="project-details">
          <h3 className="project-details-title">{selectedProject.title}</h3>
          <p className="project-details-text">{selectedProject.description}</p>
          <p className="project-details-text">{selectedProject.stack}</p>
          <a
            className="project-link"
            href={selectedProject.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Project
          </a>
        </div>
      )}
    </div>
  );
}
    
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

 /*  useEffect(() => {
    const handleClick = () => {
      if (powerOn) {
        inputRef.current?.focus()
      }
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [powerOn]) */


  const togglePower = () => {
    setPowerOn(!powerOn)
    if (!powerOn) {
      setHistory(["ROBINS PORTFOLIO V7 (c) 2025", "READY..."])
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, activeSection]);

  return (
    <div className="terminal-wrapper relative">
      <div className="the-tv relative">
        <div className="tv-casing">
          <div className="absolute top-0 left-0 right-0 h-6 bg-neutral-900 rounded-t-lg flex items-center justify-center">
            <div className="text-neutral-500 text-xs font-mono tracking-widest"></div>
          </div>
     
          <div className="bg-neutral-900 rounded-md p-3 mb-3 shadow-inner">
            <div className={`tv-container ${powerOn ? "" : "bg-neutral-950"}`}>
              {powerOn ? (
                <div ref={terminalRef} className="tv-terminal-content">
                  <div className="banner">
                    {bannerText ? (
                      <span>{bannerText}</span>
                    ) : (
                      <Typewriter
                        text="WELCOME TO ROBINS PORTFOLIO © 2025. PLEASE TYPE IN A COMMAND BELOW OR JUST CLICK ON IT"
                        speed={23}
                        onComplete={handleBannerComplete}
                      />
                    )}
                  </div>
                  
                  {history.map((line, i) => (
                    <div key={i} className="whitespace-pre-wrap mb-1">
                      {typeof line === "string" ? (
                        line.startsWith("http") ? (
                          <a
                            href={line}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-green-400 hover:text-green-200"
                          >
                            {line}
                          </a>
                        ) : (
                          line
                        )
                      ) : (
                        line
                      )}
                    </div>
                  ))}

                  {/* Conditionally render the active section */}
                  {activeSection && (
                    <div className="section-content mt-4 p-3 border border-green-500 rounded">
                      {activeSection === "about" && <AboutPage />}
                      {activeSection === "portfolio" && (
                        <ProjectGrid
                        projectsData={projectsData}
                        selectedProjectId={selectedProjectId}
                        onProjectClick={setSelectedProjectId}
                        key="portfolio-section"
                      />
                      )}
                      {activeSection === "skills" && (
                        <div className="skills-section">
                          <p>TECHNICAL SKILLS:</p>
                          <p></p>
                          <p>███████░░░   HTML/CSS      87%</p>
                          <p>█████████░   JAVASCRIPT    90%</p>
                          <p>██████░░░░   TYPESCRIPT    78%</p>
                          <p>████████░░   REACT         92%</p>
                          <p>███████░░░   VUE           85%</p>
                          <p>█████████░   PostgreSQL    93%</p>
                          <p>█████████░   MySQL         91%</p>
                          <p>████████░░   MongoDB       89%</p>
                          
                        </div>
                      )}
                      {activeSection === "contact" && (
                        <div className="contact-section">
                          <p>CONTACT INFORMATION:</p>
                          <p>Name: Robin Rudén</p>
                          <p>
                            
                            Email:{" "} 
                            <a href="mailto:robinruden@gmail.com"
                            className="underline text-green-400 hover:text-green-200"
                            >
                              robinruden@gmail.com
                            </a>
                          </p>
                          <p>Phone: 0730502608</p>
                          <p>Fax:   3.14159265</p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1 text-green-500" />
                    <span>{input}</span>
                    <span
                      className={`w-2 h-4 bg-green-500 ml-0.5 ${
                        cursorVisible ? "opacity-100" : "opacity-0"
                      }`}
                    ></span>
                  </div>
                </div>
              ) : (
                <div className="tv-terminal-content">



                </div>
                
              )}

              <form onSubmit={handleSubmit} className={`px-3 py-2 border-t border-green-500/30 ${!powerOn && "hidden"}`}>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full bg-transparent text-green-500 font-mono focus:outline-none text-sm"
                  aria-label="Terminal input"
                  disabled={!powerOn}
                />
              </form>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-10 bg-neutral-700 rounded-b-lg flex items-center px-4 gap-4">
            <button
              onClick={togglePower}
              className={`w-6 h-6 rounded-full border-2 border-neutral-600 flex items-center justify-center ${powerOn ? "bg-green-500/70" : "bg-red-500/70"}`}
              aria-label="Power button"
            >
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </button>

            <div className={`w-3 h-3 rounded-full ${powerOn ? "bg-amber-500" : "bg-neutral-500"} shadow-glow-amber`}></div>
            <div className={`w-3 h-3 rounded-full ${powerOn && history.length > 2 ? "bg-red-500 animate-pulse" : "bg-neutral-500"}`}></div>

            <div className="ml-auto flex gap-3">
              <div className="w-5 h-5 rounded-full bg-neutral-800 border border-neutral-600"></div>
              <div className="w-5 h-5 rounded-full bg-neutral-800 border border-neutral-600"></div>
            </div>
          </div>

         
        </div>
      </div>
    </div>
  );
}