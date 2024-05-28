import {Prisma} from "@/core/types/prisma";
import {create} from "zustand";
import {API_URL} from "@/constants";

interface EntityState<T> {
    entity?: T;
    get: (refresh?: boolean) => Promise<T | null>;
    clean: () => void;
}

const createEntityHook = <T>(
    apiEndpoint: string,
) => create<EntityState<T>>((set, get) => ({
    entity: undefined,
    get: async function (refresh = false) {
        let entity: T | undefined;

        if (!refresh) {
            entity = get().entity

            if (entity) {
                return entity;
            }
        }

        try {
            const response = await fetch(`${API_URL}/${apiEndpoint}`, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            entity = await response.json() as T;

            set(() => ({
                entity: entity,
            }));

            return entity;
        } catch (error) {
            console.error(`Error fetching ${apiEndpoint} from Prisma:`, error);

            return null;
        }
    },
    clean: () => {
        set(() => ({
            entity: undefined,
        }));
    },
}));

export const useMe = createEntityHook<Prisma.User>('me');
