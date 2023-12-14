import {prisma} from "../../../prisma";
import useClientHandle from "../../../bot/utils/useClientHandle";
import {Client} from ".prisma/client";
import create from 'zustand';

interface ClientState {
    client: Client | null;
    setClient: (client: Client) => void;
}

const useClientStore = create<ClientState>((set) => ({
    client: null,
    setClient: (client) => set({client}),
}));

export default async function getClient(): Promise<Client> {
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
        },
    });

    if (!messageClient) {
        throw new Error(`Invalid client ${useClientHandle}`);
    }

    setClient(messageClient);

    return messageClient;
}
