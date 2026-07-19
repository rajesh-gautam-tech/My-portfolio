import { technicalSkills, techStack, education } from "../data/portfolioData";
import "./Skills.css";

export default function Skills() {
  return (
    <section id="skills">
      <p className="ey">03 // Capabilities</p>
      <h2 className="sh rv">
        Skills & <em>Expertise</em>
      </h2>
      <div className="skl">
        <div className="rv" id="skillbars">
          <h3>Technical Vectors</h3>
          {technicalSkills.map((skill) => (
            <div className="si" key={skill.name}>
              <div className="sih">
                <span className="sn">{skill.name}</span>
                <span className="sp">{skill.percent}%</span>
              </div>
              <div className="sbt">
                <div className="sbf" data-w={(skill.percent / 100).toString()} />
              </div>
            </div>
          ))}
          <div className="tg">
            {techStack.map((tech) => (
              <div className="tc" key={tech}>
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rv">
          <h3>Academic Roadmap</h3>
          <div className="etl">
            {education.map((item) => (
              <div className="ei" key={item.role}>
                <div className="edate">{item.date}</div>
                <div className="erole">{item.role}</div>
                <div className="eorg">{item.org}</div>
                <p className="edesc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
