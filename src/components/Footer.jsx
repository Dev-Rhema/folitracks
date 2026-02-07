import React from "react";
import { Link } from "react-router-dom";
import Container from "./Container";
import CTA from "./CTA";
import footerLogo from "../assets/images/footer/footer-logo.svg?url";
// import location from "../assets/images/footer/location.svg?url";
// import mail from "../assets/images/footer/mail.svg";
import x from "../assets/images/footer/socials/x.svg";
import whatsapp from "../assets/images/footer/socials/whatsapp.svg";
import ig from "../assets/images/footer/socials/ig.svg";
import FooterBanner from "./footerBanner";

const SERVICES = [
  {
    id: 1,
    name: "Car Repairs & Maintenance",
    href: "/#services",
  },
  {
    id: 2,
    name: "Service History via QR Code",
    href: "/#services",
  },
  {
    id: 3,
    name: "Spare Parts Sales",
    href: "/#services",
  },
  {
    id: 4,
    name: "Body Work & Paint Jobs",
    href: "/#services",
  },
];
const RESOURCES = [
  {
    id: 1,
    name: "How It Works",
    href: "/#how-it-works",
  },
  {
    id: 2,
    name: "FAQs",
    href: "/#faq",
  },
  {
    id: 3,
    name: "Testimonials",
    href: "/#testimonials",
  },
];
const COMPANY = [
  {
    id: 1,
    name: "About Us",
    href: "/about",
  },
  {
    id: 2,
    name: "Contact Us",
    isButton: true,
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

function Footer({ onContactClick }) {
  return (
    <>
      <section>
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
                  <li key={service.id}>
                    <Link
                      to={service.href}
                      className="hover:text-blue-400 transition-colors duration-200"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold  ">RESOURCES</h3>
              <ul className="space-y-3 text-sm">
                {RESOURCES.map((resource) => (
                  <li key={resource.id}>
                    <Link
                      to={resource.href}
                      className="hover:text-blue-400 transition-colors duration-200"
                    >
                      {resource.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold  ">COMPANY</h3>
              <ul className="space-y-3 text-sm">
                {COMPANY.map((comp) => (
                  <li key={comp.id}>
                    {comp.isButton ? (
                      <button
                        onClick={onContactClick}
                        className="hover:text-blue-400 transition-colors duration-200 bg-none border-none cursor-pointer text-left"
                      >
                        {comp.name}
                      </button>
                    ) : (
                      <Link
                        to={comp.href}
                        className="hover:text-blue-400 transition-colors duration-200"
                      >
                        {comp.name}
                      </Link>
                    )}
                  </li>
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
            <div className="space-x-6">
              <Link
                to="/policy"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Terms of service
              </Link>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
}

export default Footer;
