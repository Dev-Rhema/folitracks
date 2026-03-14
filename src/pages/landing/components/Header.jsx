import React from "react";

function Header({ sub1 = "", title = "", sub2 = "", className = "" }) {
  return (
    <div
      className={`flex flex-col gap-3 items-center justify-center mb-16 ${className} text-center xl:px-24 px-10 max-md:px-0 max-md:mb-10`}
    >
      <p className="text-(--red) text-sm">{sub1}</p>
      <p className="font-(--title) font-bold text-5xl max-lg:text-4xl max-md:text-[32px]">
        {title}
      </p>
      <p className="text-[#48486b] text-[20px] max-md:text-lg ">{sub2}</p>
    </div>
  );
}

export default Header;
