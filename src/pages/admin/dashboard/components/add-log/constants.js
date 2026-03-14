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
  cost: z.string().optional(),
  note: z.string().optional(),
});
