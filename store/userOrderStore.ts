import { create } from 'zustand';
import { baseUrl } from '@/global.t';
import axios from 'axios';
type userOrderStoreProps = {
    orders: any,
    isLoadingOrders: boolean,
    getOrders: (userId: number) => Promise<void>;
}
const useUserOrderStore = create<userOrderStoreProps>((set, get) => ({
    orders: null,
    isLoadingOrders: false,
    getOrders: async (userId: number) => {
        set({ isLoadingOrders: true });
        try {
            const response = await axios.get(`${baseUrl}/api/order/${userId}`);
            set({ orders: response.data.orders });
        } catch (error: unknown) {
            console.log(error instanceof Error ? error.message : error);
        } finally {
            set({ isLoadingOrders: false });
        }
    },

}));
export default useUserOrderStore;