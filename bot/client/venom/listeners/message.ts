import {Message, Whatsapp} from 'venom-bot';
import BaseListener from "../../baseListener";
import getClient from "../../../../bot/utils/prisma/getClient";
import {generateUniqueId} from "../../../../src/core/utils";

class MessageListener extends BaseListener<Whatsapp, Message> {

    constructor(client: Whatsapp) {
        super(client);
    }

    public async handle(message: Message) {
        console.log(message);

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

        let existingLink = await this.prisma.contactStoreLink.findFirst({
            where: {
                contact_id: contact.id,
                store_id: contact.id,
            },
        });

        if (!existingLink) {
            const store = client.user.stores[0];

            existingLink = await this.prisma.contactStoreLink.create({
                data: {
                    contact_id: contact.id,
                    store_id: store.id,
                    unique_id: generateUniqueId(),
                },
            });

            await this.client.sendText(
                message.from,
                `Realize seu pedido entrando no link abaixo. 👇 \nhttps://bot.socialuplabs.com.br/menu/${store.id}?id=${existingLink.unique_id}`
            );
        }
    }
}

export default MessageListener;
