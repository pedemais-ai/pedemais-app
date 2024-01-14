import {Category as PrismaCategory, Product as PrismaProduct, Store as PrismaStore} from ".prisma/client";

export type ProductType = PrismaProduct;
export type CategoryType = PrismaCategory & { products: ProductType[] };
export type StoreType = PrismaStore & { categories: CategoryType[] };

