import { create } from 'zustand';
import axios from 'axios';
import { baseUrl } from '@/global.t';
import toast from 'react-hot-toast';
type checkOutStoreProps = {
    isCheckOutLoading: boolean,
    isItemsCheckOutLoading: boolean,
    isDeletingCheckout: boolean,
    checkouts: any,
    isCreatingCheckout: boolean,
    getUserCheckouts: (userId: number, productId: number) => Promise<void>,
    deleteCheckout: (userId: number, productId: number) => Promise<void>,
    createCheckout: (userId: number, productId: number, xs: boolean, s: boolean, m: boolean, l: boolean, xl: boolean, quantity: number) => Promise<void>,
}
const useCheckoutStore = create<checkOutStoreProps>((set, get) => ({
    isCreatingCheckout: false,
    isCheckOutLoading: false,
    isItemsCheckOutLoading: false,
    isDeletingCheckout: false,
    checkouts: null,
    getUserCheckouts: async (userId: number, productId: number) => {
        set({ isItemsCheckOutLoading: true });
        try {
            const response = await axios.get(`${baseUrl}/api/checkout/user/${productId}/${userId}`);
            set({ checkouts: response.data.checkouts });
        } catch (error: unknown) {
            console.log(error instanceof Error ? error.message : error);
        } finally {
            set({ isItemsCheckOutLoading: false });
        }
    },
    deleteCheckout: async (userId: number, productId: number) => {
        set({ isDeletingCheckout: true });
        try {
            await axios.delete(`${baseUrl}/api/checkout/user/${productId}/${userId}`);
            toast.success(`Checkout deleted successfully!!`);
        } catch (error: unknown) {
            console.log(error instanceof Error ? error.message : error);
            if (error instanceof Error) toast.error(error.message);
            else toast.error(String(error));
        } finally {
            set({ isDeletingCheckout: false });
        }
    },
    createCheckout: async (userId: number, productId: number, xs: boolean, s: boolean, m: boolean, l: boolean, xl: boolean, quantity: number) => {
        set({ isCreatingCheckout: true });
        try {
            await axios.post(`${baseUrl}/api/checkout`, {
                userId,
                productId,
                xs,
                s,
                m,
                l,
                xl,
                quantity
            });
            toast.success(`Checkout created successfully!!`);
        } catch (error: unknown) {
            console.log(error instanceof Error ? error.message : error);
            if (error instanceof Error) toast.error(error.message);
            else toast.error(String(error));
        } finally {
            set({ isCreatingCheckout: false });
        }
    }
}));
export default useCheckoutStore;