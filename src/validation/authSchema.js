import { z } from 'zod';

export const signupSchema = z.object({
  fullname: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  accountType: z.enum(['Individual Car Owner', 'Automobile Related Business']),
  businessName: z.string().optional(),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[!@#$%^&*]/, 'Password must contain at least one special character'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const vehicleSchema = z.object({
  make: z.string().min(1, 'Vehicle make is required'),
  vehicleModel: z.string().min(1, 'Vehicle model is required'),
  yearOfManufacture: z
    .string()
    .min(4, 'Year must be 4 digits')
    .max(4, 'Year must be 4 digits')
    .regex(/^\d{4}$/, 'Year must be a valid 4-digit year'),
  plateNumber: z.string().min(1, 'Plate number is required'),
  vin: z.string().optional(),
});
