import React, { Children } from "react";
import Container from "./Container";

function LowBG({ img = "", className = "", children }) {
  return (
    <div
      className={`w-full top-0 left-0 -z-100 brightness-20 absolute flex ${className}`}
      style={{
        backgroundImage: `url(${img})`,
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </div>
  );
}

export default LowBG;
