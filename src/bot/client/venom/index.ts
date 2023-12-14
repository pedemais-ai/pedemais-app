import {create, Message, Whatsapp} from 'venom-bot';
import MessageListener from "./listeners/message";
import qrCodeHandler from "./handlers/qrCode";
import useClientHandle from "../../../bot/utils/useClientHandle";
import BaseFactory from "../../../bot/client";
import statusFinderHandler from "../../../bot/client/venom/handlers/statusFinder";
import {prisma} from "../../../prisma";
import getClient from "../../../bot/utils/prisma/getClient";

class ClientFactory extends BaseFactory {

    public async start() {
        create({
            session: useClientHandle,
            statusFind: statusFinderHandler,
            catchQR: qrCodeHandler,
        }).then(async (client: Whatsapp) => {

            if (await client.isLoggedIn()) {
                const dbClient = await getClient();

                await prisma.client.update({
                    where: {id: dbClient.id},
                    data: {
                        is_authenticated: true
                    },
                });
            }

            await client.onMessage(async (message: Message) => {
                await (new MessageListener(client)).listen(message);
            });
        }).catch((err) => {
            console.log(err);
        });
    }
}

export default ClientFactory;

