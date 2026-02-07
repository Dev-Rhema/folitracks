import { useOutletContext } from "react-router-dom";
import { imageUrls } from "../config/imageUrls";
import Container from "../components/Container";
import Brands from "../components/Brands";
import { ABOUTS } from "../components/Data";
import Stats from "../components/Stats";
import Footer from "../components/Footer";
import React from "react";
import FooterBanner from "../components/footerBanner";

function About() {
  const { onContactClick } = useOutletContext();
  return (
    <section>
      {/* ABOUT HERO */}
      <div className="relative h-screen">
        <div
          className={`w-full h-full -z-100 brightness-20 absolute inline-flex`}
          style={{
            backgroundImage: `url(${imageUrls.aboutHeroBg})`,
            backgroundPosition: "top",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
        <Container className="text-white text-center">
          <div className="flex flex-col gap-4 mt-10">
            <p className="font-[title] text-[64px] max-lg:text-[52px] font-bold  max-md:text-[48px] max-lg:leading-snug tracking-tight">
              Engineering Transparency Into Every Service
            </p>
            <p className="text-(--darkGrey) px-20 text-xl max-lg:text-lg max-md:text-[14px] max-md:px-0">
              We’re evolving vehicle maintenance in Nigeria — connecting vehicle
              repair and maintenance, real-time records, and reliable parts to
              keep every car running at its best.
            </p>
          </div>
        </Container>
      </div>
      {/* ABOUT HERO END */}
      {/* ABOUT */}
      <Container>
        <div className="flex flex-col gap-4">
          <p className="text-sm font-[title] font-black">WHY FOLITRACKS</p>
          <div className="grid grid-cols-2 gap-10 max-md:grid-cols-1 max-lg:gap-6">
            <p className="text-(--blue) text-[28px] max-lg:text-[24px] max-md:text-[20px]">
              We know maintaining your car in Nigeria can be stressful due to
              unreliable mechanics. Folitracks bridges that gap by bringing full
              transparency to your vehicle’s maintenance and repair
              history—keeping you in control of your car’s health.
            </p>
            <p className="text-lg text-(--black) max-lg:text-[16px]">
              Our mission is to make car maintenance simple and transparent for
              you. With expert in-house mechanics delivering premium service and
              evolving maintenance tracking that makes your vehicle’s full
              service history easily accessible on any device through its unique
              QR code, we ensure you stay informed every step of the way. We
              also make it easy to get genuine spare parts, no matter how rare
              or hard to find. We’re evolving vehicle maintenance — driven by
              data & powered by precision.
            </p>
          </div>
          <div className="">
            <img className="rounded-md" src={imageUrls.aboutMan} alt="" />
          </div>
        </div>
      </Container>
      {/* ABOUT END */}
      {/* BRANDS */}
      <Brands />
      {/* BRANDS END */}
      {/* BRINGING CLARITY */}
      <Container>
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl font-[title] font-black text-center max-md:text-[32px] px-20 max-lg:px-6 max-md:px-0">
            Bringing Clarity & Confidence to Car Maintenance
          </h1>
          <div className="grid grid-cols-2 gap-4 auto-rows-fr max-lg:grid-cols-1">
            {ABOUTS.map((about) => (
              <div
                key={about.id}
                className="flex nth-last-[1]:flex-row-reverse nth-last-[2]:flex-row-reverse gap-4 items-stretch max-md:grid max-md:nth-last-[1]:block max-md:nth-last-[2]:block max-md:items-center max-md:px-10"
              >
                <div className="w-1/2 max-md:w-full max-md:mb-4">
                  <img
                    src={about.img}
                    alt=""
                    className="w-full h-full object-cover rounded-3xl"
                  />
                </div>
                <div
                  className="w-1/2 max-md:w-full  p-4 rounded-3xl flex flex-col justify-between "
                  style={{ backgroundColor: about.bg, color: about.text }}
                >
                  <div className="flex flex-col gap-4">
                    <p className="text-[16px] font-bold">{about.title}</p>
                    <p className="text-sm">{about.subtitle}</p>
                  </div>
                  <p className="text-sm">Learn More ↗</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
      {/* BRINGING CLARITY END */}
      {/* STATS  */}
      <Stats />
      {/* STATS END */}
      {/* FOOTER */}
      <FooterBanner
        title="Schedule Your Next Service Today!"
        subTitle="Stay in control of your vehicle’s maintenance. Schedule a service today and experience car care that’s simple, transparent, and powered by precision."
        button1="Schedule Service"
        button1Color="red"
        img={imageUrls.ctaImg}
      />
      <Footer onContactClick={onContactClick} />
      {/* FOOTER END */}
    </section>
  );
}

export default About;
