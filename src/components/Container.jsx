import React from "react";

function Container({ children, className = "", style, id }) {
  return (
    <div
      id={id}
      className={`xl:px-30 py-14 px-10 max-md:py-8 max-md:px-4 ${className}`}
      style={style}
    >
      <div>{children}</div>
    </div>
  );
}

export default Container;
