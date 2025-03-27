import React, { useState, useEffect, useRef } from "react"
import { ChevronRight } from "lucide-react"

export function Terminal() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>(["ROBINS PORTFOLIO V7 (c) 2025", "READY..."])
  const [cursorVisible, setCursorVisible] = useState(true)
  const [powerOn, setPowerOn] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  // Auto-focus input on mobile
  useEffect(() => {
    const handleClick = () => {
      if (powerOn) {
        inputRef.current?.focus()
      }
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [powerOn])

  // Scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() === "") return

    const command = input.trim().toLowerCase()
    let response: string[] = []

    // Simple command processing
    if (command === "help") {
      response = [
        "AVAILABLE COMMANDS:",
        "HELP - DISPLAY THIS HELP",
        "DATE - SHOW CURRENT DATE",
        "CLEAR - CLEAR SCREEN",
        "ECHO [TEXT] - DISPLAY TEXT",
        "DIR - LIST FILES",
        "VERSION - SHOW SYSTEM VERSION",
      ]
    } else if (command === "date") {
      response = [new Date().toLocaleString()]
    } else if (command === "clear") {
      setHistory([])
      setInput("")
      return
    } else if (command.startsWith("echo ")) {
      response = [command.substring(5)]
    } else if (command === "dir") {
      response = [
        "DIRECTORY LISTING:",
        "SYSTEM.DAT    4096 BYTES",
        "README.TXT     512 BYTES",
        "BASIC.EXE     8192 BYTES",
        "GAMES/         <DIR>",
      ]
    } else if (command === "version") {
      response = ["UNIX SYSTEM V RELEASE 7 - BELL LABORATORIES"]
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
    <div className="w-full max-w-md relative">
      {/* CRT Monitor Casing */}
      <div className="bg-neutral-800 rounded-lg p-5 pb-12 shadow-xl border-t border-neutral-700">
        {/* Monitor top panel with brand name */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-neutral-900 rounded-t-lg flex items-center justify-center">
          <div className="text-neutral-500 text-xs font-mono tracking-widest"></div>
        </div>

        {/* Screen bezel */}
        <div className="bg-neutral-900 rounded-md p-3 mb-3 shadow-inner">
          {/* Screen with power state */}
          <div
            className={`relative rounded overflow-hidden border-2 border-black ${powerOn ? "bg-black" : "bg-neutral-950"}`}
          >
            {/* Scan lines overlay */}
            {powerOn && <div className="absolute inset-0 pointer-events-none bg-scan-lines opacity-10"></div>}

            {/* Screen curvature effect */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/20 via-transparent to-black/20 rounded-lg"></div>

            {/* Terminal screen glow */}
            {powerOn && <div className="absolute inset-0 pointer-events-none bg-green-500/5 animate-pulse"></div>}

            {/* Terminal output */}
            {powerOn ? (
              <div
                ref={terminalRef}
                className="h-[60vh] p-3 overflow-y-auto font-mono text-green-500 text-sm leading-tight"
                style={{ textShadow: "0 0 5px rgba(0, 255, 0, 0.5)" }}
              >
                {history.map((line, i) => (
                  <div key={i} className="whitespace-pre-wrap mb-1">
                    {line}
                  </div>
                ))}
                <div className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1 text-green-500" />
                  <span>{input}</span>
                  <span className={`w-2 h-4 bg-green-500 ml-0.5 ${cursorVisible ? "opacity-100" : "opacity-0"}`}></span>
                </div>
              </div>
            ) : (
              <div className="h-[60vh]"></div>
            )}

            {/* Hidden input for mobile keyboard */}
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

        {/* Control panel */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-neutral-700 rounded-b-lg flex items-center px-4 gap-4">
          {/* Power button */}
          <button
            onClick={togglePower}
            className={`w-6 h-6 rounded-full border-2 border-neutral-600 flex items-center justify-center ${powerOn ? "bg-green-500/70" : "bg-red-500/70"}`}
            aria-label="Power button"
          >
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </button>

          {/* Indicator lights */}
          <div
            className={`w-3 h-3 rounded-full ${powerOn ? "bg-amber-500" : "bg-neutral-500"} shadow-glow-amber`}
          ></div>
          <div
            className={`w-3 h-3 rounded-full ${powerOn && history.length > 2 ? "bg-red-500 animate-pulse" : "bg-neutral-500"}`}
          ></div>

          {/* Fake knobs */}
          <div className="ml-auto flex gap-3">
            <div className="w-5 h-5 rounded-full bg-neutral-800 border border-neutral-600"></div>
            <div className="w-5 h-5 rounded-full bg-neutral-800 border border-neutral-600"></div>
          </div>
        </div>

        {/* Ventilation slots */}
        <div className="absolute top-8 right-3 flex flex-col gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-6 h-0.5 bg-neutral-700 rounded-full"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

