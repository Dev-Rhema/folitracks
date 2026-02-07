import React from "react";

function Container({ children, className = "", style }) {
  return (
    <div
      className={`xl:px-30 py-10 px-10 max-md:py-4 max-md:px-4 ${className}`}
      style={style}
    >
      <div>{children}</div>
    </div>
  );
}

export default Container;
