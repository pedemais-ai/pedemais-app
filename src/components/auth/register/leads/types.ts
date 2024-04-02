import {z} from "zod";

export const LeadRegistrationInputsSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    store_name: z.string(),
    phone_number: z.string(),
    orders_per_day: z.number(),
});

export type LeadRegistrationInputs = z.infer<typeof LeadRegistrationInputsSchema>;