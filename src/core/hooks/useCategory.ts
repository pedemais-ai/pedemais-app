import {Prisma} from "@/core/types/prisma";
import {createEntityApiFetch, createEntityHook} from "@/core/hooks/createEntityHook";

export const fetchCategory = async (id: number) => createEntityApiFetch<Prisma.Category>('category', id);
export const useCategory = createEntityHook<Prisma.Category>('category');

