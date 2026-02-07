import { imageUrls } from "../config/imageUrls";
import CTA from "../components/CTA";
import Container from "../components/Container";
import { HOWS, STATS, SERVICES, BRANDS } from "../components/Data.jsx";
import Header from "../components/Header.jsx";
import Stats from "../components/Stats.jsx";
import Footer from "../components/Footer.jsx";
import Faqs from "../components/Faq.jsx";
import Brands from "../components/Brands.jsx";
import React, { useEffect } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import FooterBanner from "../components/footerBanner.jsx";

function Home() {
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
    <section className="h-screen max-lg:h-full relative">
      <div
        className="absolute top-0 left-0 w-full  h-screen"
        style={{
          backgroundImage: `url(${imageUrls.heroBg})`,
          backgroundPosition: "top",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* HERO */}
      <div className="h-full w-full inline-flex xl:pl-30  pl-10 max-lg:flex max-lg:flex-col max-lg:static max-lg:px-10 tracking-tight max-md:px-4 max-md:py-12">
        <div className=" flex flex-col gap-2 w-[60%] justify-center max-lg:w-full max-lg:justify-center max-lg:text-center max-lg:mb-6 max-md:mb-4">
          <p className="text-(--red) text-sm ">
            QR-ENABLED VEHICLE SERVICE SYSTEM
          </p>
          <p className="text-[56px] font-bold leading-tight tracking-tight max-md:text-[40px]">
            Innovative Vehicle Care Solutions Tailored for You
          </p>
          <p className="text-[20px]">
            Your one-stop workshop for repairs, maintenance, spare parts sales —
            with QR-enabled records that give you instant access to your
            vehicle’s complete service history.
          </p>
          <div className="flex gap-4 max-lg:gap-2 max-lg:justify-center max-md:flex-col">
            <CTA color="red" name="Repair Your Car" />
            <CTA color="blue" name="Scan QR Code" />
          </div>
        </div>
        <div className="flex justify-end bottom-0 right-0 absolute max-lg:static max-lg:justify-center">
          <img
            src={imageUrls.heroImg}
            alt=""
            className="xl:w-full w-[80%] max-lg:w-[60%]"
          />
        </div>
      </div>
      {/* HERO END */}
      {/* STATS */}
      <Stats />
      {/* STATS END */}
      {/* HOW WE HELP */}
      <Container>
        <Header
          sub1="HOW WE HELP"
          title="Our Services"
          sub2="Your one-stop workshop for repairs, maintenance, sales, and shipping — with QR-enabled records that give you instant access to your vehicle’s complete service history."
        />
        <div
          id="services"
          className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1 scroll-mt-20"
        >
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className=" grid gap-2 outline border-t-6 rounded-3xl p-4"
              style={{
                outlineColor: service.color,
                borderTopColor: service.color,
              }}
            >
              <img src={service.img} alt="" />
              <p className="font-[title] font-black text-xl">{service.title}</p>
              <p className="text-(--grey) text-[16px] ">{service.body}</p>
            </div>
          ))}
        </div>
      </Container>
      {/* HOW WE HELP END */}
      {/* BRANDS */}
      <Brands />
      {/* BRANDS END */}
      {/* HOW IT WORKS */}
      <Container>
        <Header
          sub1="HOW IT WORKS"
          title="Experience Seamless Vehicle Service Management"
          sub2="With a unique QR-enabled service profile, you can track, access, and manage your vehicle’s health in just a few easy steps."
          className=""
        />
        <div
          id="how-it-works"
          className="flex flex-col xl:gap-4 gap-2 max-md:gap-1 scroll-mt-20"
        >
          {HOWS.map((how) => (
            <div
              key={how.id}
              className="flex justify-between items-center gap-6 max-md:flex-col max-md:gap-0"
            >
              <div className="flex items-center  relative w-1/2 max-md:w-full">
                <p className="text-(--red)/12 font-[number] text-[300px] max-lg:text-[260px] leading-snug max-md:text-[220px]">
                  {how.id}
                </p>
                <div className="inline flex-col absolute left-16 max-md:left-8">
                  <p className="text-[32px] font-black font-[title] mb-2 max-lg:text-[28px]">
                    {how.title}
                  </p>
                  <p className="text-[18px] mb-4 max-lg:text-sm">{how.body}</p>
                  {how.btn && (
                    <p className="text-[16px] px-6 py-3 font-[body] text-(--white) bg-(--red) inline rounded-md ">
                      {how.btn}
                    </p>
                  )}
                </div>
              </div>
              <div className="w-1/2 max-md:w-full">
                <img src={how.img} alt="" className="rounded-md w-full" />
              </div>
            </div>
          ))}
        </div>
      </Container>
      {/* HOW IT WORKS END */}
      {/* REVIEW */}
      <Container
        id="testimonials"
        className="bg-(--darkBlue) text-white scroll-mt-20"
      >
        <div className="text-center flex flex-col px-30 gap-y-2 max-lg:p-10 max-md:px-0 py-10">
          <div className="text-center  flex items-center justify-center">
            <img src={imageUrls.ratingStars} alt="" />
          </div>
          <p className="text-[56px]  text-white font-[title] text-center font-bold leading-snug max-lg:text-[48px] max-md:text-[32px]">
            “I never thought car repairs could feel this transparent.”
          </p>
          <p className="text-[#C0C0CC] max-md:text-[16px]">
            Before discovering FoliTracks, I was always worried about whether
            mechanics were telling me the full story. Now, every detail of my
            car’s service history is available through a simple QR code scan. I
            know what was fixed, when it was fixed, and when my next maintenance
            is due. It gives me peace of mind every time I drive.
          </p>
          <div className="flex items-center justify-center gap-2">
            <img src={imageUrls.avatar} alt="" />
            <div className="flex flex-col text-left">
              <p className="text-lg">Adedeji Boluwatife</p>
              <p className="text-(--lightGrey)">Car Owner</p>
            </div>
          </div>
        </div>
      </Container>
      {/* REVIEW END */}
      {/* FAQS */}
      <Container>
        <Header
          sub1="FAQS"
          title="Frequently Asked Questions"
          sub2="Find quick answers to common questions about our services, service tracking, and the QR Code system. If you still need help, our team is always ready to assist."
        />
        <div id="faq" className="scroll-mt-20">
          <Faqs />
        </div>

        <div className="flex gap-1 text-center w-full items-center justify-center mt-4">
          <p>Can’t find the answer you’re looking for?</p>
          <button
            onClick={onContactClick}
            className="text-(--red) bg-none border-none cursor-pointer hover:underline"
          >
            Contact Us
          </button>
        </div>
      </Container>
      {/* FAQS END */}
      {/* FOOTER  */}
      <FooterBanner
        title="Keep Your Car Running Smoothly"
        subTitle="Your car deserves expert care and easy access to its full service
          history. With your unique QR code, you can track repairs, schedule
          maintenance, and order authentic auto parts across Nigeria all in one
          place."
        button1="Register Your Car"
        button1Color="red"
        button2="Scan QR Code"
        button2Color="blue"
        img={imageUrls.ctaImg}
      />
      <Footer onContactClick={onContactClick} />
      {/* FOOTER END */}
    </section>
  );
}

export default Home;
