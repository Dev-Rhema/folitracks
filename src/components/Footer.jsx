import React from "react";
import Container from "./Container";
import CTA from "./CTA";
import footerLogo from "../assets/images/footer/footer-logo.svg?url";
// import location from "../assets/images/footer/location.svg?url";
// import mail from "../assets/images/footer/mail.svg";
import x from "../assets/images/footer/socials/x.svg";
import whatsapp from "../assets/images/footer/socials/whatsapp.svg";
import ig from "../assets/images/footer/socials/ig.svg";

const SERVICES = [
  {
    id: 1,
    name: "Car Repairs & Maintenance",
  },
  {
    id: 2,
    name: "Service History via QR Code",
  },
  {
    id: 3,
    name: "Spare Parts Sales",
  },
  {
    id: 4,
    name: "Body Work & Paint Jobs",
  },
];
const RESOURCES = [
  {
    id: 1,
    name: "How It Works",
    href: "#",
  },
  {
    id: 2,
    name: "FAQs",
    href: "#",
  },
  {
    id: 3,
    name: "Testimonials",
    href: "#",
  },
];
const COMPANY = [
  {
    id: 1,
    name: "About Us",
    href: "#",
  },
  {
    id: 2,
    name: "Contact Us",
    href: "#",
  },
];
const CONTACTS = [
  {
    id: 1,
    name: "Lekki Phase 1, Lagos, Nigeria.",
    // img: location,
  },
  {
    id: 2,
    name: "support@folitracks.com",
    // img: mail,
  },
];

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
          <div className="flex flex-col items-center justify-center text-center xl:px-30 py-10 w-[80%] gap-4 px-10 max-md:px-4  max-lg:py-6 max-lg:w-full">
            <p className="font-[title] text-5xl font-bold max-md:text-[32px] max-md:px-0">
              Keep Your Car Running Smoothly
            </p>
            <p className="text-(--lightGrey)">
              Your car deserves expert care and easy access to its full service
              history. With your unique QR code, you can track repairs, schedule
              maintenance, and order authentic auto parts across Nigeria all in
              one place.
            </p>
            <div className="gap-4 flex justify-center max-md:flex-col max-lg:gap-2 w-full">
              <CTA name="Repair Your Car" color="red" />
              <CTA name="Scan QR Code" color="blue" />
            </div>
          </div>
        </div>
        <footer className="xl:px-30 px-10 max-md:px-4 py-10 bg-(--darkBlue) max-md:">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-(--white)">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <img src={footerLogo} alt="" />
              </div>
              <p className="  text-sm leading-relaxed">
                Maintenance Evolved: Driven by Data. Powered by Precision.
              </p>
              <div className="flex space-x-5 pt-2">
                <a
                  href="#"
                  className=" hover:text-blue-600 transition-transform transform hover:scale-110"
                >
                  <img src={x} alt="" />
                </a>
                <a
                  href="#"
                  className=" hover:text-blue-600 transition-transform transform hover:scale-110"
                >
                  <img src={whatsapp} alt="" />
                </a>
                <a
                  href="#"
                  className=" hover:text-blue-600 transition-transform transform hover:scale-110"
                >
                  <img src={ig} alt="" />
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-(--white) ">SERVICES</h3>
              <ul className="space-y-3 text-sm">
                {SERVICES.map((service) => (
                  <li key={service.id}>{service.name}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold  ">RESOURCES</h3>
              <ul className="space-y-3 text-sm">
                {RESOURCES.map((resource) => (
                  <li key={resource.id}>{resource.name}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold  ">COMPANY</h3>
              <ul className="space-y-3 text-sm">
                {COMPANY.map((comp) => (
                  <li key={comp.id}>{comp.name}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-4 text-sm">
              {CONTACTS.map((contact) => (
                <div key={contact.id} className="flex gap-2">
                  {/* <img src={contact.img} alt="" /> */}
                  <p>{contact.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center  text-gray-600 text-sm pt-10 mt-10 border-t border-gray-900  max-md:flex-col max-md:gap-2">
            <p>
              &copy; {new Date().getFullYear()} FOLITRACKS. All rights reserved.
            </p>
            <div>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of service</a>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
}

export default Footer;
