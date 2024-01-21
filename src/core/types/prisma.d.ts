import {Category as PrismaCategory, Client as PrismaClient, Contact as PrismaContact, Flow as PrismaFlow, Message as PrismaMessage, Product as PrismaProduct, Store as PrismaStore, User as PrismaUser,} from ".prisma/client";

declare namespace Prisma {
    export type Category = PrismaCategory & {
        products?: Product[]
    };

    export type Store = PrismaStore & {
        categories?: Category[]
    };

    export type Contact = PrismaContact & {
        messages?: Message[]
    };

    export type Client = PrismaClient & {
        flow?: Flow
        user?: User
    };

    export type User = PrismaUser & {
        stores?: Store[]
    };

    export type Flow = PrismaFlow & {};
    export type Product = PrismaProduct & {};
    export type Message = PrismaMessage & {};
}
