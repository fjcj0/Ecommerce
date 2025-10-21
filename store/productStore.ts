import { create } from "zustand";
import axios from "axios";
import toast from 'react-hot-toast';
import { baseUrl, createProductProps, updateProductsProps } from "@/global.t";
type ProductStoreProps = {
    error: null | string | unknown;
    isLoading: boolean;
    isLoadingModal: boolean;
    products: any;
    product: any;
    isLoadingVisible: boolean,
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
    updateVisible: (productId: number, value: boolean) => Promise<void>;
};
const useProductAdmin = create<ProductStoreProps>((set, get) => ({
    error: null,
    isLoading: false,
    isLoadingModal: false,
    products: [],
    product: null,
    isLoadingVisible: false,
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
        set({ isLoadingModal: true, error: null });
        try {
            await axios.put(`${baseUrl}/api/product/${productId}`, {
                sizesChosen,
                quantity,
                discount,
                title,
                price,
                endsIn,
                description,
            });
            toast.success(`Product information updated successfully!!`);
        } catch (error: unknown) {
            if (error instanceof Error) set({ error: error.message });
            else set({ error: error });
        } finally {
            set({ isLoadingModal: false });
        }
    },
    updateVisible: async (productId: number, value: boolean) => {
        set({ isLoadingVisible: true });
        try {
            await axios.put(`${baseUrl}/api/change-visible`, { productId, value });
            set((state) => ({
                products: state.products.map((p: any) =>
                    p.id === productId ? { ...p, is_visible: value } : p
                ),
            }));
            toast.success('Product visibility updated!');
        } catch (error: unknown) {
            if (error instanceof Error) set({ error: error.message });
            else set({ error });
            toast.error('Failed to update visibility!!');
        } finally {
            set({ isLoadingVisible: false });
        }
    },

}));
export default useProductAdmin;