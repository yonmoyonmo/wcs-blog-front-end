import { useEffect } from "react";
import React, { useState } from "react";

const Loading = () => {
  return (
    <div style={{ width: "100%" }} className="window" key={key}>
      <div className="title-bar">
        <div className="title-bar-text">wait... please...</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" />
          <button aria-label="Maximize" />
          <button aria-label="Close" />
        </div>
      </div>
      <div className="field-row" style={{ justifyContent: "center" }}>
        <p>wait....</p>
      </div>
    </div>
  );
};

export default Loading;
