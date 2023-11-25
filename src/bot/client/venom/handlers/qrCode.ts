import {PrismaClient} from "@prisma/client";
import useClientHandle from "../../../../bot/utils/useClientHandle";

const prisma = new PrismaClient();

const qrCodeHandler = async (qrCode: string) => {
    try {
        await handle(qrCode);
    } catch (error) {
        console.error('Error updating client:', error);
        // Handle the error appropriately (throw an error, log, return, etc.)
    } finally {
        // Close the Prisma client connection
        await prisma.$disconnect();
    }
};

async function handle(qrCode: string) {
    const messageClient = await prisma.client.findUnique({
        where: {
            handle: useClientHandle,
        },
        include: {
            flow: true,
        },
    });

    if (!messageClient) {
        throw Error(`Invalid client ${useClientHandle}`);
    }

    await prisma.client.update({
        where: {id: messageClient.id},
        data: {
            qr_code: qrCode,
            is_authenticated: false
        },
    });

    console.log('Client updated');
}

export default qrCodeHandler;
