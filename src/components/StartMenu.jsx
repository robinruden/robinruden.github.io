"use client"

import "../styles/StartMenu.css"

function StartMenu({ onProgramClick }) {
  const menuItems = [
    { id: "programs", name: "Programs", icon: "/folder.png", submenu: true },
    { id: "documents", name: "Documents", icon: "/documents.png", submenu: true },
    { id: "settings", name: "Settings", icon: "/settings.png", submenu: true },
    { id: "find", name: "Find", icon: "/find.png", submenu: true },
    { id: "help", name: "Help", icon: "/help.png" },
    { id: "run", name: "Run...", icon: "/run.png" },
    { id: "shutdown", name: "Shut Down...", icon: "/shutdown.png", separator: true },
  ]

  return (
    <div className="start-menu">
      <div className="start-menu-banner">
        <span className="banner-text">Windows 95</span>
      </div>
      <div className="start-menu-items">
        {menuItems.map((item) => (
          <div key={item.id}>
            {item.separator && <div className="menu-separator"></div>}
            <div className="menu-item" onClick={onProgramClick}>
              <img src={item.icon || "/placeholder.svg"} alt={item.name} className="menu-icon" />
              <span>{item.name}</span>
              {item.submenu && <span className="submenu-arrow">▶</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StartMenu
