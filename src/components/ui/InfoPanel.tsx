import { useState, useEffect } from "react";
import { useStore } from "../../store";

const InfoPanel = () => {
  const {
    activeComponent,
    getActiveProject,
    getActiveSkill,
    getActiveExperience,
    getActiveEducation,
  } = useStore();

  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Get the active object based on the activeComponent ID
  const activeProject = getActiveProject();
  const activeSkill = getActiveSkill();
  const activeExperience = getActiveExperience();
  const activeEducation = getActiveEducation();

  // Determine which type of component is active
  const activeObject =
    activeProject || activeSkill || activeExperience || activeEducation;
  const activeType = activeProject
    ? "project"
    : activeSkill
    ? "skill"
    : activeExperience
    ? "experience"
    : activeEducation
    ? "education"
    : null;

  // Handle opening/closing the panel
  useEffect(() => {
    if (activeComponent) {
      setIsPanelOpen(true);
    } else {
      setIsPanelOpen(false);
    }
  }, [activeComponent]);

  // If no component is active, don't render the panel
  if (!activeObject || !activeType) return null;

  // Render different content based on the active component type
  const renderContent = () => {
    switch (activeType) {
      case "project":
        return (
          <div>
            <div className="flex items-center mb-3">
              <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded">
                Project
              </span>
              <div className="ml-2 flex-1 h-px bg-secondary/20"></div>
            </div>
            <h2 className="text-xl font-bold text-secondary mb-2">
              {activeProject?.title}
            </h2>
            <p className="text-sm mb-4">{activeProject?.description}</p>

            <h3 className="text-sm font-semibold text-secondary mb-2">
              Key Highlights
            </h3>
            <ul className="list-disc list-inside text-sm mb-4">
              {activeProject?.highlights.map((highlight, index) => (
                <li key={index} className="mb-1">
                  {highlight}
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-semibold text-secondary mb-2">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {activeProject?.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-2 mt-4">
              {activeProject?.githubUrl && (
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-primary text-background text-sm rounded hover:bg-primary/80">
                  GitHub
                </a>
              )}
              {activeProject?.demoUrl && (
                <a
                  href={activeProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-secondary text-primary text-sm rounded hover:bg-secondary/80">
                  Live Demo
                </a>
              )}
            </div>
          </div>
        );

      case "skill":
        return (
          <div>
            <div className="flex items-center mb-3">
              <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded">
                Skill
              </span>
              <div className="ml-2 flex-1 h-px bg-secondary/20"></div>
            </div>
            <h2 className="text-xl font-bold text-secondary mb-2">
              {activeSkill?.name}
            </h2>
            <p className="text-sm mb-4">{activeSkill?.description}</p>

            <div className="mb-4">
              <h3 className="text-sm font-semibold text-secondary mb-2">
                Proficiency
              </h3>
              <div className="bg-background/10 rounded-full h-2 w-full">
                <div
                  className="bg-secondary h-full rounded-full"
                  style={{
                    width: `${(activeSkill?.proficiency || 0) * 10}%`,
                  }}></div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span>Beginner</span>
                <span>Intermediate</span>
                <span>Expert</span>
              </div>
            </div>

            <div className="flex justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-secondary mb-1">
                  Experience
                </h3>
                <p className="text-sm">
                  {activeSkill?.yearsOfExperience} years
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-secondary mb-1">
                  Category
                </h3>
                <p className="text-sm capitalize">{activeSkill?.category}</p>
              </div>
            </div>

            <h3 className="text-sm font-semibold text-secondary mb-2">
              Related Projects
            </h3>
            <ul className="list-disc list-inside text-sm">
              {activeSkill?.relatedProjects.map((projectId, index) => {
                const project = useStore
                  .getState()
                  .projects.find((p) => p.id === projectId);
                return project ? (
                  <li key={index} className="mb-1">
                    {project.title}
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        );

      case "experience":
        return (
          <div>
            <div className="flex items-center mb-3">
              <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded">
                Experience
              </span>
              <div className="ml-2 flex-1 h-px bg-secondary/20"></div>
            </div>
            <h2 className="text-xl font-bold text-secondary mb-1">
              {activeExperience?.company}
            </h2>
            <h3 className="text-lg font-semibold mb-2">
              {activeExperience?.role}
            </h3>

            <div className="flex items-center mb-4">
              <span className="text-sm">
                {formatDate(activeExperience?.startDate)} –{" "}
                {activeExperience?.endDate
                  ? formatDate(activeExperience.endDate)
                  : "Present"}
              </span>
              {!activeExperience?.endDate && (
                <span className="ml-2 px-2 py-0.5 bg-green-500/20 text-green-500 text-xs rounded">
                  Current
                </span>
              )}
            </div>

            <p className="text-sm mb-4">{activeExperience?.description}</p>

            <h3 className="text-sm font-semibold text-secondary mb-2">
              Key Achievements
            </h3>
            <ul className="list-disc list-inside text-sm mb-4">
              {activeExperience?.achievements.map((achievement, index) => (
                <li key={index} className="mb-1">
                  {achievement}
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-semibold text-secondary mb-2">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {activeExperience?.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        );

      case "education":
        return (
          <div>
            <div className="flex items-center mb-3">
              <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded">
                Education
              </span>
              <div className="ml-2 flex-1 h-px bg-secondary/20"></div>
            </div>
            <h2 className="text-xl font-bold text-secondary mb-1">
              {activeEducation?.institution}
            </h2>
            <h3 className="text-lg font-semibold mb-2">
              {activeEducation?.degree} in {activeEducation?.field}
            </h3>

            <div className="mb-4">
              <span className="text-sm">
                {formatDate(activeEducation?.startDate, true)} –{" "}
                {formatDate(activeEducation?.endDate, true)}
              </span>
            </div>

            <p className="text-sm mb-4">{activeEducation?.description}</p>

            <h3 className="text-sm font-semibold text-secondary mb-2">
              Achievements
            </h3>
            <ul className="list-disc list-inside text-sm">
              {activeEducation?.achievements.map((achievement, index) => (
                <li key={index} className="mb-1">
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        );

      default:
        return null;
    }
  };

  // Helper to format dates
  function formatDate(dateString?: string, yearOnly?: boolean) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return yearOnly
      ? date.getFullYear().toString()
      : `${date.toLocaleString("default", {
          month: "short",
        })} ${date.getFullYear()}`;
  }

  return (
    <div
      className={`fixed bottom-0 left-0 w-full md:w-96 md:left-4 md:bottom-4 bg-primary/90 backdrop-blur-md text-background z-30 
        transition-transform duration-300 rounded-t-lg md:rounded-lg shadow-lg
        ${
          isPanelOpen
            ? "translate-y-0"
            : "translate-y-full md:translate-y-0 md:opacity-0 md:invisible"
        }
      `}>
      {/* Header with close button */}
      <div className="flex items-center justify-between p-3 border-b border-secondary/20">
        <h2 className="text-secondary font-mono">
          {activeType === "project" && "EC2 Instance"}
          {activeType === "skill" && "Lambda Function"}
          {activeType === "experience" && "RDS Database"}
          {activeType === "education" && "S3 Bucket"}
        </h2>
        <button
          onClick={() => useStore.getState().setActiveComponent(null)}
          className="p-1 hover:text-secondary">
          ✕
        </button>
      </div>

      {/* Content area */}
      <div className="p-4 max-h-96 md:max-h-[60vh] overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default InfoPanel;
