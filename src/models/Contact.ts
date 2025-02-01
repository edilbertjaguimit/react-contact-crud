import { z } from 'zod';

export interface Contact {
    contactId: number;
    contactFirstName: string;
    contactLastName: string;
    contactEmail: string;
    contactMobileNumber: string;
    contactAddress: string;
    contactStatus: string;
}

export const addContactSchema = z.object({
    contactFirstName: z
        .string()
        .nonempty('First name is required')
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must be at most 50 characters'),
    contactLastName: z
        .string()
        .nonempty('Last name is required')
        .min(2, 'Last name must be at least 2 characters')
        .max(50, 'Last name must be at most 50 characters'),
    contactEmail: z.string().nonempty('Email is required').email('Invalid email address'),
    contactMobileNumber: z
        .string()
        .nonempty('Mobile number is required')
        .min(11, 'Mobile number must be at least 11 characters')
        .max(13, 'Mobile number must be at most 13 characters')
        .regex(/^(09|\+639)\d{9}$/, 'Invalid mobile number'),
    contactAddress: z
        .string()
        .nonempty('Address is required')
        .min(5, 'Address must be at least 10 characters')
        .max(255, 'Address must be at most 255 characters'),
});

export const updateContactSchema = addContactSchema.extend({
    contactId: z.number().int(),
    contactStatus: z.string(),
});

export type AddContactFormData = z.infer<typeof addContactSchema>; // This is the type of the form data that we will use in the form component to validate the form data and submit it to the server
export type UpdateContactFormData = z.infer<typeof updateContactSchema>; // This is the type of the form data that we will use in the form component to validate the form data and submit it to the server
