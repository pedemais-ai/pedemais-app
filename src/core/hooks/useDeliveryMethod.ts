import {Prisma} from "@/core/types/prisma";
import {createEntityApiFetch, createEntityHook} from "@/core/hooks/createEntityHook";

export const fetchDeliveryMethod = async (id: number) => createEntityApiFetch<Prisma.DeliveryMethod>('delivery-method', id);
export const useDeliveryMethod = createEntityHook<Prisma.DeliveryMethod>('delivery-method');
