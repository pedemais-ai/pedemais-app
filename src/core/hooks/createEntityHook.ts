import {create} from "zustand";
import {API_URL} from "@/constants";

interface EntityState<T> {
    version: number,
    entities: T[];
    find: (id: number) => Promise<T | null>;
    findAll: () => Promise<T[]>;
    update: (id: number, data: Partial<T>) => Promise<T | null>
}

export const fetchEntity = async (url: string): Promise<any> => {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
};

export const patchEntity = async <T>(
    apiEndpoint: string,
    id: number,
    data: Partial<T>,
): Promise<T> => {
    const url = `${API_URL}/${apiEndpoint}/${id}`;

    const response = await fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
) => create<EntityState<T>>((set, get) => {
    let version = get()?.version;

    return ({
        version: version ?? 0,
        entities: [],
        findAll: async function () {
            try {
                const allEntities = await fetchEntity(`${API_URL}/${apiEndpoint}`);

                set(() => ({
                    entities: allEntities,
                }));

                return allEntities;
            } catch (error) {
                console.error(`Error fetching all ${apiEndpoint} from Prisma:`, error);

                return [];
            }
        },
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
        update: async function (id: number, data: Partial<T>) {
            try {
                const updatedEntity = await patchEntity<T>(apiEndpoint, id, data);

                set((state) => ({
                    entities: state.entities.map((entity: T) => {
                        if ((entity as any).id === id) {
                            return {...entity, ...updatedEntity};
                        }
                        return entity;
                    }),
                    version: state.version + 1
                }));

                return updatedEntity;
            } catch (error) {
                console.error(`Error updating ${apiEndpoint} in Prisma:`, error);

                return null;
            }
        },
    });
});

