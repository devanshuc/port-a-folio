import { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { useStore } from "../../store";
import { Vector3 } from "three";
import { gsap } from "gsap";

const CameraController = () => {
  const { camera } = useThree();
  const { activeComponent, viewMode } = useStore();

  // Target positions for different views
  const cameraTargets = useRef({
    default: new Vector3(0, 0, 0),
    vpc: new Vector3(0, 1, 0),
    // We will add more targets as we create more AWS components
  });

  // Update camera position when active component changes
  useEffect(() => {
    if (!activeComponent) {
      // Reset to default view
      gsap.to(camera.position, {
        duration: 2,
        x: 0,
        y: 5,
        z: 10,
        ease: "power2.inOut",
      });

      gsap.to(camera.rotation, {
        duration: 2,
        x: 0,
        y: 0,
        z: 0,
        ease: "power2.inOut",
      });
    } else {
      // Move to the active component's position
      const targetPosition =
        cameraTargets.current[
          activeComponent as keyof typeof cameraTargets.current
        ] || cameraTargets.current.default;

      gsap.to(camera.position, {
        duration: 2,
        x: targetPosition.x + 3,
        y: targetPosition.y + 3,
        z: targetPosition.z + 5,
        ease: "power2.inOut",
      });
    }
  }, [activeComponent, camera]);

  // Handle different view modes
  useEffect(() => {
    switch (viewMode) {
      case "firstPerson":
        // First person view
        gsap.to(camera.position, {
          duration: 1.5,
          y: 2,
          ease: "power2.inOut",
        });
        break;

      case "guided":
        // Start guided tour animation
        // This will be implemented later
        break;

      case "orbital":
      default:
        // Default orbital view
        // No change needed, handled by OrbitControls
        break;
    }
  }, [viewMode, camera]);

  return null;
};

export default CameraController;
