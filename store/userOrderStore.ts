import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "@/global.t";
type userOrderStoreProps = {
    orders: any;
    isLoadingOrders: boolean;
    getOrders: (userId: number) => Promise<void>;
    isCreatingOrder: boolean;
    createOrder: (checkouts: any) => Promise<void>;
};
const useUserOrderStore = create<userOrderStoreProps>((set) => ({
    orders: null,
    isLoadingOrders: false,
    isCreatingOrder: false,
    getOrders: async (userId: number) => {
        set({ isLoadingOrders: true });
        try {
            const response = await axios.get(`${baseUrl}/api/order/${userId}`);
            set({ orders: response.data.orders });
        } catch (error) {
            console.error(error instanceof Error ? error.message : error);
            toast.error("Failed to fetch orders");
        } finally {
            set({ isLoadingOrders: false });
        }
    },
    createOrder: async (checkouts) => {
        set({ isCreatingOrder: true });
        try {
            const response = await axios.post(`${baseUrl}/api/order`, { checkouts });
            const { message, skippedCheckouts } = response.data;
            toast.success(message);
            if (skippedCheckouts?.length > 0) {
                toast.error(
                    `${skippedCheckouts.length} item(s) were unavailable and removed from your cart.`
                );
            }
        } catch (error) {
            console.error(error instanceof Error ? error.message : error);
            toast.error("Failed to create order");
        } finally {
            set({ isCreatingOrder: false });
        }
    },
}));
export default useUserOrderStore;