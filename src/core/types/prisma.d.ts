import {
    Cart as PrismaCart,
    CartItem as PrismaCartItem,
    Category as PrismaCategory,
    Client as PrismaClient,
    Contact as PrismaContact,
    DeliveryMethod as PrismaDeliveryMethod,
    Flow as PrismaFlow,
    Message as PrismaMessage,
    Order as PrismaOrder,
    PaymentMethod as PrismaPaymentMethod,
    Product as PrismaProduct,
    ProductImage as PrismaProductImage,
    ProductPrice as PrismaProductPrice,
    Store as PrismaStore,
    StoreDeliveryMethod as PrismaStoreDeliveryMethod,
    StorePaymentMethod as PrismaStorePaymentMethod,
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

    export type Order = PrismaOrder & {};

    export type Product = PrismaProduct & {
        category?: Category,
        prices?: ProductPrice[]
        images?: ProductImage[]
    };

    export type ProductPrice = PrismaProductPrice & {
        product?: PrismaProduct,
    };

    export type ProductImage = PrismaProductImage & {};

    export type Store = PrismaStore & {
        categories?: Category[]
        paymentMethods?: StorePaymentMethod[]
        deliveryMethods?: StoreDeliveryMethod[]
    };

    export type PaymentMethod = PrismaPaymentMethod & {};
    export type StorePaymentMethod = PrismaStorePaymentMethod & {
        paymentMethod?: PaymentMethod
    };

    export type DeliveryMethod = PrismaDeliveryMethod & {};
    export type StoreDeliveryMethod = PrismaStoreDeliveryMethod & {
        deliveryMethod?: DeliveryMethod
    };

    export type User = PrismaUser & {
        stores?: Store[]
    };

}
