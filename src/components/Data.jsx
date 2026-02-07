import repair from "../assets/images/services/repair.svg";
import qr from "../assets/images/services/qr-code.svg";
import parts from "../assets/images/services/car-parts.svg";
import paint from "../assets/images/services/paint.svg";
import bmw from "../assets/images/brands/BMW.svg";
import ford from "../assets/images/brands/Ford.svg";
import hyundai from "../assets/images/brands/Hyundai.svg";
import kia from "../assets/images/brands/kia.svg";
import lexus from "../assets/images/brands/Lexus.svg";
import mercedes from "../assets/images/brands/Mercedes.svg";
import toyota from "../assets/images/brands/Toyota.svg";
import how1 from "../assets/images/how-img/how1.svg";
import how2 from "../assets/images/how-img/how2.svg";
import how3 from "../assets/images/how-img/how3.svg";
import how4 from "../assets/images/how-img/how4.svg";
import aboutCard1 from "../assets/images/About/section/aboutCard1.svg";
import aboutCard2 from "../assets/images/About/section/aboutCard2.svg";
import aboutCard3 from "../assets/images/About/section/aboutCard3.svg";
import aboutCard4 from "../assets/images/About/section/aboutCard4.svg";
import commonService1 from "../assets/images/ServicesPage/serviceIcons/icon1.svg";
import commonService2 from "../assets/images/ServicesPage/serviceIcons/icon2.svg";
import commonService3 from "../assets/images/ServicesPage/serviceIcons/icon3.svg";
import commonService4 from "../assets/images/ServicesPage/serviceIcons/icon4.svg";
import commonService5 from "../assets/images/ServicesPage/serviceIcons/icon5.svg";
import commonService6 from "../assets/images/ServicesPage/serviceIcons/icon6.svg";
import commonService7 from "../assets/images/ServicesPage/serviceIcons/icon7.svg";
import commonService8 from "../assets/images/ServicesPage/serviceIcons/icon8.svg";
import commonService9 from "../assets/images/ServicesPage/serviceIcons/icon9.svg";
import commonService10 from "../assets/images/ServicesPage/serviceIcons/icon10.svg";
import checkIcon from "../assets/images/ServicesPage/serviceIcons/check.svg";
import serviceCard1 from "../assets/images/ServicesPage/section/serviceCard1.svg";
import serviceCard2 from "../assets/images/ServicesPage/section/serviceCard2.svg";
import serviceCard3 from "../assets/images/ServicesPage/section/serviceCard3.svg";
import serviceCard4 from "../assets/images/ServicesPage/section/serviceCard4.svg";

export const HOWS = [
  {
    id: 1,
    title: "Register Your Vehicle",
    body: "Create your account and register your car in just a few clicks. Each vehicle gets a unique QR code linked to its service profile.",
    btn: "Register Your Car",
    img: how1,
  },
  {
    id: 2,
    title: "Access via QR Code",
    body: "Scan or upload your car’s QR code anytime to instantly view its service history, repair details, and upcoming maintenance needs.",
    btn: "Scan QR Code",
    img: how2,
  },
  {
    id: 3,
    title: "View and Track Your Service History",
    body: "Each time your car is serviced, the details are automatically added by our team. You can view your complete maintenance history anytime and track upcoming or overdue services.",
    img: how3,
  },
  {
    id: 4,
    title: "Set Maintenance Reminders",
    body: "Never miss a service again. Set automatic reminders for upcoming services and periodic checkups to keep your car running smoothly.",
    img: how4,
  },
];

export const BRANDS = [
  {
    id: 1,
    img: mercedes,
  },
  {
    id: 2,
    img: toyota,
  },
  {
    id: 3,
    img: lexus,
  },
  {
    id: 4,
    img: bmw,
  },
  {
    id: 5,
    img: ford,
  },
  {
    id: 6,
    img: hyundai,
  },
  {
    id: 7,
    img: kia,
  },
];

