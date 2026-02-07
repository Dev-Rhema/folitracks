import React from "react";
import Container from "./Container";

function LowBG({ img, className = "" }) {
  return (
    <Container
      className={`w-full h-full top-0 left-0 -z-100 brightness-20 absolute inline-flex ${className}`}
      style={{
        backgroundImage: `url(${img})`,
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}

export default LowBG;
