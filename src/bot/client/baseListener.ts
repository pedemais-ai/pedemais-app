import {PrismaClient} from "@prisma/client";
import {prisma} from "../../prisma";

abstract class BaseMessageListener<Client, Message> {
    protected client: Client;
    protected prisma: PrismaClient;

    protected constructor(client: Client) {
        this.client = client;
        this.prisma = prisma;
    }

    public async listen(message: Message): Promise<void> {
        try {
            await this.handle(message);
        } catch (error) {
            console.error("Error handling message:", error);
        } finally {
            await this.disconnect();
        }
    }

    public async disconnect(): Promise<void> {
        try {
            await this.prisma.$disconnect();
        } catch (disconnectError) {
            console.error("Error disconnecting from Prisma:", disconnectError);
        }
    }

    abstract handle(message: Message): Promise<void>;
}

export default BaseMessageListener;
