import {z} from "zod";

export const UserRegistrationInputsSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
});

export type UserRegistrationInputs = z.infer<typeof UserRegistrationInputsSchema>;