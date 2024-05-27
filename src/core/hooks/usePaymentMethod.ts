import {Prisma} from "@/core/types/prisma";
import {createEntityApiFetch, createEntityHook} from "@/core/hooks/createEntityHook";

export const fetchPaymentMethod = async (id: number) => createEntityApiFetch<Prisma.PaymentMethod>('store', id);
export const usePaymentMethod = createEntityHook<Prisma.PaymentMethod>('payment-method');
