import {prisma} from "../../../../prisma";
import getClient from "../../../../bot/utils/prisma/getClient";

const statusFinderHandler = async (status: string) => {
    console.log('Status changed', status);

    try {
        const client = await getClient();

        if (status === 'successChat') {
            await prisma.client.update({
                where: {id: client.id},
                data: {
                    is_authenticated: false
                },
            });
        }

    } catch (error) {
        console.error('Error on status handler:', error);
    } finally {
        // Close the Prisma client connection
        await prisma.$disconnect();
    }
};

export default statusFinderHandler;
