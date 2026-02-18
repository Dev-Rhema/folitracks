import React from "react";

function CTA({
  name = "",
  color = "",
  onClick = null,
  type = "button",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="text-[16px] cursor-pointer px-6 py-3 font-[body] text-(--white) rounded-md w-full disabled:opacity-50 disabled:cursor-not-allowed"
      style={{
        backgroundColor: `var(--${color})`,
      }}
    >
      {name}
    </button>
  );
}

export default CTA;
