import { z } from "zod";

export const SERVICE_TYPES = [
  "Routine Service",
  "Repair/Replacement Service",
  "Preventive Service",
  "Emergency Service",
];

export const SERVICES = [
  "Oil Change",
  "Brake Pad",
  "Suspension",
  "Engine",
  "Wheel Alignment",
  "Exhaust System",
  "AC Compartment",
  "Diagnostic Scan",
  "Fluid Top-up",
  "AC Services",
  "Air Filter",
  "Battery Check",
  "Filter Change",
  "General Maintenance",
  "Brake Inspection",
  "Suspension Check",
  "Tyre Rotation",
  "Tyre Replacement",
  "Other",
];

export const step2Schema = z.object({
  serviceType: z.string().min(1, "Service type is required"),
  service: z.string().min(1, "Service is required"),
  serviceDate: z.string().min(1, "Service date is required"),
  serviceProvider: z.string().min(2, "Service provider is required"),
  serviceProviderPhone: z.string().min(1, "Service provider phone is required"),
  cost: z.string().optional().or(z.literal("")),
  serviceNotes: z.string().min(1, "Service note is required"),
});

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
