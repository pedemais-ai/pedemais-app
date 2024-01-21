import {create} from "zustand";
import {Product} from ".prisma/client";
import {API_URL} from "@/constants";

interface ProductState {
    products: Product[];
    getProduct: (id: number) => Promise<Product | undefined | null>;
}

export const useProduct = create<ProductState>((set, get) => ({
    products: [],
    getProduct: async function (id: number) {
        let product = get().products.find((p: Product) => p.id === id);

        if (!product) {
            try {
                const response = await fetch(`${API_URL}/product/${id}`, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                const newProduct = await response.json();

                set((state) => ({
                    products: [...state.products, newProduct as Product],
                }));

                return newProduct;
            } catch (error) {
                console.error("Error fetching product from Prisma:", error);

                return undefined;
            }
        }

        return product;
    },
}));
