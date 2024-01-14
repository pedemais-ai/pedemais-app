import {create} from "zustand";
import {Store} from ".prisma/client";
import {API_URL} from "@/constants";

interface StoreState {
    stores: Store[];
    getStores: (id: number) => Promise<Store | undefined | null>;
}

export const useStore = create<StoreState>((set, get) => ({
    stores: [],
    getStores: async function (id: number) {
        let store = get().stores.find((p: Store) => p.id === id);

        if (!store) {
            try {
                const response = await fetch(`${API_URL}/store/${id}`, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                const newStore = await response.json();

                set((state) => ({
                    stores: [...state.stores, newStore as Store],
                }));

                return newStore;
            } catch (error) {
                console.error("Error fetching store from Prisma:", error);

                return undefined;
            }
        }

        return store;
    },
}));
