import getClient from "../../../../bot/utils/prisma/getClient";
import {prisma} from "../../../prisma";

const qrCodeHandler = async (qrCode: string) => {
    try {
        const client = await getClient();

        await prisma.client.update({
            where: {id: client.id},
            data: {
                qr_code: qrCode,
                is_authenticated: false
            },
        });

        console.log('Client QR updated');
    } catch (error) {
        console.error('Error updating client:', error);
    } finally {
        await prisma.$disconnect();
    }
};

export default qrCodeHandler;
