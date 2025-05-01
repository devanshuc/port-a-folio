import { useEffect } from "react";
import Canvas from "./components/core/Canvas";
import { useStore } from "./store";
import "./App.css";

function App() {
  const { setMobileView } = useStore();

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, [setMobileView]);

  return (
    <div className="w-full h-screen overflow-hidden bg-primary">
      <Canvas />
      {/* UI overlays will be added here in the next phase */}
    </div>
  );
}

export default App;
