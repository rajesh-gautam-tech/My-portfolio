import { projects } from "../data/portfolioData";
import "./Projects.css";

export default function Projects() {
  return (
    <section id="projects">
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 5%" }}>
        <p className="ey">02 // Deployments</p>
        <h2 className="sh rv">
          My <em>Projects</em>
        </h2>
      </div>
      <div className="pgrid rvs">
        {projects.map((project) => (
          <div className="pc" key={project.id}>
            <div className="pct">
              <span className="pnum">{project.id}</span>
              <div className="pico">{project.icon}</div>
            </div>
            <h3 className="ptitle">{project.title}</h3>
            <p className="pdesc">{project.description}</p>
            <div className="ptags">
              {project.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="plinks">
              <a href={project.sourceUrl} className="bg">
                {project.sourceLabel}
              </a>
              <a href={project.liveUrl} className="bp">
                {project.liveLabel}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
