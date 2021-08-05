import headerStyles from "../styles/Header.module.css";
import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import Box from "../components/Box";

const Header = ({ props }) => {
  return (
    <>
      <div className={headerStyles.title}>
        <p style={{fontSize:"2rem"}}>{props}</p>
      </div>
      <Canvas camera={{ position: [0, 0, 35] }}>
        <ambientLight intensity={1} />
        <pointLight position={[0, 0, 0]} />
        <Suspense fallback={null}>
          <Box position={[0, 0, 0]} />
        </Suspense>
      </Canvas>
    </>
  );
};

export default Header;
