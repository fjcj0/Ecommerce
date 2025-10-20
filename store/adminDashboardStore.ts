import { create } from "zustand";
import axios from "axios";
import { topTenProductProps, baseUrl } from "@/global.t";
type adminDashboardProps = {
    error: null | string | unknown;
    isLoading: boolean;
    sumOfSales: number;
    totalProducts: number;
    totalUsers: number;
    totalOrders: number;
    totalOrdersDelivered: number;
    percentAgeOfOrders: number;
    topProducts: topTenProductProps[];
    productsPerMonth: any;
    salesPerMonth: any;
    getDashboardInformation: () => Promise<void>;
};
const useAdminDashboardInfoStore = create<adminDashboardProps>((set, get) => ({
    error: null,
    isLoading: false,
    sumOfSales: 0,
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalOrdersDelivered: 0,
    percentAgeOfOrders: 0,
    topProducts: [],
    productsPerMonth: [],
    salesPerMonth: [],
    getDashboardInformation: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.get(`${baseUrl}/api/admin-dashboard`);
            const data = response.data;
            set({
                sumOfSales: data.sumOfSales,
                totalProducts: data.totalProducts,
                totalUsers: data.totalUsers,
                totalOrders: data.totalOrders,
                totalOrdersDelivered: data.totalOrdersDelivered,
                percentAgeOfOrders: data.percentAgeOfOrders,
                topProducts: data.topProducts,
                productsPerMonth: data.productsPerMonth,
                salesPerMonth: data.salesPerMonth
            });
        } catch (error: unknown) {
            set({ error: error instanceof Error ? error.message : error })
            console.log("Failed to fetch dashboard information: ", error instanceof Error ? error.message : error);
        } finally {
            set({ isLoading: false });
        }
    },
}));
export default useAdminDashboardInfoStore;