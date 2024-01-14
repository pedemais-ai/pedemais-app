import {Category as PrismaCategory, Contact as PrismaContact, Message as PrismaMessage, Product as PrismaProduct, Store as PrismaStore, User as PrismaUser} from ".prisma/client";


declare namespace Prisma {

    export type Product = PrismaProduct;
    export type Category = PrismaCategory & { products: Product[] };
    export type Store = PrismaStore & { categories: Category[] };
    export type Contact = PrismaContact & { messages?: PrismaMessage[] };
    export type User = PrismaUser;
}
