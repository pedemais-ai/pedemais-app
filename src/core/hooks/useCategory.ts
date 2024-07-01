import {Prisma} from "@/core/types/prisma";
import {createEntityHook} from "@/core/hooks/createEntityHook";

export const useCategory = createEntityHook<Prisma.Category>('category');

