import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Box, Text } from "@react-three/drei";
import { useStore } from "../../store";
import { VPCProps } from "../../types";
import { Group } from "three";

export const VPC = ({
  position,
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  subnets = 2,
  onClick,
}: VPCProps) => {
  const vpcRef = useRef<Group>(null);
  const { activeComponent, setHoveredComponent, setActiveComponent } =
    useStore();
  const [hovered, setHovered] = useState(false);
  const isActive = activeComponent === "vpc";

  // Gentle floating animation
  useFrame((state) => {
    if (vpcRef.current) {
      vpcRef.current.position.y =
        position[1] + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
      if (hovered || isActive) {
        vpcRef.current.rotation.y += 0.005;
      } else {
        // Slowly return to original rotation
        vpcRef.current.rotation.y += 0.001;
      }
    }
  });

  const handlePointerOver = () => {
    setHovered(true);
    setHoveredComponent("vpc");
  };

  const handlePointerOut = () => {
    setHovered(false);
    setHoveredComponent(null);
  };

  const handleClick = () => {
    setActiveComponent(isActive ? null : "vpc");
    if (onClick) onClick();
  };

  // VPC Color scheme
  const baseColor = "#38AECC"; // Secondary color from our palette
  const hoverColor = "#5BCDE8"; // Lighter version for hover
  const activeColor = "#FF934F"; // Accent color for active state

  // Apply color based on state
  const vpcColor = isActive ? activeColor : hovered ? hoverColor : baseColor;

  // Create subnet grid based on subnet count
  const createSubnets = () => {
    const subnetsPerRow = Math.ceil(Math.sqrt(subnets));
    const subnetSize = 2.5 / subnetsPerRow; // Adjust size based on number
    const subnetsArray = [];

    for (let i = 0; i < subnets; i++) {
      const row = Math.floor(i / subnetsPerRow);
      const col = i % subnetsPerRow;
      const xPos = (col - (subnetsPerRow - 1) / 2) * subnetSize * 1.2;
      const zPos =
        (row - Math.floor((subnets - 1) / subnetsPerRow) / 2) *
        subnetSize *
        1.2;

      subnetsArray.push(
        <Box
          key={`subnet-${i}`}
          position={[xPos, 0, zPos]}
          args={[subnetSize, 0.05, subnetSize]}>
          <meshStandardMaterial
            color={vpcColor}
            opacity={0.3}
            transparent
            wireframe={true}
          />
        </Box>
      );
    }

    return subnetsArray;
  };

  return (
    <group
      ref={vpcRef}
      position={position}
      rotation={rotation as [number, number, number]}
      scale={scale as [number, number, number]}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}>
      {/* Main VPC container */}
      <Box args={[6, 0.2, 6]} position={[0, 0, 0]} castShadow receiveShadow>
        <meshStandardMaterial
          color={vpcColor}
          opacity={0.7}
          transparent
          roughness={0.3}
          metalness={0.5}
        />
      </Box>

      {/* Subnets */}
      {createSubnets()}

      {/* VPC Label */}
      <Text
        position={[0, 0.5, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        color="#F0F4F8"
        fontSize={0.4}
        maxWidth={5}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign="center"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2">
        VPC
      </Text>

      {/* Connection points for other services will be added here */}
    </group>
  );
};
