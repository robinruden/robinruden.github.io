import React, { useState, useEffect, useRef, JSX, useCallback } from "react"
import { ChevronRight } from "lucide-react"
import './Terminal.css'

let menuInitialized = false


export function Typewriter({ text, speed = 50, onComplete = () => {} }: {
  text: string;
  speed?: number;
  onComplete?: (finalText?: string) => void;
}) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text[currentIndex]);
      currentIndex++;
      if (currentIndex === text.length) {
        clearInterval(intervalId);
        if (onComplete) onComplete(text);
      }
    }, speed);
    return () => clearInterval(intervalId);
  }, [text, speed, onComplete]);

  return <span>{displayedText}</span>;
}




export function Terminal() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<(string | JSX.Element)[]>([])
  const [bannerText, setBannerText] = useState("")

  const hasInitializedMenu = useRef(false)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [powerOn, setPowerOn] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)



  const handleBannerComplete = useCallback((finalText?: string) => {
    if (finalText) {
      setBannerText(finalText);
    }
  }, []);


  const projectsData = [
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

  function ProjectGrid( { projectsData }) {

    const [ selectedProjectId, setSelectedProjectId ] = useState(null)

    const handleProjectClick = (projectId) => {
      setSelectedProjectId((prev => ( prev === projectId ? null : projectId)))
    }
    const selectedProject = projectsData.find(
      (project) => project.id === selectedProjectId
    )
    
    return (
      <div>
      <div className="grid grid-cols-2 gap-3 mt-2">
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="cursor-pointer hover:opacity-90 transition"
            onClick={() => handleProjectClick(project.id)} 
          >
            <img
              src={project.image}
              alt={project.title}
              className="project-image"
            />
            <div className="text-xs mt-1 text-green-400">{project.title}</div>
          </div>
        ))}
      </div>
       {selectedProject && (
        <div className="mt-4 p-4 border border-green-500 rounded">
          <h3 className="text-green-400 font-bold">{selectedProject.title}</h3>
          <p className="text-green-500">{selectedProject.description}</p>
          <p className="text-green-500">{selectedProject.stack}</p>
          <a
            className="underline text-green-400 hover:text-green-200"
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
    
  

  const AVAILABLE_COMMANDS = [
    "AVAILABLE COMMANDS:",
    "",
    "HELP",
    "PROJECTS - PORTFOLIO",
    "SKILLS   - TECHNICAL SKILLS",
    "ABOUT    - PERSONAL INFO",
    "CONTACT  - CONTACT DETAILS",
    "DATE     - CURRENT DATE",
    "CLEAR    - CLEAR SCREEN",
  ]

  useEffect(() => {
    if (!menuInitialized) {
      setTimeout(() => {
        setHistory((prev) => [...prev, ...AVAILABLE_COMMANDS])
        hasInitializedMenu.current = true
      }, 700)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleClick = () => {
      if (powerOn) {
        inputRef.current?.focus()
      }
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [powerOn])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() === "") return

    const command = input.trim().toLowerCase()
    let response: (string | JSX.Element)[] = []

    if (command === "help") {
      const helpAlreadyDisplayed = history.some(line => line === "AVAILABLE COMMANDS:")
      if (helpAlreadyDisplayed) {
        response = ["Commands are already displayed above. Type 'CLEAR' first to reset."]
      }
    } else if (command === "date") {
      response = [new Date().toLocaleString()]
    } else if (command === "clear") {
      setHistory([])
      setInput("")
      return
    } else if (command === "skills" || command === "2") {
      response = [
        "TECHNICAL SKILLS:",
        "",
        "LANGUAGES:",
        "█████████▒▒ JAVASCRIPT    90%",
        "████████▒▒▒ TYPESCRIPT    80%",
        "█████████▒▒ REACT         92%",
        "█████████▒▒ HTML/CSS      90%",
      ]
    } else if (command === "projects" || command === "1") {
      response = ["PROJECT LISTING:", <ProjectGrid projectsData={projectsData} />]
    } else if (command.startsWith("open ")) {
      const id = parseInt(command.split(" ")[1])
      const project = projectsData.find(p => p.id === id)
      if (project) {
        response = [
          `PROJECT: ${project.title}`,
          `STACK: ${project.stack}`,
          `DESCRIPTION: ${project.description}`,
          project.link,
        ]
      } else {
        response = ["PROJECT NOT FOUND."]
      }
    } else {
      response = [`COMMAND NOT FOUND: ${command.toUpperCase()}`]
    }

    setHistory([...history, `> ${input}`, ...response])
    setInput("")
  }

  const togglePower = () => {
    setPowerOn(!powerOn)
    if (!powerOn) {
      setHistory(["ROBINS PORTFOLIO V7 (c) 2025", "READY..."])
    }
  }

  return (
    <div className="terminal-wrapper relative">
      
    <div className="the-tv relative">
      <div className="bg-neutral-800 rounded-lg p-5 pb-12 shadow-xl border-t border-neutral-700">
        <div className="absolute top-0 left-0 right-0 h-6 bg-neutral-900 rounded-t-lg flex items-center justify-center">
          <div className="text-neutral-500 text-xs font-mono tracking-widest"></div>
        </div>

        <div className="bg-neutral-900 rounded-md p-3 mb-3 shadow-inner">
          <div className={`tv-container ${powerOn ? "" : "bg-neutral-950"}`}>
            {powerOn ? (
              

              
              <div ref={terminalRef} className="tv-terminal-content">
                
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

                <div className="banner">
                  {bannerText ? (
                    <span>{bannerText}</span>
                    ) : (
                    <Typewriter
                    text="WELCOME TO ROBINS PORTFOLIO (c) 2025. PLEASE TYPE IN A COMMAND BELOW OR JUST CLICK ON IT"
                    speed={50}
                    onComplete={handleBannerComplete}
                 />
                   )}
                </div>
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
              <div className="tv-terminal-content"></div>
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

        <div className="absolute top-8 right-3 flex flex-col gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-6 h-0.5 bg-neutral-700 rounded-full"></div>
          ))}
        </div>
      </div>
    </div>
    </div>
  )
}
