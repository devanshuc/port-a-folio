import { useState } from "react";
import { useStore } from "../../store";
import { ViewMode } from "../../types";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    viewMode,
    setViewMode,
    isCodeViewActive,
    toggleCodeView,
    setActiveComponent,
  } = useStore();

  const navigationOptions = [
    { id: "projects", label: "Projects", icon: "📊" },
    { id: "skills", label: "Skills", icon: "λ" },
    { id: "experience", label: "Experience", icon: "🖥️" },
    { id: "education", label: "Education", icon: "🎓" },
    { id: "contact", label: "Contact", icon: "📧" },
  ];

  // Mode toggle options
  const viewModes: { id: ViewMode; label: string; icon: string }[] = [
    { id: "orbital", label: "Orbital View", icon: "🔭" },
    { id: "firstPerson", label: "First Person", icon: "👁️" },
    { id: "guided", label: "Guided Tour", icon: "🚀" },
  ];

  // Functions to handle navigation
  const handleNavigate = (sectionId: string) => {
    // Close the menu on mobile
    setIsMenuOpen(false);

    // Logic to navigate to different sections
    // This would typically set the active component or trigger a camera move
    // For now we'll just log it
    console.log(`Navigating to ${sectionId}`);

    // Example implementation for projects and skills sections
    if (sectionId === "projects" || sectionId === "skills") {
      // Reset active component to show the overview
      setActiveComponent(null);
    }
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Mobile navigation toggle */}
      <button
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-primary text-background md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? "✕" : "☰"}
      </button>

      {/* Sidebar navigation - hidden on mobile unless toggled */}
      <div
        className={`fixed top-0 right-0 h-full bg-primary/90 backdrop-blur-md text-background w-64 transform transition-transform duration-300 z-40 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
        } md:w-16 md:hover:w-64 group overflow-hidden`}>
        <div className="p-4 border-b border-secondary/20">
          <h2 className="text-lg font-mono text-secondary truncate">
            CloudScape
          </h2>
          <p className="text-xs text-background/70 truncate">AWS Portfolio</p>
        </div>

        {/* Main navigation */}
        <nav className="mt-4">
          <ul>
            {navigationOptions.map((option) => (
              <li key={option.id}>
                <button
                  onClick={() => handleNavigate(option.id)}
                  className="w-full p-3 hover:bg-secondary/10 text-left flex items-center space-x-3 group-hover:justify-start md:justify-center md:group-hover:justify-start">
                  <span className="text-lg w-6">{option.icon}</span>
                  <span className="truncate md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                    {option.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* View mode options */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-secondary/20 bg-primary/80 backdrop-blur-sm">
          <p className="px-4 py-2 text-xs text-secondary md:opacity-0 md:group-hover:opacity-100">
            View Modes
          </p>
          <div className="grid grid-cols-3 md:grid-cols-1 md:group-hover:grid-cols-3 gap-1 p-2">
            {viewModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => handleViewModeChange(mode.id)}
                className={`p-2 rounded text-center transition-colors ${
                  viewMode === mode.id
                    ? "bg-secondary text-primary"
                    : "bg-primary/50 hover:bg-secondary/20 text-background"
                }`}
                title={mode.label}>
                <span className="block text-lg md:mx-auto">{mode.icon}</span>
                <span className="text-xs truncate block md:hidden md:group-hover:block">
                  {mode.label}
                </span>
              </button>
            ))}
          </div>

          {/* Infrastructure as Code toggle */}
          <button
            onClick={toggleCodeView}
            className={`w-full p-3 flex items-center space-x-2 border-t border-secondary/20 ${
              isCodeViewActive
                ? "bg-accent/20 text-accent"
                : "hover:bg-secondary/10"
            }`}>
            <span className="text-lg md:mx-auto">{"</>"}</span>
            <span className="truncate md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
              Code View
            </span>
          </button>
        </div>
      </div>

      {/* Mobile navigation background overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-primary/30 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMenuOpen(false)}></div>
      )}
    </>
  );
};

export default Navigation;
