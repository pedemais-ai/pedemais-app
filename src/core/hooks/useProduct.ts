import {Prisma} from "@/core/types/prisma";
import {createEntityApiFetch, createEntityHook} from "@/core/hooks/createEntityHook";

export const fetchProduct = async (id: number) => createEntityApiFetch<Prisma.Product>('product', id);
export const useProduct = createEntityHook<Prisma.Product>('product');

