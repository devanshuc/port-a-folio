import { useEffect } from "react";
import Canvas from "./components/core/Canvas";
import Navigation from "./components/ui/Navigation";
import CodeView from "./components/ui/CodeView";
import InfoPanel from "./components/ui/InfoPanel";
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
      <Navigation />
      <CodeView />
      <InfoPanel />
    </div>
  );
}

export default App;
