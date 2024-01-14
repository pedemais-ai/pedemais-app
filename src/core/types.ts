import {Category as PrismaCategory, Product as PrismaProduct, Store as PrismaStore, User as PrismaUser} from ".prisma/client";

export type UserType = PrismaUser;
export type ProductType = PrismaProduct;
export type CategoryType = PrismaCategory & { products: ProductType[] };
export type StoreType = PrismaStore & { categories: CategoryType[] };
