import {create, Message, Whatsapp} from 'venom-bot';
import MessageListener from "./listeners/message";
import qrCodeHandler from "./handlers/qrCode";
import useClientHandle from "../../../bot/utils/useClientHandle";
import BaseFactory from "../../..//bot/client";

class ClientFactory extends BaseFactory {

    public async start() {
        create({
            session: useClientHandle,
            statusFind: qrCodeHandler,
            catchQR: qrCodeHandler,
        }).then(async (client: Whatsapp) => {
            await client.onMessage(async (message: Message) => {
                await (new MessageListener(client)).listen(message);
            });
        }).catch((err) => {
            console.log(err);
        });
    }
}

export default ClientFactory;

