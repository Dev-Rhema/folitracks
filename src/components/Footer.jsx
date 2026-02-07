import React from "react";
import Container from "./Container";
import CTA from "./CTA";

function Footer() {
  return (
    <>
      <section>
        <div className="relative text-white flex items-center justify-center">
          <Container
            className="w-full h-full top-0 left-0 -z-100 brightness-20 absolute inline-flex "
            style={{
              backgroundImage: `url(/cta-img.svg)`,
              backgroundPosition: "top",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div className="flex flex-col items-center justify-center text-center px-30 py-10 w-[80%] gap-4 max-lg:px-10 max-lg:py-6 max-lg:w-full">
            <p className="font-[title] text-5xl font-bold max-md:text-[32px] max-md:px-0">
              Keep Your Car Running Smoothly
            </p>
            <p className="text-(--lightGrey)">
              Your car deserves expert care and easy access to its full service
              history. With your unique QR code, you can track repairs, schedule
              maintenance, and order authentic auto parts across Nigeria all in
              one place.
            </p>
            <div className="gap-4 flex">
              <CTA name="Repair Your Car" color="red" />
              <CTA name="Scan QR Code" color="blue" />
            </div>
          </div>
        </div>
        <footer className="px-30 py-10 bg-(--darkBlue)"></footer>
      </section>
    </>
  );
}

export default Footer;
