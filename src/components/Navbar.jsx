import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SERVICES } from "./Data";
import repair from "../assets/images/services/repair.svg";
import qr from "../assets/images/services/qr-code.svg";
import parts from "../assets/images/services/car-parts.svg";
import paint from "../assets/images/services/paint.svg";
import logo from "../assets/images/logo.svg";

function Navbar({ onContactClick }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 md:py-4 w-full">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <img src={logo} alt="" />

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex gap-8 items-center">
            <Link
              to="/"
              className="text-gray-800 hover:text-blue-900 transition-colors duration-200 text-sm"
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setOpenDropdown("services")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <div className="flex items-center gap-1">
                <Link
                  to="/services"
                  className="text-gray-800 hover:text-blue-900 transition-colors duration-200 text-sm"
                >
                  Services
                </Link>
                <button
                  onClick={() => toggleDropdown("services")}
                  className="text-gray-800 hover:text-blue-900 transition-colors duration-200 text-sm p-1"
                >
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${openDropdown === "services" ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 9l6 6 6-6"
                    />
                  </svg>
                </button>
              </div>
              {openDropdown === "services" && (
                <div className="absolute top-full left-0 pt-2 bg-white border border-gray-200 rounded-md shadow-lg min-w-56 animate-fadeIn z-50">
                  <Link
                    to="/#services"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-sm transition-colors duration-200"
                  >
                    <img src={repair} alt="repair" className="w-5 h-5" />
                    Car Repairs & Maintenance
                  </Link>
                  <Link
                    to="/#services"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-sm transition-colors duration-200"
                  >
                    <img src={qr} alt="qr" className="w-5 h-5" />
                    Service History via QR Code
                  </Link>
                  <Link
                    to="/#services"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-sm transition-colors duration-200"
                  >
                    <img src={parts} alt="parts" className="w-5 h-5" />
                    Spare Parts Sales
                  </Link>
                  <Link
                    to="/#services"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-sm transition-colors duration-200"
                  >
                    <img src={paint} alt="paint" className="w-5 h-5" />
                    Body Work & Paint Jobs
                  </Link>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setOpenDropdown("resources")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                onClick={() => toggleDropdown("resources")}
                className="text-gray-800 hover:text-blue-900 transition-colors duration-200 flex items-center gap-1 text-sm"
              >
                Resources
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${openDropdown === "resources" ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 9l6 6 6-6"
                  />
                </svg>
              </button>
              {openDropdown === "resources" && (
                <div className="absolute top-full left-0 pt-2 bg-white border border-gray-200 rounded-md shadow-lg min-w-56 animate-fadeIn z-50">
                  <Link
                    to="/#how-it-works"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-sm transition-colors duration-200"
                  >
                    <svg
                      className="w-5 h-5 text-gray-700"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                    </svg>
                    <span>How it Works</span>
                  </Link>
                  <Link
                    to="/#testimonials"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-sm transition-colors duration-200"
                  >
                    <svg
                      className="w-5 h-5 text-gray-700"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2l-2.81 6.63L2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <span>Testimonials</span>
                  </Link>
                  <Link
                    to="/#faq"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-sm transition-colors duration-200"
                  >
                    <svg
                      className="w-5 h-5 text-gray-700"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />
                    </svg>
                    <span>FAQs</span>
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/about"
              className="text-gray-800 hover:text-blue-900 transition-colors duration-200 text-sm"
            >
              About Us
            </Link>
          </div>

          {/* Desktop Contact Button */}
          <button
            onClick={onContactClick}
            className="hidden lg:block bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800 transition-colors duration-200 text-sm cursor-pointer"
          >
            Contact Us
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex flex-col gap-1"
          >
            <div
              className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            ></div>
          </button>
        </div>

        {/* Backdrop Overlay */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className={`lg:hidden fixed inset-0 top-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          style={{ top: "0px" }}
        />

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed left-0 right-0 top-0 h-screen bg-white overflow-y-auto transition-all duration-300 ease-in-out z-40 ${mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-1">
              <div className="w-6 h-6 bg-red-600 rounded-full transform rotate-45 flex items-center justify-center flex-shrink-0">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span className="font-bold text-lg">
                <span className="text-blue-900">FOLIT</span>
                <span className="text-red-600">RACKS</span>
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-800 hover:text-gray-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <div className="px-4 py-6 flex flex-col gap-4">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-800 hover:text-blue-900 transition-colors duration-200 py-3 px-4 text-lg font-medium bg-blue-100 rounded-lg"
            >
              Home
            </Link>

            {/* Mobile Services Dropdown */}
            <div>
              <div className="flex items-center justify-between">
                <Link
                  to="/services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-gray-800 hover:text-blue-900 transition-colors duration-200 py-3 px-4 text-lg font-medium"
                >
                  Services
                </Link>
                <button
                  onClick={() => toggleDropdown("services")}
                  className="text-gray-800 hover:text-blue-900 transition-colors duration-200 px-4 py-3"
                >
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${openDropdown === "services" ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 9l6 6 6-6"
                    />
                  </svg>
                </button>
              </div>
              {openDropdown === "services" && (
                <div className="pl-4 flex flex-col gap-3 py-3 animate-slideDown">
                  <Link
                    to="/#services"
                    onClick={() => {
                      setOpenDropdown(null);
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 text-gray-700 hover:text-blue-900 text-sm transition-colors duration-200 py-2"
                  >
                    <img
                      src={repair}
                      alt="repair"
                      className="w-5 h-5 shrink-0"
                    />
                    Car Repairs & Maintenance
                  </Link>
                  <Link
                    to="/#services"
                    onClick={() => {
                      setOpenDropdown(null);
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 text-gray-700 hover:text-blue-900 text-sm transition-colors duration-200 py-2"
                  >
                    <img src={qr} alt="qr" className="w-5 h-5 shrink-0" />
                    Service History via QR Code
                  </Link>
                  <Link
                    to="/#services"
                    onClick={() => {
                      setOpenDropdown(null);
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 text-gray-700 hover:text-blue-900 text-sm transition-colors duration-200 py-2"
                  >
                    <img src={parts} alt="parts" className="w-5 h-5 shrink-0" />
                    Spare Parts Sales
                  </Link>
                  <Link
                    to="/#services"
                    onClick={() => {
                      setOpenDropdown(null);
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 text-gray-700 hover:text-blue-900 text-sm transition-colors duration-200 py-2"
                  >
                    <img src={paint} alt="paint" className="w-5 h-5 shrink-0" />
                    Body Work & Paint Jobs
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Resources Dropdown */}
            <div>
              <button
                onClick={() => toggleDropdown("resources")}
                className="w-full text-left text-gray-800 hover:text-blue-900 transition-colors duration-200 py-3 px-4 text-lg font-medium flex items-center justify-between"
              >
                Resources
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${openDropdown === "resources" ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 9l6 6 6-6"
                  />
                </svg>
              </button>
              {openDropdown === "resources" && (
                <div className="pl-4 flex flex-col gap-3 py-3 animate-slideDown">
                  <Link
                    to="/#how-it-works"
                    onClick={() => {
                      setOpenDropdown(null);
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 text-gray-700 hover:text-blue-900 text-sm transition-colors duration-200 py-2"
                  >
                    <svg
                      className="w-5 h-5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                    </svg>
                    How it Works
                  </Link>
                  <Link
                    to="/#testimonials"
                    onClick={() => {
                      setOpenDropdown(null);
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 text-gray-700 hover:text-blue-900 text-sm transition-colors duration-200 py-2"
                  >
                    <svg
                      className="w-5 h-5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2l-2.81 6.63L2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    Testimonials
                  </Link>
                  <Link
                    to="/#faq"
                    onClick={() => {
                      setOpenDropdown(null);
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 text-gray-700 hover:text-blue-900 text-sm transition-colors duration-200 py-2"
                  >
                    <svg
                      className="w-5 h-5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />
                    </svg>
                    FAQs
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-800 hover:text-blue-900 transition-colors duration-200 py-3 px-4 text-lg font-medium"
            >
              About Us
            </Link>
          </div>

          {/* Footer with Contact Button */}
          <div className="px-4 py-4 border-t border-gray-200 mt-auto sticky bottom-0 bg-white">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onContactClick();
              }}
              className="w-full bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors duration-200 text-base font-medium cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
