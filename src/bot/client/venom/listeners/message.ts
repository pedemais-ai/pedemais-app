import {Message, Whatsapp} from 'venom-bot';
import BaseListener from "../../baseListener";
import getClient from "../../../../bot/utils/prisma/getClient";

class MessageListener extends BaseListener<Whatsapp, Message> {

    constructor(client: Whatsapp) {
        super(client);
    }

    public async handle(message: Message) {
        console.log('Message received', message);

        const client = await getClient();
        const contactNumber = message.from.replace(/[^\d.-]+/g, '').replace('.', '');

        let contact = await this.prisma.contact.findUnique({
            where: {
                number: contactNumber,
                client_id: client.id,
            },
        });

        if (!contact) {
            contact = await this.prisma.contact.create({
                data: {
                    number: contactNumber,
                    name: message.sender.name,
                    client_id: client.id,
                },
            });
        }

        await this.prisma.message.create({
            data: {
                contact_id: contact.id,
                message: message.body,
            },
        });
    }
}

export default MessageListener;
