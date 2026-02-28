import React from "react";

function DashHeader({ title = "", subtitle = "" }) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="font-[title] text-[28px] font-bold">{title}</h1>
      <p className="text-[#48486B] font-[body] text-[16px]">{subtitle}</p>
    </div>
  );
}

export default DashHeader;
