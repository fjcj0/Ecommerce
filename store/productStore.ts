import { create } from "zustand";
import axios from "axios";
import toast from 'react-hot-toast';
import { baseUrl, createProductProps, updateProductsProps } from "@/global.t";
type ProductStoreProps = {
    error: null | string | unknown;
    isLoading: boolean;
    isLoadingModal: boolean;
    isUserCheckout: boolean;
    products: any;
    product: any;
    isLoadingVisible: boolean;
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
    getProduct: (productId: number, userId: number) => Promise<void>;
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
    clearError: () => void;
    clearProduct: () => void;
};
const useProductAdmin = create<ProductStoreProps>((set, get) => ({
    error: null,
    isLoading: false,
    isLoadingModal: false,
    isUserCheckout: false,
    products: [],
    product: null,
    isLoadingVisible: false,
    createProduct: async ({
        imagesAddedBase64,
        sizesChosen,
        quantity,
        discount,
        title,
        price,
        endsIn,
        description,
    }) => {
        set({ isLoading: true, error: null });
        try {
            await axios.post(`${baseUrl}/api/product`, {
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
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            set({ error: errorMessage });
            toast.error(errorMessage);
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
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch products';
            set({ error: errorMessage });
            toast.error(errorMessage);
        } finally {
            set({ isLoading: false });
        }
    },
    getProduct: async (productId: number, userId: number) => {
        set({ isLoading: true, error: null, isUserCheckout: false });
        try {
            const productResponse = await axios.get(`${baseUrl}/api/get-product/${productId}`);
            const productData = productResponse.data.shoe;
            if (!productData.is_visible) {
                set({ error: 'Product not found', product: null });
                return;
            }
            if (userId) {
                try {
                    const checkoutResponse = await axios.post(`${baseUrl}/api/check-checkout`, {
                        productId,
                        userId
                    });
                    set({ isUserCheckout: checkoutResponse.data.isExist });
                } catch (checkoutError) {
                    console.log('Error checking checkout:', checkoutError);
                }
            }
            set({ product: productData, error: null });
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch product';
            set({ error: errorMessage, product: null });
        } finally {
            set({ isLoading: false });
        }
    },
    deleteProduct: async (productId: number) => {
        set({ isLoading: true, error: null });
        try {
            // Implement delete logic here
            toast.success('Product deleted successfully!!');
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to delete product';
            set({ error: errorMessage });
            toast.error(errorMessage);
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
            const errorMessage = error instanceof Error ? error.message : 'Failed to update product';
            set({ error: errorMessage });
            toast.error(errorMessage);
        } finally {
            set({ isLoadingModal: false });
        }
    },
    updateVisible: async (productId: number, value: boolean) => {
        set({ isLoadingVisible: true, error: null });
        try {
            await axios.put(`${baseUrl}/api/change-visible`, { productId, value });
            set((state) => ({
                products: state.products.map((p: any) =>
                    p.id === productId ? { ...p, is_visible: value } : p
                ),
            }));
            toast.success('Product visibility updated!');
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to update visibility';
            set({ error: errorMessage });
            toast.error('Failed to update visibility!!');
        } finally {
            set({ isLoadingVisible: false });
        }
    },
    clearError: () => set({ error: null }),
    clearProduct: () => set({ product: null, error: null }),

}));
export default useProductAdmin;