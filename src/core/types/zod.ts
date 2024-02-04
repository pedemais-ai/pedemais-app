import {z} from "zod";

export const AddCategoryInputsSchema = z.object({
    name: z.string().min(3).max(32),
});

export const PatchCategoryInputsSchema = z.object({
    name: z.string().min(3).max(32).optional(),
    is_active: z.boolean().optional(),
});

export const AddProductInputsSchema = z.object({
    name: z.string().min(3).max(32),
    description: z.string().min(3).max(255),
    price: z.number().min(0.01),
    category_id: z.string().min(1),
});


export type AddCategoryInputs = z.infer<typeof AddCategoryInputsSchema>;
export type PatchCategoryInputs = z.infer<typeof PatchCategoryInputsSchema>;

export type AddProductInputs = z.infer<typeof AddProductInputsSchema>;