export const STATS = [
  {
    id: 1,
    num: "450+",
    text: "Vehicles Serviced",
  },
  {
    id: 2,
    num: "98.9%",
    text: "Customer Satisfaction Rate",
  },
  {
    id: 3,
    num: "350+",
    text: "Car Parts Sold",
  },
];

export const SERVICES = [
  {
    id: 1,
    img: repair,
    title: "Car Repair & Maintenance",
    body: "Keep your car running smoothly with expert repairs and regular servicing in Lagos. From oil changes to diagnostics and suspension work, our certified mechanics ensure your vehicle stays reliable on the road.",
    color: "#F59E0B",
  },
  {
    id: 2,
    img: qr,
    title: "Service History Record via QR Code",
    body: "Track every service, repair, and maintenance update in one place. Your car’s complete digital record is accessible anytime, anywhere through your unique QR code—making vehicle management transparent.",
    color: "#1FA750",
  },
  {
    id: 3,
    img: parts,
    title: "Spare Parts Sales & Shipping",
    body: "Get genuine spare parts for any car brand, including rare and hard-to-find components. We source quality parts and deliver across Nigeria to keep your car in top condition without stress.",
    color: "#3B82F6",
  },
  {
    id: 4,
    img: paint,
    title: "Body Work & Paint Jobs",
    body: "Restore your vehicle’s look with premium body repair and professional paint jobs. Whether it’s fixing dents, scratches, or a full respray, we deliver factory-finish results that make your car look brand new.",
    color: "#FF0000",
  },
];

export const ABOUTS = [
  {
    id: 1,
    title: "Expert Car Repair & Maintenance in Lagos",
    subtitle:
      "Get premium car repair and maintenance from trusted in-house mechanics in Lagos. Every service is handled with precision, transparency, and genuine expertise to keep your vehicle performing at its best.",
    img: aboutCard1,
    bg: "#000038",
    text: "#E6E6F0",
  },
  {
    id: 2,
    title: "Digitized Service Records with Smart QR Access",
    subtitle:
      "Your car’s full maintenance history is securely stored and accessible through a unique QR code. View every service record anytime, anywhere—bringing complete transparency to your vehicle’s care.",
    img: aboutCard2,
    bg: "#E6E6F0",
    text: "#000038",
  },
  {
    id: 3,
    title: "Genuine Spare Parts, Delivered Nationwide",
    subtitle:
      "Find and order original car parts with confidence. From common replacements to rare components, Folitracks ensures fast, reliable access to genuine spare parts anywhere in Nigeria.",
    img: aboutCard3,
    bg: "#E6E6F0",
    text: "#000038",
  },
  {
    id: 4,
    title: "Premium Body Work & Paint Jobs",
    subtitle:
      "Restore your car’s look with precision body work and factory-quality paint jobs. Our team handles everything from dents to full resprays with the same care your car deserves.",
    img: aboutCard4,
    bg: "#000038",
    text: "#E6E6F0",
  },
];

export const PROBLEMS = [
  {
    id: 1,
    text: "Tired of unreliable mechanics who fix one thing and cause another problem a week later?",
  },
  {
    id: 2,
    text: "Own more than one vehicle and finding it hard to keep track of their servicing?",
  },
  {
    id: 3,
    text: "Wish you could see your car’s full maintenance history in one place with upcoming and overdue services?",
  },
  {
    id: 4,
    text: "Struggling to find genuine spare parts or trusted workshops that won’t overcharge you?",
  },
  {
    id: 5,
    text: "Frustrated by the lack of transparency when your car goes in for repair or maintenance?",
  },
];

