import {Prisma} from "@/core/types/prisma";
import {createEntityHook} from "@/core/hooks/createEntityHook";

export const useOrder = createEntityHook<Prisma.Order>('order');

