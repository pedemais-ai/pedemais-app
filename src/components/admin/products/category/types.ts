import {z} from "zod";

export const AddCategoryInputsSchema = z.object({
    name: z.string().min(3).max(32),
});

export type AddCategoryInputs = z.infer<typeof AddCategoryInputsSchema>;