export const OURSERVICES = [
  {
    id: 1,
    title: "Trusted Car Repairs and Routine Servicing in Lagos",
    img: serviceCard1,
    para: "Service your car in Lagos with top-rated mechanics who get it right the first time. From routine checks to full repairs, we ensure your car runs smoothly and reliably.",
    sub: "Common services:",
    list: [
      {
        id: 1,
        name: "Engine Checks & Replacement",
        icon: commonService1,
      },
      {
        id: 2,
        name: "Oil Change & Filter Replacement",
        icon: commonService2,
      },
      {
        id: 3,
        name: "Exhaust System Service",
        icon: commonService3,
      },
      {
        id: 4,
        name: "Brake Inspection & Repair",
        icon: commonService4,
      },
      {
        id: 5,
        name: "Air Conditioning Services",
        icon: commonService5,
      },
      {
        id: 6,
        name: "Battery Check & Replacement",
        icon: commonService6,
      },
      {
        id: 7,
        name: "Shock Absorber & Suspension Repair",
        icon: commonService7,
      },
      {
        id: 8,
        name: "Wheel Alignment & Balancing",
        icon: commonService8,
      },
      {
        id: 9,
        name: "Electrical & Lighting Issues",
        icon: commonService9,
      },
      {
        id: 10,
        name: "Diagnostics Scan..... and more",
        icon: commonService10,
      },
    ],
  },
  {
    id: 2,
    title: "Your Car’s Complete Service Record Always Within Reach",
    img: serviceCard2,
    para: "Register your car on Folitracks to access your full maintenance history anytime. Your vehicle’s unique QR code keeps every detail organized and easy to find.",
    sub: "What You Get:",
    list: [
      {
        id: 1,
        name: "Complete service history with upcoming and overdue alerts",
        icon: checkIcon,
      },
      {
        id: 2,
        name: "Automatic next-service calculator",
        icon: checkIcon,
      },
      {
        id: 3,
        name: "Multiple vehicle management in one dashboard",
        icon: checkIcon,
      },
      {
        id: 4,
        name: "Service reminders and notifications",
        icon: checkIcon,
      },
      {
        id: 5,
        name: "Accessibility across all devices",
        icon: checkIcon,
      },
    ],
  },
  {
    id: 3,
    title: "Get Quality Spare Parts Without the Stress",
    img: serviceCard3,
    para: "We make it easy to find and order genuine spare parts for any car model — even the rare ones. With our trusted network of suppliers, you’ll never worry about fake or low-quality parts again. Order with confidence and enjoy fast delivery anywhere in Nigeria.",
  },
  {
    id: 4,
    title: "Restore Your Car’s Look with Precision and Care",
    img: serviceCard4,
    para: "From panel beating to full-body resprays, our experts handle every detail to perfection. We use premium materials and modern techniques to ensure your car looks brand new again. Drive out with a flawless finish that reflects true craftsmanship.",
  },
];

export const TERMS = [
  {
    id: 1,
    title: "Agreement to Terms ",
    para: "By scanning a FoliTracks QR code, creating an account, or using our services, you agree to these Terms and Conditions.",
  },
  {
    id: 2,
    title: "Service Overview",
    para: "FoliTracks is a digital platform that helps vehicle owners and service centers manage automobile maintenance records using QR technology.",
  },
  {
    id: 3,
    title: "User Obligations ",
    para: "You agree to:",
    list: [
      { id: 1, text: "Provide accurate and complete information." },
      { id: 2, text: "Keep your login credentials secure." },
      { id: 3, text: "Use FoliTracks lawfully and ethically." },
      {
        id: 4,
        text: "Ensure that maintenance entries are truthful and verifiable.",
      },
    ],
  },
  {
    id: 4,
    title: "Intellectual Property",
    para: "All software, designs, and trademarks on FoliTracks are owned by FoliTracks or its licensors. You may not copy, modify, or distribute any content without written permission.",
  },
  {
    id: 5,
    title: "Service Availability",
    para: "FoliTracks strives to maintain consistent service but does not guarantee uninterrupted access. We may suspend access temporarily for updates or system maintenance.",
  },
  {
    id: 6,
    title: "Limitation of Liability",
    para: "FoliTracks is not liable for:",
    list: [
      {
        id: 1,
        text: "Errors in maintenance data submitted by users or service providers.",
      },
      { id: 2, text: "Losses resulting from downtime or technical failures." },
      {
        id: 3,
        text: "Indirect or incidental damages beyond our reasonable control.",
      },
    ],
  },
  {
    id: 7,
    title: "Account Suspension and Termination",
    para: "We may suspend or terminate accounts that violate these terms or engage in misuse of the platform.",
  },
  {
    id: 8,
    title: "Changes to Terms",
    para: "We may revise these Terms from time to time. Continued use of FoliTracks after updates means you accept the new Terms.",
  },
  {
    id: 9,
    title: "Governing Law",
    para: "These Terms are governed by the laws of the Federal Republic of Nigeria. Any dispute shall be resolved in accordance with Nigerian law in the courts of competent jurisdiction..",
  },
  {
    id: 10,
    title: "Contact Information",
    para: "For questions or complaints, contact us at: support@folitracks.com",
  },
];

