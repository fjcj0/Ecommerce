import axios from "axios";
import { baseUrl } from "@/global.t";
import { create } from 'zustand';
import toast from "react-hot-toast";
type UserState = {
    users: any[],
    deleteUsers: (userIds: string[]) => Promise<void>,
    getUsers: () => Promise<void>,
    isUsersLoading: boolean
}
const useUserStore = create<UserState>((set, get) => ({
    users: [],
    isUsersLoading: false,
    deleteUsers: async (userIds: string[]) => {
        try {
            await axios.delete(`${baseUrl}/api/admin-user`, {
                data: { ids: userIds }
            });
            set(state => ({
                users: state.users.filter(user => !userIds.includes(user.id))
            }));
            toast.success('Users deleted successfully');
        } catch (error: unknown) {
            if (error instanceof Error) toast.error(error.message);
            else toast.error(String(error));
        }
    },
    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const response = await axios.get(`${baseUrl}/api/admin-user`);
            set({ users: response?.data?.users });
        } catch (error: unknown) {
            if (error instanceof Error) toast.error(error.message);
            else toast.error(String(error));
        } finally {
            set({ isUsersLoading: false });
        }
    },
}));
export default useUserStore;