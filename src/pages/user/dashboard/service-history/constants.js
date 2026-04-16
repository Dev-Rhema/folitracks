
export const REPAIR_SERVICES = [
  "Brake Pad",
  "Suspension",
  "Engine",
  "Wheel Alignment",
  "Exhaust System",
  "AC Compartment",
];

export const ROUTINE_SERVICES = [
  "Diagnostic Scan",
  "Fluid Top-up",
  "Oil Change",
  "AC Services",
  "Air Filter",
];

export const COMPLETED_VEHICLE_MAKES = [
  "Audi",
  "BMW",
  "Ford",
  "Hyundai",
  "Lexus",
  "Mercedes Benz",
  "Toyota",
];

export const UPCOMING_OVERDUE_VEHICLE_MAKES = [
  "Toyota", "Mercedes Benz", "BMW", "Hyundai", "Lexus", "Ford", "Audi", "Honda", "Kia",
];

export const UPCOMING_STATUSES = ["In Progress", "Due Today", "Due Soon", "Scheduled"];

export const SERVICE_TYPE_ACCORDION = {
  label: "Service Type",
  type: "accordion",
  groups: [
    { label: "Repairs", services: REPAIR_SERVICES },
    { label: "Routine Service", services: ROUTINE_SERVICES },
  ],
};
