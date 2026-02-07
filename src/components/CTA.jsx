import React from "react";

function CTA({ name = "", color = "" }) {
  return (
    <button
      className={`text-[16px] px-6 py-3 font-[body] text-(--white) bg-(--${color}) rounded-md `}
    >
      {name}
    </button>
  );
}

export default CTA;
