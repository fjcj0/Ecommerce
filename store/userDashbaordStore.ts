import { create } from 'zustand';
import { baseUrl } from '@/global.t';
import axios from 'axios';
type dashboardInformationProps = {
    isLoading: boolean,
    getInformation: (userId: number) => Promise<void>,
    information: any,
}
const useUserDashboardInformationStore = create<dashboardInformationProps>((set, get) => ({
    isLoading: false,
    information: null,
    getInformation: async (userId: number) => {
        set({ isLoading: true });
        try {
            const response = await axios.get(`${baseUrl}/api/user-dashboard?userId=${userId}`);
            set({ information: response.data.data });
        } catch (error: unknown) {
            console.log(error instanceof Error ? error.message : error);
        } finally {
            set({ isLoading: false });
        }
    }
}));
export default useUserDashboardInformationStore;