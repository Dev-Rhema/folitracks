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
      <LowBG img={img} className="h-full" />

      <Container className="xl:px-30 py-20 w-[80%] px-10 max-md:px-4  max-lg:py-10 max-lg:w-full ">
        <div className="flex flex-col items-center text-center gap-4">
          <p className="font-[title] text-5xl font-bold max-md:text-[32px] max-md:px-0">
            {title}
          </p>
          <p className="text-(--lightGrey)">{subTitle}</p>
          <div className="gap-4 flex justify-center max-md:flex-col max-lg:gap-2 w-full">
            <CTA name={button1} color={button1Color} />
            {button2 && <CTA name={button2} color={button2Color} />}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default FooterBanner;
