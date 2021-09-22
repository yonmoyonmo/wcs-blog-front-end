import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import Box from "../components/Box";

const Header = ({ props }) => {
  return (
    <div style={{ width: "100%", marginBottom: "1rem" }}>
      <div className="window">
        <div className="title-bar">
          <div className="title-bar-text">{props}</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" />
            <button aria-label="Maximize" />
            <button aria-label="Close" />
          </div>
        </div>
        <div className="window-body">
          <Canvas camera={{ position: [0, 0, 35] }}>
            <ambientLight intensity={1} />
            <pointLight position={[0, 0, 0]} />
            <Suspense fallback={null}>
              <Box position={[0, 0, 0]} />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default Header;
