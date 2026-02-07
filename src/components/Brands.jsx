import React from "react";
import Container from "./Container";
import { BRANDS } from "./Data";

function Brands() {
  return (
    <Container className="bg-(--black) flex flex-col ">
      <p className="text-xl text-(--white) text-center mb-10 font-[title]">
        Our Key Focus
      </p>
      <div className="flex flex-wrap gap-x-40 gap-y-10 items-center justify-center px-10 max-lg:gap-x-4 max-lg:gap-y-6 max-lg:px-0 max-md:grid max-md:grid-cols-3 ">
        {BRANDS.map((brand) => (
          <div
            key={brand.id}
            className="max-md:last:col-start-2 max-md:last:justify-self-center"
          >
            <img src={brand.img} alt="" className="" />
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Brands;
