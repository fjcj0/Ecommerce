import { create } from 'zustand';
import { baseUrl } from '@/global.t';
import axios from 'axios';
type adminOrderStoreProps = {
    orders: any,
    isLoadingOrders: boolean,
    getOrders: () => Promise<void>;
    deleteOrders: (ids: number[]) => Promise<void>,
    changeDeliverStatus: (id: number, status: string) => Promise<void>,
}
const useAdminStoreOrder = create<adminOrderStoreProps>((set, get) => ({
    orders: null,
    isLoadingOrders: false,
    getOrders: async () => {
        set({ isLoadingOrders: true });
        try {
            const response = await axios.get(`${baseUrl}/api/order`);
            set({ orders: response.data.orders });
        } catch (error: unknown) {
            console.log(error instanceof Error ? error.message : error);
        } finally {
            set({ isLoadingOrders: false });
        }
    },
    deleteOrders: async (ids: number[]) => {

    },
    changeDeliverStatus: async (id: number, status: string) => {

    }
}));
export default useAdminStoreOrder;