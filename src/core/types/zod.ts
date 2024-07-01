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

export const UpdateStoreConfigInputsSchema = z.object({
    name: z.string().min(3).max(32),
    minimum_order_price: z.number().min(0.01),
});

export const CheckoutInputsSchema = z.object({
    storeId: z.string().min(1, "The store id is required"),
    paymentMethod: z.string().min(1, "Payment method is required"),
    deliveryMethod: z.string().min(1, "Delivery method is required"),
});


export type AddCategoryInputs = z.infer<typeof AddCategoryInputsSchema>;
export type PatchCategoryInputs = z.infer<typeof PatchCategoryInputsSchema>;

export type AddProductInputs = z.infer<typeof AddProductInputsSchema>;

export type CheckoutInputs = z.infer<typeof CheckoutInputsSchema>;

export type UpdateStoreConfigInputs = z.infer<typeof UpdateStoreConfigInputsSchema>;
