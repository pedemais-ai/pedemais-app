import {Message, Whatsapp} from 'venom-bot';
import stageConfig, {ActionType, Option} from "../../../stages/default";
import BaseListener from "../../baseListener";
import delay from "../../../../bot/utils/delay";
import useClientHandle from "../../../../bot/utils/useClientHandle";

class MessageListener extends BaseListener<Whatsapp, Message> {

    constructor(client: Whatsapp) {
        super(client);
    }

    public async handle(message: Message) {
        console.log('Message received');

        const messageClient = await this.prisma.client.findUnique({
            where: {
                handle: useClientHandle,
            },
            include: {
                flow: true,
            },
        });

        if (!messageClient) {
            console.error('Invalid client ', useClientHandle);

            return;
        }

        if (!messageClient.flow) {
            console.log('Conversational flow not defined for this client');

            await this.client.sendReactions(message.id, '👽')
            await this.client.sendText(
                message.from,
                "Fluxos de conversa não definidos. Entre em contato com o administrador"
            );

            return;
        }

        const contactNumber = message.from.replace(/[^\d.-]+/g, '').replace('.', '');

        let contact = await this.prisma.contact.findUnique({
            where: {
                number: contactNumber,
                client_id: messageClient.id,
            },
        });

        if (!contact) {
            contact = await this.prisma.contact.create({
                data: {
                    number: contactNumber,
                    name: message.chat.contact.name,
                    client_id: messageClient.id,
                },
            });
        }

        let stage = (stageConfig.stages as Record<string, any>)[contact.current_stage || 0];

        if (!stage) {
            await this.client.sendReactions(message.id, '👽');
            await this.client.sendText(
                message.from,
                "Configuração incorreta. Entre em contato com o administrador"
            );


            return;
        }

        let isFirstStage = contact.current_stage === null;

        if (message.chat.isGroup) {
            return;
        }

        if (isFirstStage) {
            await this.client.startTyping(message.chatId, true);
            await delay();
            await this.client.sendText(message.from, messageClient.flow.greeting);

            await this.prisma.contact.update({
                where: {id: contact.id},
                data: {current_stage: 0},
            });

            if (stage.options) {
                const optionsText = stage.options.map((option: { text: string; }) => option.text).join('\n');
                await this.client.sendText(
                    message.from,
                    optionsText
                );
            }

            return;
        }

        // Handle user input and transition to the next stage if applicable
        const selectedOption: Option = stage.options.find((o: { id: number; }) => message.body === o.id.toString());
        if (!selectedOption) {
            await this.client.sendReactions(message.id, '🚫');
            await this.client.startTyping(message.chatId, true);
            await delay(400, 900);
            await this.client.sendText(
                message.from,
                "Não entendi"
            );
        } else {
            await this.client.sendReactions(message.id, '👍');

            for (const value of selectedOption.actions) {
                if (value.name === ActionType.NEXT) {
                    const newStage = value.params[0];

                    // Update the user's stage
                    await this.prisma.contact.update({
                        where: {id: contact.id},
                        data: {current_stage: newStage},
                    });

                    // Fetch the configuration for the next stage
                    const nextStage = (stageConfig.stages as Record<string, any>)[newStage.toString()];

                    if (nextStage) {
                        if (nextStage.message) {
                            await this.client.startTyping(message.chatId, true);
                            await delay(500, 1000);
                            await this.client.sendText(
                                message.from,
                                nextStage.message
                            );
                        }

                        await this.client.startTyping(message.chatId, true);
                        await delay();

                        // Send available options for the next stage
                        if (nextStage.options) {
                            const optionsText = nextStage.options.map((option: { text: string; }) => option.text).join('\n');
                            await this.client.sendText(
                                message.from,
                                optionsText
                            );
                        }
                    }
                } else if (value.name === ActionType.TEXT) {
                    await this.client.startTyping(message.chatId, true);
                    await delay(300, 800);

                    await this.client.sendText(
                        message.from,
                        value.params[0]
                    );
                } else if (value.name === ActionType.VOICE) {
                    await this.client.startRecording(message.chatId, true);
                    await delay(1500, 3500);

                    // todo: send voice message
                } else if (value.name === ActionType.LOCATION) {
                    // todo: send location
                } else if (value.name === ActionType.INPUT) {
                    console.log(message.body)
                } else {
                    await this.client.sendReactions(message.id, '👽');
                    await this.client.sendText(
                        message.from,
                        'Ação inválida. Entre em contato com o administrador'
                    );
                }
            }
        }
    }
}

export default MessageListener;
