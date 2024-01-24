import {
    Cart as PrismaCart,
    Category as PrismaCategory,
    Client as PrismaClient,
    Contact as PrismaContact,
    Flow as PrismaFlow,
    Message as PrismaMessage,
    Product as PrismaProduct,
    ProductPrice as PrismaProductPrice,
    Store as PrismaStore,
    User as PrismaUser,
} from ".prisma/client";

declare namespace Prisma {
    export type Flow = PrismaFlow & {};
    export type Message = PrismaMessage & {};

    export type Category = PrismaCategory & {
        products?: Product[]
    };

    export type Cart = PrismaCart & {
        items?: CartItem[]
    };

    export type CartItem = PrismaCart & {
        product?: Product
    };

    export type Client = PrismaClient & {
        flow?: Flow
        user?: User
    };

    export type Contact = PrismaContact & {
        messages?: Message[]
    };

    export type Product = PrismaProduct & {
        store?: Store,
        prices?: ProductPrice[]
    };

    export type ProductPrice = PrismaProductPrice & {
        product?: PrismaProduct,
    };

    export type Store = PrismaStore & {
        categories?: Category[]
    };

    export type User = PrismaUser & {
        stores?: Store[]
    };
}