export const POLICIES = [
  {
    id: 1,
    title: "Introduction",
    para: "FoliTracks respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, and share information when you use our QR-enabled automobile maintenance system.",
  },
  {
    id: 2,
    title: "Information We Collect",
    para: "We collect the following types of data:",
    list: [
      {
        id: 1,
        text: "Personal Information: Name, phone number, email, and vehicle registration details.",
      },
      {
        id: 2,
        text: "Vehicle and Maintenance Data: Service dates, mileage, parts replaced, and service center information.",
      },
      {
        id: 3,
        text: "Usage Data: QR scans, login records, and activity logs.",
      },
      {
        id: 4,
        text: "Technical Data: Device type, IP address, and browser information.",
      },
    ],
  },
  {
    id: 3,
    title: "Purpose of Data Collection",
    para: "We process your data to:",
    list: [
      {
        id: 1,
        text: "Register and manage your FoliTracks account.",
      },
      {
        id: 2,
        text: "Record and retrieve maintenance history.",
      },
      {
        id: 3,
        text: "Send maintenance reminders and updates.",
      },
      {
        id: 4,
        text: "Improve service delivery and security.",
      },
      {
        id: 5,
        text: "Comply with legal and regulatory obligations.",
      },
    ],
  },
  {
    id: 4,
    title: "Data Sharing and Disclosure",
    para: "We may share data only with:",
    list: [
      {
        id: 1,
        text: "Authorized Service Providers involved in vehicle maintenance.",
      },
      {
        id: 2,
        text: "Cloud Hosting Partners for secure data storage.",
      },
      {
        id: 3,
        text: "Regulatory Authorities where required by law. FoliTracks does not sell or lease personal data to any third party.",
      },
    ],
  },
  {
    id: 5,
    title: "Data Storage and Security",
    para: "Your information is stored on secure servers located within and outside Nigeria, following NDPR data transfer rules. We use encryption, firewalls, and access controls to protect your data from unauthorized access or loss.",
  },
  {
    id: 6,
    title: "Data Retention",
    para: "We retain data only as long as your account is active or as required by law. For questions or complaints, contact us at: support@folitracks.com",
  },
  {
    id: 7,
    title: "Your Rights Under Nigerian Law",
    para: "You have the right to:",
    list: [
      {
        id: 1,
        text: "Access and obtain a copy of your personal data.",
      },
      {
        id: 2,
        text: "Request correction of inaccurate information.",
      },
      {
        id: 3,
        text: "Request deletion or restriction of processing.",
      },
      {
        id: 4,
        text: "Withdraw consent for optional communications.       To exercise your rights, contact us at: support@folitracks.com",
      },
    ],
  },
  {
    id: 8,
    title: "Cookies and Analytics",
    para: "FoliTracks uses cookies to enhance functionality and analyze usage. You can control cookie preferences through your browser settings.",
  },
  {
    id: 9,
    title: "Policy Updates",
    para: "We may update this Privacy Policy periodically.",
  },
];
