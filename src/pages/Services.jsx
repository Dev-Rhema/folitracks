import Container from "../components/Container";
import { imageUrls } from "../config/imageUrls";
import Brands from "../components/Brands";
import { ABOUTS, OURSERVICES, PROBLEMS } from "../components/Data";
import Stats from "../components/Stats";
import Footer from "../components/Footer";
import React, { useEffect } from "react";
import FooterBanner from "../components/footerBanner";
import Header from "../components/Header";
import { useLocation, useOutletContext } from "react-router-dom";

function Services() {
  const location = useLocation();
  const { onContactClick } = useOutletContext();

  useEffect(() => {
    // Scroll to hash if present
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 0);
      }
    } else {
      // Scroll to top if no hash
      window.scrollTo(0, 0);
    }
  }, [location]);
  return (
    <section>
      {/* ABOUT HERO */}
      <div className="relative h-screen">
        <div
          className={`w-full h-full -z-100 brightness-20 absolute inline-flex`}
          style={{
            backgroundImage: `url(servicesHero.svg)`,
            backgroundPosition: "top",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
        <Container className="text-white text-center">
          <div className="flex flex-col gap-4 mt-10">
            <p className="font-[title] text-[64px] max-lg:text-[52px] font-bold  max-md:text-[48px] max-lg:leading-snug tracking-tight">
              Transforming Car Maintenance Into a Seamless Experience
            </p>
            <p className="text-(--darkGrey) px-20 text-xl max-lg:text-lg max-md:text-[14px] max-md:px-0">
              No more guesswork, unreliable mechanics, or lost records. With
              Folitracks, every service is tracked, every part is verified, and
              every car stays in peak condition effortlessly.
            </p>
          </div>
        </Container>
      </div>
      {/* ABOUT HERO END */}
      {/* ABOUT */}
      <Container>
        <div className="grid grid-cols-1 gap-6 max-md:grid-cols-1 max-lg:gap-6">
          <p className="text-(--black) text-[40px] max-lg:text-[24px] max-md:text-[20px]">
            We know what you’re dealing with...
          </p>
          <div className="grid grid-cols-2 max-lg:gap-10 max-md:grid-cols-1">
            <div>
              <div className="flex flex-col gap-2">
                {PROBLEMS.map((problem) => (
                  <p
                    key={problem.id}
                    className="text-lg text-(--blue) max-lg:text-[16px] border-b borber-(--blue)/30 pb-2 leading-snug"
                  >
                    {problem.text}
                  </p>
                ))}
              </div>
            </div>
            <div className="w-full flex items-center justify-end col-span-1 ">
              <img
                className="rounded-md max-md:w-full"
                src={imageUrls.serviceMan}
                alt=""
              />
            </div>
          </div>
          <p className="text-(--black) text-[40px] max-lg:text-[24px] max-md:text-[20px]">
            ...we are here to fix it.
          </p>
        </div>
      </Container>
      {/* ABOUT END */}
      {/* BRANDS */}
      <Brands />
      {/* BRANDS END */}
      {/* OUR SERVICES */}
      <Container>
        <div className="flex flex-col gap-6">
          <Header
            sub1="OUR SERVICES"
            title="Making Car Servicing Simple Transparent, and Stress-free."
          />
          <div className=" flex flex-col gap-12">
            {OURSERVICES.map((ourservice) => (
              <div
                key={ourservice.id}
                id={
                  ourservice.id === 1
                    ? "repair"
                    : ourservice.id === 2
                      ? "qr"
                      : ourservice.id === 3
                        ? "parts"
                        : "bodywork"
                }
                className="flex gap-20 justify-between items-center even:flex-row-reverse max-lg:even:flex-col max-lg:flex-col max-lg:gap-4 scroll-mt-20"
              >
                <div className="flex flex-col gap-2 w-1/2 max-lg:w-full">
                  <p className="text-[32px] font-[title] font-black">
                    {ourservice.title}
                  </p>
                  <p>{ourservice.para}</p>
                  <p className="text-[20px] font-bold">{ourservice.sub}</p>
                  <div className="grid-rows-5 grid-flow-col grid gap-2">
                    {ourservice.list?.map((listItem) => (
                      <div
                        key={listItem.id}
                        className="flex items-center gap-2 text-sm"
                      >
                        <img src={listItem.icon} alt="" />
                        <p>{listItem.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-1/2 max-lg:w-full">
                  <img src={ourservice.img} className="w-full" alt="" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
      {/* OUR SERVICES END */}
      {/* STATS  */}
      <Stats />
      {/* STATS END */}
      {/* FOOTER */}
      <FooterBanner
        title="Take Charge of Your Car’s Health Today!"
        subTitle="Register your vehicle, get your unique QR code, and enjoy full visibility into every service and repair all from one place."
        button1="Register Your Car"
        button1Color="red"
        button2="Scan QR Code"
        button2Color="blue"
        img="cta-img.svg"
      />
      <Footer onContactClick={onContactClick} />
      {/* FOOTER END */}
    </section>
  );
}

export default Services;
