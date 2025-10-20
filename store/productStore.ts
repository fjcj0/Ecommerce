import { create } from "zustand";
import axios from "axios";
import toast from 'react-hot-toast';
import { baseUrl, createProductProps, updateProductsProps } from "@/global.t";
type ProductStoreProps = {
    error: null | string | unknown;
    isLoading: boolean;
    products: any;
    product: any;
    createProduct: ({
        imagesAddedBase64,
        sizesChosen,
        quantity,
        discount,
        title,
        price,
        endsIn,
        description,
    }: createProductProps) => Promise<void>;
    getProducts: () => Promise<void>;
    getProduct: (productId: number) => Promise<void>;
    deleteProduct: (productId: number) => Promise<void>;
    updateProduct: (
        productId: number,
        {
            sizesChosen,
            quantity,
            discount,
            title,
            price,
            endsIn,
            description,
        }: updateProductsProps
    ) => Promise<void>;
};
const useProductAdmin = create<ProductStoreProps>((set, get) => ({
    error: null,
    isLoading: false,
    products: [],
    product: null,
    createProduct: async ({ imagesAddedBase64,
        sizesChosen,
        quantity,
        discount,
        title,
        price,
        endsIn,
        description, }) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(`${baseUrl}/api/product`,
                {
                    imagesAddedBase64,
                    sizesChosen,
                    quantity,
                    discount,
                    title,
                    price,
                    endsIn,
                    description,
                });
            toast.success('Shoe created successfully!!');
        } catch (error: unknown) {
            if (error instanceof Error) set({ error: error.message });
            else set({ error: error });
        } finally {
            set({ isLoading: false });
        }
    },
    getProducts: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(`${baseUrl}/api/product`);
            set({
                products: response.data.shoes
            });
        } catch (error: unknown) {
            if (error instanceof Error) set({ error: error.message });
            else set({ error: error });
        } finally {
            set({ isLoading: false });
        }
    },
    getProduct: async (productId: number) => {
        set({ isLoading: true, error: null });
        try {

        } catch (error: unknown) {
            if (error instanceof Error) set({ error: error.message });
            else set({ error: error });
        } finally {
            set({ isLoading: false });
        }
    },
    deleteProduct: async (productId: number) => {
        set({ isLoading: true, error: null });
        try {

        } catch (error: unknown) {
            if (error instanceof Error) set({ error: error.message });
            else set({ error: error });
        } finally {
            set({ isLoading: false });
        }
    },
    updateProduct: async (
        productId: number,
        { sizesChosen, quantity, discount, title, price, endsIn, description }: updateProductsProps
    ) => {
        set({ isLoading: true, error: null });
        try {

        } catch (error: unknown) {
            if (error instanceof Error) set({ error: error.message });
            else set({ error: error });
        } finally {
            set({ isLoading: false });
        }
    },
}));
export default useProductAdmin;