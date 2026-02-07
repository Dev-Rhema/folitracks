// Cloudinary Image URLs Configuration
// Replace 'YOUR_CLOUD_NAME' with your actual Cloudinary cloud name
const CLOUD_NAME = 'dwzojroob';
const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1/folitracks`;

export const imageUrls = {
  // Logo
  logo: `${BASE_URL}/logo.svg`,

  // Service Icons
  repair: `${BASE_URL}/services/repair.svg`,
  qr: `${BASE_URL}/services/qr-code.svg`,
  parts: `${BASE_URL}/services/car-parts.svg`,
  paint: `${BASE_URL}/services/paint.svg`,

  // Brand Logos
  bmw: `${BASE_URL}/brands/BMW.svg`,
  ford: `${BASE_URL}/brands/Ford.svg`,
  hyundai: `${BASE_URL}/brands/Hyundai.svg`,
  kia: `${BASE_URL}/brands/kia.svg`,
  lexus: `${BASE_URL}/brands/Lexus.svg`,
  mercedes: `${BASE_URL}/brands/Mercedes.svg`,
  toyota: `${BASE_URL}/brands/Toyota.svg`,

  // How It Works Images
  how1: `${BASE_URL}/how-img/how1.svg`,
  how2: `${BASE_URL}/how-img/how2.svg`,
  how3: `${BASE_URL}/how-img/how3.svg`,
  how4: `${BASE_URL}/how-img/how4.png`,

  // About Section Cards
  aboutCard1: `${BASE_URL}/About/section/aboutCard1.svg`,
  aboutCard2: `${BASE_URL}/About/section/aboutCard2.svg`,
  aboutCard3: `${BASE_URL}/About/section/aboutCard3.svg`,
  aboutCard4: `${BASE_URL}/About/section/aboutCard4.svg`,

  // Service Page Icons
  commonService1: `${BASE_URL}/ServicesPage/serviceIcons/icon1.svg`,
  commonService2: `${BASE_URL}/ServicesPage/serviceIcons/icon2.svg`,
  commonService3: `${BASE_URL}/ServicesPage/serviceIcons/icon3.svg`,
  commonService4: `${BASE_URL}/ServicesPage/serviceIcons/icon4.svg`,
  commonService5: `${BASE_URL}/ServicesPage/serviceIcons/icon5.svg`,
  commonService6: `${BASE_URL}/ServicesPage/serviceIcons/icon6.svg`,
  commonService7: `${BASE_URL}/ServicesPage/serviceIcons/icon7.svg`,
  commonService8: `${BASE_URL}/ServicesPage/serviceIcons/icon8.svg`,
  commonService9: `${BASE_URL}/ServicesPage/serviceIcons/icon9.svg`,
  commonService10: `${BASE_URL}/ServicesPage/serviceIcons/icon10.svg`,
  checkIcon: `${BASE_URL}/ServicesPage/serviceIcons/check.svg`,

  // Service Cards
  serviceCard1: `${BASE_URL}/ServicesPage/section/serviceCard1.png`,
  serviceCard2: `${BASE_URL}/ServicesPage/section/serviceCard2.svg`,
  serviceCard3: `${BASE_URL}/ServicesPage/section/serviceCard3.svg`,
  serviceCard4: `${BASE_URL}/ServicesPage/section/serviceCard4.svg`,

  // Page Images
  heroImg: `${BASE_URL}/hero-img.svg`,
  ratingStars: `${BASE_URL}/RatingStars.svg`,
  arrowCircle: `${BASE_URL}/arrow-circle.svg`,
  avatar: `${BASE_URL}/Avatar.svg`,
  footerLogo: `${BASE_URL}/footer/footer-logo.svg`,

  // About & Services Page
  aboutMan: `${BASE_URL}/About/aboutMan.svg`,
  serviceMan: `${BASE_URL}/ServicesPage/servicesMan.svg`,

  // Footer Socials
  x: `${BASE_URL}/footer/socials/x.svg`,
  whatsapp: `${BASE_URL}/footer/socials/whatsapp.svg`,
  ig: `${BASE_URL}/footer/socials/ig.svg`,

  // Background Images (use as CSS background-image or img src)
  heroBg: `${BASE_URL}/hero-bg.svg`,
  aboutHeroBg: `${BASE_URL}/aboutHero.svg`,
  servicesHeroBg: `${BASE_URL}/servicesHero.svg`,
  ctaImg: `${BASE_URL}/cta-img.svg`,
};

export default imageUrls;
