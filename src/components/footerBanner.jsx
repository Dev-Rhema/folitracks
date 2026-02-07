import React from "react";

import Container from "./Container";
import CTA from "./CTA";
import LowBG from "./LowBG";

function FooterBanner({
  title = "",
  subTitle = "",
  button1 = "",
  button1Color = "",
  button2 = "",
  button2Color = "",
  img = "",
}) {
  return (
    <div className="relative text-white flex items-center justify-center">
      <LowBG img={img} className="" />
      <div className="flex flex-col items-center justify-center text-center xl:px-30 py-20 w-[80%] gap-4 px-10 max-md:px-4  max-lg:py-10 max-lg:w-full">
        <p className="font-[title] text-5xl font-bold max-md:text-[32px] max-md:px-0">
          {title}
        </p>
        <p className="text-(--lightGrey)">{subTitle}</p>
        <div className="gap-4 flex justify-center max-md:flex-col max-lg:gap-2 w-full">
          <button>
            <CTA name={button1} color={button1Color} />
          </button>
          {button2 && (
            <button>
              <CTA name={button2} color={button2Color} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FooterBanner;
