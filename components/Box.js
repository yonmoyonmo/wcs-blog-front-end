import headerStyles from "../styles/Header.module.css";
import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "react-three-fiber";
import * as THREE from "three";
import sampleImage from "../assets/sample.png";

const Box = (props) => {
    const mesh = useRef();
  
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);
  
    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  
    const imaTexture = useLoader(THREE.TextureLoader, sampleImage);
  
    return (
      <mesh
        {...props}
        ref={mesh}
        scale={active ? [9, 9, 9] : [8, 8, 8]}
        onClick={(e) => setActive(!active)}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}
      >
        <boxBufferGeometry attach="geometry" args={[3, 3, 3]} />
        <meshStandardMaterial
          attach="material"
          map={imaTexture}
          size={0.5}
          sizeAttenuation
          transparent={false}
          alphaTest={0.5}
          opacity={1.0}
        />
      </mesh>
    );
  };

  export default Box;