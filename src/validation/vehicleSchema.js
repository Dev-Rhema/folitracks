import { z } from 'zod';

export const vehicleOwnershipSchema = z.object({
    // accountType: z.enum(['individual', 'business']),
    // fullName: z.string().optional(),
    // businessName: z.string().optional(),
}).superRefine((data, ctx) => {
    if (data.accountType === 'individual' && (!data.fullName || data.fullName.trim().length < 2)) {
        ctx.addIssue({ code: 'custom', path: ['fullName'], message: 'Full name must be at least 2 characters' });
    }
    if (data.accountType === 'business' && (!data.businessName || data.businessName.trim().length < 2)) {
        ctx.addIssue({ code: 'custom', path: ['businessName'], message: 'Business name must be at least 2 characters' });
    }
});

// Combined schema used in VehicleOwnershipStage — vehicle details are
// registered as hidden inputs (pre-filled from vehicleData prop)
export const vehicleFullSchema = z.object({
    // Vehicle details (hidden, pre-filled)
    make: z.string().min(1, 'Vehicle make is required'),
    vehicleModel: z.string().min(1, 'Vehicle model is required'),
    customVehicleModel: z.string().optional(),
    yearOfManufacture: z.string().min(1, 'Year of manufacture is required'),
    plateNumber: z.string().min(1, 'Plate number is required'),
    vin: z.string().optional(),
    // Ownership details
    // accountType: z.enum(['individual', 'business']),
    // fullName: z.string().optional(),
    // businessName: z.string().optional(),
}).superRefine((data, ctx) => {
    if (data.accountType === 'individual' && (!data.fullName || data.fullName.trim().length < 2)) {
        ctx.addIssue({ code: 'custom', path: ['fullName'], message: 'Full name must be at least 2 characters' });
    }
    if (data.accountType === 'business' && (!data.businessName || data.businessName.trim().length < 2)) {
        ctx.addIssue({ code: 'custom', path: ['businessName'], message: 'Business name must be at least 2 characters' });
    }
});
