import { create } from 'zustand';
import { baseUrl } from '@/global.t';
import axios from 'axios';
import toast from 'react-hot-toast';
type adminOrderStoreProps = {
    orders: any,
    isLoadingOrders: boolean,
    isDeletingOrder: boolean,
    isChangingDeliverStatus: boolean,
    getOrders: () => Promise<void>;
    deleteOrders: (ids: number[]) => Promise<void>,
    changeDeliverStatus: (userId: number, productId: number, orderId: number, status: string, quantity: number, price: number) => Promise<void>,
}
const useAdminStoreOrder = create<adminOrderStoreProps>((set, get) => ({
    orders: null,
    isDeletingOrder: false,
    isChangingDeliverStatus: false,
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
        set({ isDeletingOrder: true });
        try {
            await axios.delete(`${baseUrl}/api/order`, {
                data: { ids }
            })
        } catch (error: unknown) {
            console.log(error instanceof Error ? error.message : error);
        } finally {
            set({ isDeletingOrder: false });
        }
    },
    changeDeliverStatus: async (userId: number, productId: number, orderId: number, status: string, quantity: number, price: number) => {
        set({ isChangingDeliverStatus: true });
        try {
            await axios.post(`${baseUrl}/api/status-order`, {
                userId,
                productId,
                orderId,
                status,
                quantity,
                price
            });
            toast.success(`Deliver status changed successfully!!`);
        } catch (error: unknown) {
            console.log(error instanceof Error ? error.message : error);
        } finally {
            set({ isChangingDeliverStatus: false });
        }
    }
}));
export default useAdminStoreOrder;