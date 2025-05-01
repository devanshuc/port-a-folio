import { Canvas as ThreeCanvas } from "@react-three/fiber";
import { OrbitControls, Stars, Environment } from "@react-three/drei";
import { Suspense } from "react";
import { useStore } from "../../store";

// AWS Components
import { VPC } from "../aws/VPC";
import CameraController from "./CameraController";
import LoadingScreen from "../ui/LoadingScreen";

const Canvas = () => {
  const { viewMode, isMobileView } = useStore();

  return (
    <div className="w-full h-screen bg-primary">
      <ThreeCanvas
        className="w-full h-full"
        camera={{
          position: [0, 5, 10],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
        shadows>
        <Suspense fallback={null}>
          <Environment preset="city" />
        </Suspense>

        {/* Global lighting */}
        <ambientLight intensity={0.2} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight
          position={[-10, -10, -10]}
          color="#38AECC"
          intensity={0.5}
        />

        {/* Camera controls based on view mode */}
        <CameraController />
        {viewMode === "orbital" && (
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={50}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
            makeDefault
          />
        )}

        {/* Background */}
        <Stars
          radius={100}
          depth={50}
          count={isMobileView ? 1000 : 5000}
          factor={4}
          saturation={0}
          fade
        />

        {/* AWS Infrastructure */}
        <VPC position={[0, 0, 0]} subnets={3} />

        {/* This is where we'll add more AWS components like EC2, S3, etc. */}
      </ThreeCanvas>
      <LoadingScreen />
    </div>
  );
};

export default Canvas;
