import { Canvas as ThreeCanvas } from "@react-three/fiber";
import { OrbitControls, Stars, Environment } from "@react-three/drei";
import { Suspense } from "react";
import { useStore } from "../../store";

// AWS Components
import { VPC } from "../aws/VPC";
import { EC2Instance } from "../aws/EC2Instance";
import { Lambda } from "../aws/Lambda";
import { S3Bucket } from "../aws/S3Bucket";
import { RDSInstance } from "../aws/RDSInstance";
import CameraController from "./CameraController";
import LoadingScreen from "../ui/LoadingScreen";

const Canvas = () => {
  const { viewMode, isMobileView, projects, skills, education, experiences } =
    useStore();

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

        {/* VPC - Main AWS Architecture Container */}
        <VPC position={[0, 0, 0]} subnets={4} />

        {/* EC2 Instances - Projects */}
        {projects.map((project, index) => {
          // Position projects in a semi-circle around the VPC
          const angle = ((Math.PI * 2) / projects.length) * index;
          const radius = 6; // Distance from center
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;

          return (
            <EC2Instance
              key={project.id}
              position={[x, 0.5, z]}
              project={project}
            />
          );
        })}

        {/* Lambda Functions - Skills */}
        {skills.map((skill, index) => {
          // Position skills in an inner circle
          const angle =
            ((Math.PI * 2) / skills.length) * index + Math.PI / skills.length; // Offset to alternate with projects
          const radius = 4; // Smaller radius than projects
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;

          return <Lambda key={skill.id} position={[x, 0.3, z]} skill={skill} />;
        })}

        {/* S3 Buckets - Education */}
        {education.map((edu, index) => {
          // Position education on one side
          const angle = -Math.PI / 4 + (Math.PI / 2 / education.length) * index;
          const radius = 8; // Further from center
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;

          return (
            <S3Bucket key={edu.id} position={[x, 0.5, z]} education={edu} />
          );
        })}

        {/* RDS Instances - Experience */}
        {experiences.map((exp, index) => {
          // Position experience on the other side
          const angle =
            Math.PI / 4 + (Math.PI / 2 / experiences.length) * index;
          const radius = 8; // Further from center
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;

          return (
            <RDSInstance key={exp.id} position={[x, 0.5, z]} experience={exp} />
          );
        })}
      </ThreeCanvas>
      <LoadingScreen />
    </div>
  );
};

export default Canvas;
