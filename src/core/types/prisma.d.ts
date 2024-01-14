import {Contact, Message} from ".prisma/client";

declare namespace Prisma {

    export type ContactWithMessages = Contact & { messages?: Message[] };
}
