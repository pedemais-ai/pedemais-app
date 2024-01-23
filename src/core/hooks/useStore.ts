import {Prisma} from "@/core/types/prisma";
import {createEntityApiFetch, createEntityHook} from "@/core/hooks/createEntityHook";

export const fetchStore = async (id: number) => createEntityApiFetch<Prisma.Store>('store', id);
export const useStore = createEntityHook<Prisma.Store>('store');
