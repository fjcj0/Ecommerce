import { create } from 'zustand';
import { baseUrl } from '@/global.t';
import toast from 'react-hot-toast';
import axios from 'axios';
type ReviewState = {
    isLoadingReviews: boolean;
    error: string | null;
    userReview: any;
    reviews: any;
    userReviews: any;
    getReviews: () => Promise<void>;
    deleteReviews: (ids: number[]) => Promise<void>;
    getUsersReviews: (id: number) => Promise<void>;
    getUserReview: (productId: number, userId: number) => Promise<void>;
    deleteUserReview: (productId: number, userId: number) => Promise<void>;
};
const useReviews = create<ReviewState>((set, get) => ({
    isLoadingReviews: false,
    error: null,
    userReview: null,
    reviews: [],
    userReviews: null,
    getReviews: async () => {
        set({ isLoadingReviews: true, error: null });
        try {
            const response = await axios.get(`${baseUrl}/api/review`);
            set({ reviews: response.data.reviews });
        } catch (error: unknown) {
            if (error instanceof Error) toast.error(error.message);
            else toast.error(String(error));
        } finally {
            set({ isLoadingReviews: false });
        }
    },
    deleteReviews: async (ids: number[]) => {
        set({ isLoadingReviews: true, error: null });
        try {
            await axios.delete(`${baseUrl}/api/review`, {
                data: { ids }
            });
            toast.success(`Review deleted successfully!!`)
        } catch (error: unknown) {
            if (error instanceof Error) toast.error(error.message);
            else toast.error(String(error));
        } finally {
            set({ isLoadingReviews: false });
        }
    },
    getUsersReviews: async (id: number) => {
        set({ isLoadingReviews: true, error: null });
        try {

        } catch (error: unknown) {
            if (error instanceof Error) toast.error(error.message);
            else toast.error(String(error));
        } finally {
            set({ isLoadingReviews: false });
        }
    },
    getUserReview: async (productId: number, userId: number) => {
        set({ isLoadingReviews: true, error: null });
        try {

        } catch (error: unknown) {
            if (error instanceof Error) toast.error(error.message);
            else toast.error(String(error));
        } finally {
            set({ isLoadingReviews: false });
        }
    },
    deleteUserReview: async (productId: number, userId: number) => {
        set({ isLoadingReviews: true, error: null });
        try {

        } catch (error: unknown) {
            if (error instanceof Error) toast.error(error.message);
            else toast.error(String(error));
        } finally {
            set({ isLoadingReviews: false });
        }
    },
}));
export default useReviews;