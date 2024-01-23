import useClientHandle from "../../../bot/utils/useClientHandle";
import {create} from 'zustand';
import {prisma} from "../../prisma";
import {Prisma} from "../../../src/core/types/prisma";

interface ClientState {
    client?: Prisma.Client;
    setClient: (client: Prisma.Client) => void;
}

const useClientStore = create<ClientState>((set) => ({
    client: undefined,
    setClient: (client) => set({client}),
}));

export default async function getClient(): Promise<Prisma.Client> {
    const {client, setClient} = useClientStore.getState();

    // Check if the client is already in the store
    if (client) {
        return client;
    }

    const messageClient = await prisma.client.findFirst({
        where: {
            handle: useClientHandle,
        },
        include: {
            flow: true,
            user: {
                include: {
                    stores: true,
                },
            },
        },
    });

    if (!messageClient) {
        throw new Error(`Invalid client ${useClientHandle}`);
    }

    setClient(messageClient);

    return messageClient;
}
