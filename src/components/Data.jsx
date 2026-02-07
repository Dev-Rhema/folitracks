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
