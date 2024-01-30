import {z} from "zod";

export const AddCategoryInputsSchema = z.object({
    name: z.string().min(3).max(32),
});

export const PatchCategoryInputsSchema = z.object({
    name: z.string().min(3).max(32).optional(),
    is_active: z.boolean().optional(),
});


export type AddCategoryInputs = z.infer<typeof AddCategoryInputsSchema>;
export type PatchCategoryInputs = z.infer<typeof PatchCategoryInputsSchema>;