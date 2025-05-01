import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Box, Cylinder, Text, Html } from "@react-three/drei";
import { useStore } from "../../store";
import { RDSProps } from "../../types";
import { Group } from "three";

export const RDSInstance = ({
  position,
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  experience,
  onClick,
}: RDSProps) => {
  const rdsRef = useRef<Group>(null);
  const { activeComponent, setHoveredComponent, setActiveComponent } =
    useStore();
  const [hovered, setHovered] = useState(false);
  const isActive = activeComponent === experience.id;

  // Animation
  useFrame((state) => {
    if (rdsRef.current) {
      // Gentle database pulse animation
      const pulse = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.03;

      // Only apply scaling to the cylinder (database symbol)
      const cylinderIndex = 1; // Assuming it's the second child
      if (rdsRef.current.children[cylinderIndex]) {
        rdsRef.current.children[cylinderIndex].scale.set(
          1 + pulse,
          1,
          1 + pulse
        );
      }

      // Gentle floating for the whole group
      rdsRef.current.position.y =
        position[1] +
        Math.sin(state.clock.getElapsedTime() * 0.3 + position[0]) * 0.05;

      // More prominent animations when active or hovered
      if (isActive || hovered) {
        rdsRef.current.rotation.y += 0.005;
      }
    }
  });

  const handlePointerOver = () => {
    setHovered(true);
    setHoveredComponent(experience.id);
  };

  const handlePointerOut = () => {
    setHovered(false);
    setHoveredComponent(null);
  };

  const handleClick = () => {
    setActiveComponent(isActive ? null : experience.id);
    if (onClick) onClick();
  };

  // RDS color scheme - RDS is usually represented with blue
  const baseColor = "#2F72AA"; // Blue color for RDS
  const hoverColor = "#3F82BA";
  const activeColor = "#FF934F"; // Our accent color

  // Apply color based on state
  const rdsColor = isActive ? activeColor : hovered ? hoverColor : baseColor;

  // Helper to format date display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Present";
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
  };

  // Check if it's a current position
  const isCurrent = !experience.endDate;

  return (
    <group
      ref={rdsRef}
      position={position}
      rotation={rotation as [number, number, number]}
      scale={scale as [number, number, number]}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}>
      {/* Base plate - representing server */}
      <Box
        args={[1.2, 0.1, 1.2]}
        position={[0, -0.3, 0]}
        castShadow
        receiveShadow>
        <meshStandardMaterial
          color={rdsColor}
          roughness={0.2}
          metalness={0.8}
        />
      </Box>

      {/* Database cylinder */}
      <Cylinder
        args={[0.5, 0.5, 0.4, 32]}
        position={[0, 0, 0]}
        castShadow
        receiveShadow>
        <meshStandardMaterial
          color={rdsColor}
          roughness={0.3}
          metalness={0.6}
        />
      </Cylinder>

      {/* Database lines to represent structure */}
      {[...Array(3)].map((_, index) => (
        <Cylinder
          key={`line-${index}`}
          args={[0.505, 0.505, 0.02, 32]}
          position={[0, -0.15 + index * 0.15, 0]}
          castShadow
          receiveShadow>
          <meshStandardMaterial
            color="#0A2342"
            roughness={0.2}
            metalness={0.7}
          />
        </Cylinder>
      ))}

      {/* RDS logo */}
      <Text
        position={[0, 0, 0.51]}
        rotation={[0, 0, 0]}
        fontSize={0.15}
        color="#F0F4F8"
        anchorX="center"
        anchorY="middle">
        RDS
      </Text>

      {/* Company name */}
      <Text
        position={[0, 0.5, 0]}
        rotation={[0, 0, 0]}
        fontSize={0.15}
        color="#F0F4F8"
        maxWidth={2}
        textAlign="center"
        anchorX="center"
        anchorY="middle">
        {experience.company}
      </Text>

      {/* Current position indicator */}
      {isCurrent && (
        <Box args={[0.1, 0.1, 0.1]} position={[0.6, 0, 0]} castShadow>
          <meshStandardMaterial
            color="#4CAF50"
            emissive="#4CAF50"
            emissiveIntensity={0.5}
          />
        </Box>
      )}

      {/* Detail panel on hover/active */}
      {(hovered || isActive) && (
        <Html
          position={[0, -1, 0]}
          className="pointer-events-none"
          center
          distanceFactor={8}>
          <div className="bg-primary/90 text-background p-2 rounded shadow-lg w-48">
            <h3 className="text-secondary text-xs font-bold mb-1">
              {experience.company}
            </h3>
            <p className="text-[0.7rem] font-semibold mb-1">
              {experience.role}
            </p>
            <div className="flex justify-between text-xs mb-2">
              <span>
                {formatDate(experience.startDate)} →{" "}
                {formatDate(experience.endDate)}
              </span>
              {isCurrent && (
                <span className="text-[0.6rem] bg-green-500/30 px-1 rounded">
                  Current
                </span>
              )}
            </div>
            <p className="text-xs italic line-clamp-2">
              {experience.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-1 mt-2">
              {experience.technologies.slice(0, 5).map((tech, i) => (
                <span
                  key={i}
                  className="text-[0.6rem] bg-secondary/20 px-1 rounded">
                  {tech}
                </span>
              ))}
              {experience.technologies.length > 5 && (
                <span className="text-[0.6rem] bg-secondary/20 px-1 rounded">
                  +{experience.technologies.length - 5}
                </span>
              )}
            </div>

            {/* Achievements */}
            {experience.achievements.length > 0 && (
              <div className="mt-1">
                <p className="text-[0.65rem] text-secondary">
                  Key achievements:
                </p>
                <ul className="list-disc list-inside text-[0.65rem] pl-1">
                  {experience.achievements.slice(0, 1).map((achievement, i) => (
                    <li key={i} className="line-clamp-1">
                      {achievement}
                    </li>
                  ))}
                  {experience.achievements.length > 1 && (
                    <li className="text-secondary">
                      +{experience.achievements.length - 1} more
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </Html>
      )}
    </group>
  );
};
