import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Box, Text, Html } from "@react-three/drei";
import { useStore } from "../../store";
import { EC2Props } from "../../types";
import { Group } from "three";

export const EC2Instance = ({
  position,
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  project,
  onClick,
}: EC2Props) => {
  const ec2Ref = useRef<Group>(null);
  const { activeComponent, setHoveredComponent, setActiveComponent } =
    useStore();
  const [hovered, setHovered] = useState(false);
  const isActive = activeComponent === project.id;

  // Animation on hover/active state
  useFrame((state) => {
    if (ec2Ref.current) {
      // Gentle floating animation
      ec2Ref.current.position.y =
        position[1] +
        Math.sin(state.clock.getElapsedTime() * 0.5 + position[0]) * 0.1;

      // Rotate when hovered or active
      if (hovered || isActive) {
        ec2Ref.current.rotation.y += 0.01;
      }
    }
  });

  const handlePointerOver = () => {
    setHovered(true);
    setHoveredComponent(project.id);
  };

  const handlePointerOut = () => {
    setHovered(false);
    setHoveredComponent(null);
  };

  const handleClick = () => {
    setActiveComponent(isActive ? null : project.id);
    if (onClick) onClick();
  };

  // Colors
  const baseColor = "#0A2342"; // Primary color
  const hoverColor = "#1A3352"; // Slightly lighter version
  const activeColor = "#FF934F"; // Accent color

  // Apply color based on state
  const mainColor = isActive ? activeColor : hovered ? hoverColor : baseColor;
  const secondaryColor = isActive ? "#FFB77F" : "#38AECC"; // Secondary color for details

  // Get project category color
  const getCategoryColor = () => {
    switch (project.category) {
      case "frontend":
        return "#4CAF50"; // Green
      case "backend":
        return "#2196F3"; // Blue
      case "fullstack":
        return "#9C27B0"; // Purple
      case "cloud":
        return "#FF9800"; // Orange
      default:
        return "#607D8B"; // Gray
    }
  };

  return (
    <group
      ref={ec2Ref}
      position={position}
      rotation={rotation as [number, number, number]}
      scale={scale as [number, number, number]}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}>
      {/* Main EC2 Server */}
      <Box args={[1.5, 0.8, 2.2]} position={[0, 0, 0]} castShadow receiveShadow>
        <meshStandardMaterial
          color={mainColor}
          roughness={0.3}
          metalness={0.7}
        />
      </Box>

      {/* Server details - front panel */}
      <Box args={[1.4, 0.1, 0.1]} position={[0, 0, 1.1]} castShadow>
        <meshStandardMaterial color={secondaryColor} />
      </Box>

      {/* Status lights */}
      <Box args={[0.05, 0.05, 0.05]} position={[0.5, 0.2, 1.11]}>
        <meshStandardMaterial
          color={isActive ? "#00FF00" : "#FFFF00"}
          emissive={isActive ? "#00FF00" : "#FFFF00"}
          emissiveIntensity={1}
        />
      </Box>

      {/* Category indicator */}
      <Box args={[0.2, 0.2, 0.05]} position={[-0.5, 0.2, 1.11]}>
        <meshStandardMaterial
          color={getCategoryColor()}
          emissive={getCategoryColor()}
          emissiveIntensity={0.5}
        />
      </Box>

      {/* Project name label */}
      <Text
        position={[0, 0.6, 0]}
        rotation={[0, 0, 0]}
        fontSize={0.15}
        color="#F0F4F8"
        maxWidth={2}
        textAlign="center"
        anchorX="center"
        anchorY="middle">
        {project.title}
      </Text>

      {/* Service connections visualized as lines will be added later */}

      {/* Detail panel on hover/active */}
      {(hovered || isActive) && (
        <Html
          position={[0, -0.8, 0]}
          className="pointer-events-none"
          center
          distanceFactor={8}>
          <div className="bg-primary/90 text-background p-2 rounded shadow-lg w-48">
            <h3 className="text-secondary text-xs font-bold mb-1">
              {project.title}
            </h3>
            <p className="text-xs mb-1 line-clamp-2">{project.description}</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {project.technologies.slice(0, 3).map((tech, i) => (
                <span
                  key={i}
                  className="text-[0.6rem] bg-secondary/20 px-1 rounded">
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="text-[0.6rem] bg-secondary/20 px-1 rounded">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};
