import { create } from "zustand";
import axios from "axios";
import { baseUrl, userProps } from "@/global.t";
type AuthState = {
    isLoading: boolean;
    user: userProps | null;
    error: string | null | undefined;
    signIn: (fullName: string, email: string, profilePicture: string) => Promise<void>;
    logout: () => Promise<void>;
};
const useAuthStore = create<AuthState>((set) => ({
    isLoading: false,
    user: null,
    error: null,
    signIn: async (fullName: string, email: string, imageUrl: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${baseUrl}/api/users`, {
                email,
                fullName,
                imageUrl
            });
            set({ user: response.data.user });
        } catch (error: unknown) {
            const message =
                error instanceof Error ? error.message
                    : typeof error === "string" ? error
                        : "An unexpected error occurred";

            set({ error: message });
        } finally {
            set({ isLoading: false })
        }
    },
    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            set({ user: null });
        } catch (error: unknown) {
            const message =
                error instanceof Error ? error.message
                    : typeof error === "string" ? error
                        : "An unexpected error occurred";
            set({ error: message });
        }
        finally {
            set({ isLoading: false })
        }
    },
}));
export default useAuthStore;