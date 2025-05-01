import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Box, Cylinder, Text, Html } from "@react-three/drei";
import { useStore } from "../../store";
import { S3Props } from "../../types";
import { Group } from "three";

export const S3Bucket = ({
  position,
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  education,
  onClick,
}: S3Props) => {
  const s3Ref = useRef<Group>(null);
  const { activeComponent, setHoveredComponent, setActiveComponent } =
    useStore();
  const [hovered, setHovered] = useState(false);
  const isActive = activeComponent === education.id;

  // Animation
  useFrame((state) => {
    if (s3Ref.current) {
      // Gentle rotation
      s3Ref.current.rotation.y =
        rotation[1] + Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;

      // Slight floating
      s3Ref.current.position.y =
        position[1] + Math.sin(state.clock.getElapsedTime() * 0.3) * 0.05;

      // Scale effect when active or hovered
      if (isActive || hovered) {
        s3Ref.current.scale.x = Math.max(
          s3Ref.current.scale.x,
          (scale[0] as number) * 1.05
        );
        s3Ref.current.scale.y = Math.max(
          s3Ref.current.scale.y,
          (scale[1] as number) * 1.05
        );
        s3Ref.current.scale.z = Math.max(
          s3Ref.current.scale.z,
          (scale[2] as number) * 1.05
        );
      } else {
        // Return to normal scale
        s3Ref.current.scale.x = Math.max(
          scale[0] as number,
          s3Ref.current.scale.x * 0.98
        );
        s3Ref.current.scale.y = Math.max(
          scale[1] as number,
          s3Ref.current.scale.y * 0.98
        );
        s3Ref.current.scale.z = Math.max(
          scale[2] as number,
          s3Ref.current.scale.z * 0.98
        );
      }
    }
  });

  const handlePointerOver = () => {
    setHovered(true);
    setHoveredComponent(education.id);
  };

  const handlePointerOut = () => {
    setHovered(false);
    setHoveredComponent(null);
  };

  const handleClick = () => {
    setActiveComponent(isActive ? null : education.id);
    if (onClick) onClick();
  };

  // S3 color scheme - S3 is usually represented with red
  const baseColor = "#E03C31"; // Red color for S3
  const hoverColor = "#FF4C40";
  const activeColor = "#FF934F"; // Our accent color

  // Apply color based on state
  const bucketColor = isActive ? activeColor : hovered ? hoverColor : baseColor;

  // Helper to get year display
  const getYearFromDate = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  // Determine if it's a current education
  const isCurrent = new Date(education.endDate) > new Date();

  return (
    <group
      ref={s3Ref}
      position={position}
      rotation={rotation as [number, number, number]}
      scale={scale as [number, number, number]}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}>
      {/* Bucket base */}
      <Cylinder
        args={[0.5, 0.6, 0.8, 16]}
        position={[0, 0, 0]}
        castShadow
        receiveShadow>
        <meshStandardMaterial
          color={bucketColor}
          roughness={0.4}
          metalness={0.3}
        />
      </Cylinder>

      {/* Bucket lid */}
      <Cylinder
        args={[0.55, 0.55, 0.1, 16]}
        position={[0, 0.45, 0]}
        castShadow
        receiveShadow>
        <meshStandardMaterial
          color={bucketColor}
          roughness={0.4}
          metalness={0.3}
        />
      </Cylinder>

      {/* S3 logo */}
      <Text
        position={[0, 0, 0.6]}
        rotation={[0, 0, 0]}
        fontSize={0.18}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle">
        S3
      </Text>

      {/* Education name */}
      <Text
        position={[0, 0.8, 0]}
        rotation={[0, 0, 0]}
        fontSize={0.15}
        color="#F0F4F8"
        maxWidth={2.5}
        textAlign="center"
        anchorX="center"
        anchorY="middle">
        {education.institution}
      </Text>

      {/* Year indicator */}
      <Box args={[0.6, 0.15, 0.1]} position={[0, -0.5, 0]} castShadow>
        <meshStandardMaterial color="#38AECC" />
      </Box>

      <Text
        position={[0, -0.5, 0.06]}
        rotation={[0, 0, 0]}
        fontSize={0.08}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle">
        {getYearFromDate(education.startDate)}-
        {isCurrent ? "Present" : getYearFromDate(education.endDate)}
      </Text>

      {/* Detail panel on hover/active */}
      {(hovered || isActive) && (
        <Html
          position={[0, -1.2, 0]}
          className="pointer-events-none"
          center
          distanceFactor={8}>
          <div className="bg-primary/90 text-background p-2 rounded shadow-lg w-48">
            <h3 className="text-secondary text-xs font-bold mb-1">
              {education.institution}
            </h3>
            <p className="text-[0.7rem] font-semibold mb-1">
              {education.degree} in {education.field}
            </p>
            <div className="flex justify-between text-xs mb-2">
              <span>
                {getYearFromDate(education.startDate)} -{" "}
                {isCurrent ? "Present" : getYearFromDate(education.endDate)}
              </span>
            </div>
            <p className="text-xs italic line-clamp-2">
              {education.description}
            </p>
            {education.achievements.length > 0 && (
              <div className="mt-1">
                <p className="text-[0.65rem] text-secondary">Achievements:</p>
                <ul className="list-disc list-inside text-[0.65rem] pl-1">
                  {education.achievements.slice(0, 2).map((achievement, i) => (
                    <li key={i} className="line-clamp-1">
                      {achievement}
                    </li>
                  ))}
                  {education.achievements.length > 2 && (
                    <li className="text-secondary">
                      +{education.achievements.length - 2} more
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
