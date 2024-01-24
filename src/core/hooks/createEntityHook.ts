import {create} from "zustand";
import {API_URL} from "@/constants";

interface EntityState<T> {
    entities: T[];
    find: (id: number) => Promise<T | null>;
}

const fetchEntity = async (url: string): Promise<any> => {
    const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
};

export const createEntityApiFetch = async <T>(
    apiEndpoint: string,
    id?: number,
): Promise<T> => {
    const url = `${API_URL}/${apiEndpoint}/${id}`;

    return await fetchEntity(url);
};

export const createEntityHook = <T>(
    apiEndpoint: string,
) => create<EntityState<T>>((set, get) => ({
    entities: [],
    find: async function (id: number) {
        let entity = get().entities.find((e: T) => (e as any).id === Number(id));

        if (!entity) {
            try {
                const newEntity = await createEntityApiFetch<T>(apiEndpoint, id);

                set((state) => ({
                    entities: [...state.entities, newEntity],
                }));

                return newEntity;
            } catch (error) {
                console.error(`Error fetching ${apiEndpoint} from Prisma:`, error);
                return null;
            }
        }

        return entity;
    },
}));

