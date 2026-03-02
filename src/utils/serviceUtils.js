import brakePadImg from "../assets/dashboardImgs/dashHistory/brakePad.svg";
import brakeInspectionImg from "../assets/dashboardImgs/dashHistory/brakeInspeciton.svg";
import suspensionImg from "../assets/dashboardImgs/dashHistory/suspension.svg";
import diagnosticScanImg from "../assets/dashboardImgs/dashHistory/diagnosticScan.svg";
import engineImg from "../assets/dashboardImgs/dashHistory/engine.svg";
import fluidTopImg from "../assets/dashboardImgs/dashHistory/fluidTop.svg";
import acImg from "../assets/dashboardImgs/dashHistory/ac.svg";
import oilChangeImg from "../assets/dashboardImgs/dashHistory/oilChange.svg";
import filterChangeImg from "../assets/dashboardImgs/dashHistory/filterChange.svg";
import batteryCheckImg from "../assets/dashboardImgs/dashHistory/batteryCheck.svg";
import wheelAlignmentImg from "../assets/dashboardImgs/dashHistory/wheel alignment.svg";
import exhaustImg from "../assets/dashboardImgs/dashHistory/exhaust.svg";
import generalMaintImg from "../assets/dashboardImgs/dashHistory/generalMaint.svg";

const SERVICE_ICON_MAP = {
  "Brake Pad": brakePadImg,
  "Brake Inspection": brakeInspectionImg,
  "Suspension": suspensionImg,
  "Suspension Check": suspensionImg,
  "Diagnostic Scan": diagnosticScanImg,
  "Electrical/Lighting": diagnosticScanImg,
  "Engine": engineImg,
  "Transmission": engineImg,
  "Fluid Top-up": fluidTopImg,
  "Radiator": fluidTopImg,
  "AC Compartment": acImg,
  "AC Services": acImg,
  "General Maintenance": generalMaintImg,
  "Wheel Alignment": wheelAlignmentImg,
  "Exhaust System": exhaustImg,
  "Body Work": exhaustImg,
  "Oil Change": oilChangeImg,
  "Air Filter": filterChangeImg,
  "Filter Change": filterChangeImg,
  "Battery Check": batteryCheckImg,
  "Battery Change": batteryCheckImg,
};

export const getServiceIcon = (name) => SERVICE_ICON_MAP[name] ?? generalMaintImg;
