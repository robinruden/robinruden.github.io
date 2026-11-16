import "./Folder.css"
import { programs } from "../data/programs"

const projects = [
  {
    id: "RexicoCity",
    title: "Rexico City",
    category: "WEBBPLATS",
    image: "/img/rexico.png",
    description: "Ett gruppprojekt som blev till en nöjespark med dinosaurietema.",
    technologies: ["Vue", "Vite"],
  },
  {
    id: "amiga",
    title: "Amiga Dashboard",
    category: "DASHBOARD",
    image: "/img/amiga.png",
    description: "En dashboard i stil med Amiga Workbench 1.0.",
    technologies: ["React", "Vite"]
  },
]

export default function Projects() {
  return (
    <div className="projects-view">
      <div className="projects-location"><img src="/img/folder-open.ico" alt="" /><span>Robin Rudén / Mina projekt</span></div>
      <header className="projects-heading">
        <p>UTVALDA ARBETEN</p>
        <h2>Några smakprov på mina byggen.</h2>
        <span>Några projekt att kika närmare på. Öppna ett projekt för att utforska gränssnittet.</span>
      </header>
      <div className="project-list">
        {projects.map((project, index) => (
          <article className="project-card" key={project.id}>
            <a className="project-preview" href={programs[project.id].url} target="_blank" rel="noopener noreferrer" aria-label={`Besök ${project.title} (öppnas i ny flik)`}>
              <img src={project.image} alt={`Förhandsvisning av ${project.title}`} />
              <span aria-hidden="true">Öppna projekt ↗</span>
            </a>
            <div className="project-details">
              <p className="project-category">0{index + 1} / {project.category}</p>
              <h3>{project.title}</h3>
              <p className="project-description">{project.description}</p>
              {project.technologies.length > 0 && <ul className="project-tags" aria-label="Tekniker">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>}
              <a className="portfolio-button project-link" href={programs[project.id].url} target="_blank" rel="noopener noreferrer">Besök webbplats <span aria-hidden="true">↗</span></a>
            </div>
          </article>
        ))}
      </div>
      <footer className="projects-footer"><span>2 projekt</span><a href="https://github.com/robinruden" target="_blank" rel="noopener noreferrer">Mer på min GitHub ↗</a></footer>
    </div>
  )
}
