import "../styles/Desktop.css"
import DesktopIcon from "./DesktopIcon"
import { programs } from "../data/programs"

export default function Desktop({ onIconClick }) {
  return (
    <main className="desktop" aria-label="Skrivbord">
      <section className="desktop-intro" aria-labelledby="portfolio-title">
        {/* <p className="desktop-eyebrow">PERSONLIG PORTFOLIO / ROBIN 95</p> */}
        <h1 id="portfolio-title">Robin Rudén<span>Webbutvecklare.</span></h1>
        <p className="desktop-intro-copy">Välkommen till mitt hörn av internet. Här hittar du mina projekt, mitt CV och hur du når mig.</p>
        <button type="button" className="portfolio-button" onClick={() => onIconClick("Projects")}>
          <img src="/img/folder-open.ico" alt="" />
          Utforska mina projekt <span aria-hidden="true">→</span>
        </button>
        {/* <p className="desktop-hint">Ett klassiskt skrivbord. En personlig portfolio.</p> */}
      </section>
      {["Projects", "notepad", "resume", "contact"].map((id) => (
        <DesktopIcon key={id} program={programs[id]} onOpen={() => onIconClick(id)} />
      ))}
    </main>
  )
}
