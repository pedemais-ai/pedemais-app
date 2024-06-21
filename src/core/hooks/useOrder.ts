import {Prisma} from "@/core/types/prisma";
import {createEntityApiFetch, createEntityHook} from "@/core/hooks/createEntityHook";

export const fetchOrder = async (id: number) => createEntityApiFetch<Prisma.Order>('order', id);
export const useOrder = createEntityHook<Prisma.Order>('order');

