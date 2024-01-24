import {
    Cart as PrismaCart,
    CartItem as PrismaCartItem,
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
        store?: Store
        products?: Product[]
    };

    export type Cart = PrismaCart & {
        items?: CartItem[]
        totalPrice?: number,
    };

    export type CartItem = PrismaCartItem & {
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
        category?: Category,
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
