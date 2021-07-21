import headerStyles from "../styles/Header.module.css";
import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import Box from "../components/Box";

const Header = ({ props }) => {
  return (
    <>
      <div className={headerStyles.title}>
        <Canvas camera={{ position: [0, 0, 35] }}>
          <ambientLight intensity={1} />
          <pointLight position={[40, 40, 40]} />
          <Suspense fallback={null}>
            <Box position={[0, 0, 0]} />
          </Suspense>
        </Canvas>
        <h4 className={headerStyles.descrition}>{props}</h4>
      </div>
    </>
  );
};

export default Header;
