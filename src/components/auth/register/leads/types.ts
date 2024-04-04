import {z} from "zod";

export const LeadRegistrationInputsSchema = z.object({
    name: z.string().min(1, {
        message: "O seu nome é obrigatório"
    }).max(100),
    email: z.string().email({
        message: "E-mail no formato inválido"
    }),
    store_name: z.string().min(1, {
        message: "O nome do seu delivery é obrigatório"
    }),
    phone_number: z.string().min(1, {
        message: "O seu telefone é obrigatório"
    }),
    orders_per_day: z.string({
        invalid_type_error: 'Por favor, informe quantos você faz por dia'
    }).min(1).max(1),
    has_computer: z.string({
        invalid_type_error: 'Por favor, informe se você tem computador ou não'
    }).min(1).max(1),
});

export type LeadRegistrationInputs = z.infer<typeof LeadRegistrationInputsSchema>;
