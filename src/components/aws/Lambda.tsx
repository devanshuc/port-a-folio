import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Box, Text, Html } from "@react-three/drei";
import { useStore } from "../../store";
import { LambdaProps } from "../../types";
import { Group } from "three";

export const Lambda = ({
  position,
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  skill,
  onClick,
}: LambdaProps) => {
  const lambdaRef = useRef<Group>(null);
  const { activeComponent, setHoveredComponent, setActiveComponent } =
    useStore();
  const [hovered, setHovered] = useState(false);
  const isActive = activeComponent === skill.id;

  // Animation for the Lambda function
  useFrame((state) => {
    if (lambdaRef.current) {
      // Gentle floating animation
      lambdaRef.current.position.y =
        position[1] +
        Math.sin(state.clock.getElapsedTime() * 0.7 + position[0]) * 0.05;

      // Pulse effect when active
      if (isActive) {
        const pulse = Math.sin(state.clock.getElapsedTime() * 2) * 0.05;
        lambdaRef.current.scale.set(
          (scale[0] as number) * (1 + pulse),
          (scale[1] as number) * (1 + pulse),
          (scale[2] as number) * (1 + pulse)
        );
      }
    }
  });

  const handlePointerOver = () => {
    setHovered(true);
    setHoveredComponent(skill.id);
  };

  const handlePointerOut = () => {
    setHovered(false);
    setHoveredComponent(null);
  };

  const handleClick = () => {
    setActiveComponent(isActive ? null : skill.id);
    if (onClick) onClick();
  };

  // Lambda color scheme - orange/yellow is the AWS Lambda color
  const baseColor = "#FF9900";
  const hoverColor = "#FFAA33";
  const activeColor = "#FF934F"; // Our accent color

  // Apply color based on state
  const lambdaColor = isActive ? activeColor : hovered ? hoverColor : baseColor;

  // Get skill category color
  const getCategoryColor = () => {
    switch (skill.category) {
      case "frontend":
        return "#4CAF50"; // Green
      case "backend":
        return "#2196F3"; // Blue
      case "cloud":
        return "#FF9800"; // Orange
      case "devops":
        return "#9C27B0"; // Purple
      case "database":
        return "#F44336"; // Red
      default:
        return "#607D8B"; // Gray
    }
  };

  // Calculate proficiency level visualization
  const proficiencyHeight = (skill.proficiency / 10) * 0.8; // Max height 0.8

  return (
    <group
      ref={lambdaRef}
      position={position}
      rotation={rotation as [number, number, number]}
      scale={scale as [number, number, number]}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}>
      {/* Lambda base */}
      <Box args={[0.7, 0.7, 0.7]} position={[0, 0, 0]} castShadow receiveShadow>
        <meshStandardMaterial
          color={lambdaColor}
          roughness={0.5}
          metalness={0.2}
        />
      </Box>

      {/* Lambda logo (λ) */}
      <Text
        position={[0, 0, 0.36]}
        fontSize={0.3}
        color="#0A2342"
        font="/fonts/JetBrainsMono-Bold.woff"
        anchorX="center"
        anchorY="middle">
        λ
      </Text>

      {/* Skill Category Indicator */}
      <Box args={[0.1, 0.1, 0.1]} position={[0.25, 0.25, 0.25]} castShadow>
        <meshStandardMaterial
          color={getCategoryColor()}
          emissive={getCategoryColor()}
          emissiveIntensity={0.5}
        />
      </Box>

      {/* Proficiency Level Indicator */}
      <Box
        args={[0.1, proficiencyHeight, 0.1]}
        position={[-0.25, proficiencyHeight / 2 - 0.1, 0]}
        castShadow>
        <meshStandardMaterial
          color="#38AECC"
          emissive="#38AECC"
          emissiveIntensity={0.3}
        />
      </Box>

      {/* Skill Name */}
      <Text
        position={[0, 0.5, 0]}
        rotation={[0, 0, 0]}
        fontSize={0.12}
        color="#F0F4F8"
        font="/fonts/Inter-SemiBold.woff"
        anchorX="center"
        anchorY="middle">
        {skill.name}
      </Text>

      {/* Detail panel on hover/active */}
      {(hovered || isActive) && (
        <Html
          position={[0, -0.7, 0]}
          className="pointer-events-none"
          center
          distanceFactor={8}>
          <div className="bg-primary/90 text-background p-2 rounded shadow-lg w-40">
            <h3 className="text-secondary text-xs font-bold mb-1">
              {skill.name}
            </h3>
            <div className="flex justify-between text-xs mb-1">
              <span>Proficiency:</span>
              <span className="font-mono">{skill.proficiency}/10</span>
            </div>
            <div className="flex justify-between text-xs mb-1">
              <span>Experience:</span>
              <span className="font-mono">
                {skill.yearsOfExperience}{" "}
                {skill.yearsOfExperience === 1 ? "yr" : "yrs"}
              </span>
            </div>
            <p className="text-[0.65rem] italic line-clamp-2 mt-1">
              {skill.description}
            </p>
          </div>
        </Html>
      )}
    </group>
  );
};
