import React from "react";

function Container({ children, className = "", style, height = "" }) {
  return (
    <div
      className={`xl:px-30 py-10 h-${height} px-10 max-md:py-6 max-md:px-4 ${className}`}
      style={style}
    >
      <div>{children}</div>
    </div>
  );
}

export default Container;
