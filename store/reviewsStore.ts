import { create } from 'zustand';
import { baseUrl } from '@/global.t';
import toast from 'react-hot-toast';
import axios from 'axios';
type ReviewState = {
    isLoadingReviews: boolean;
    error: string | null;
    isUserReviewLoading: boolean;
    isCreatingOrUpdatingReview: boolean;
    userReview: any;
    reviews: any;
    userReviews: any;
    isDeletingReview: boolean;
    getReviews: () => Promise<void>;
    deleteReviews: (ids: number[]) => Promise<void>;
    getUsersReviews: (id: number, userId?: number | null) => Promise<void>;
    getUserReview: (productId: number, userId: number) => Promise<void>;
    deleteUserReview: (productId: number, userId: number) => Promise<void>;
    updateOrCreateReview: (productId: number, userId: number, comment: string, rating: number) => Promise<void>;
};
const useReviews = create<ReviewState>((set, get) => ({
    isUserReviewLoading: false,
    isDeletingReview: false,
    isLoadingReviews: false,
    error: null,
    isCreatingOrUpdatingReview: false,
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
    getUsersReviews: async (id: number, userId?: number | null) => {
        console.log(userId);
        set({ isLoadingReviews: true, error: null });
        try {
            const headers: any = {};
            if (userId) {
                headers['x-user-id'] = userId;
            }
            const response = await axios.get(`${baseUrl}/api/review/${id}`, {
                headers
            });
            set({ userReviews: response.data.reviews });
        } catch (error: unknown) {
            if (error instanceof Error) toast.error(error.message);
            else toast.error(String(error));
            set({ error: error instanceof Error ? error.message : String(error) });
        } finally {
            set({ isLoadingReviews: false });
        }
    },
    getUserReview: async (productId: number, userId: number) => {
        set({ isUserReviewLoading: true, error: null });
        try {
            const response = await axios.get(`${baseUrl}/api/review/user/${userId}/${productId}`);
            set({ userReview: response.data.userReview || null });
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                set({ userReview: null });
            } else if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error(String(error));
            }
        } finally {
            set({ isUserReviewLoading: false });
        }
    },
    deleteUserReview: async (productId: number, userId: number) => {
        set({ isDeletingReview: true, error: null });
        try {
            await axios.delete(`${baseUrl}/api/review/user/${userId}/${productId}`);
            toast.success(`Review deleted successfully!!`);
            get().getUserReview(productId, userId);
        } catch (error: unknown) {
            if (error instanceof Error) toast.error(error.message);
            else toast.error(String(error));
        } finally {
            set({ isDeletingReview: false });
        }
    },
    updateOrCreateReview: async (productId: number, userId: number, comment: string, rating: number) => {
        set({ isCreatingOrUpdatingReview: true });
        try {
            await axios.post(`${baseUrl}/api/review`, {
                userId,
                productId,
                rating,
                comment
            });
            toast.success(`Review created successfully!!`);
            get().getUserReview(productId, userId);
        } catch (error: unknown) {
            if (error instanceof Error) toast.error(error.message);
            else toast.error(String(error));
        } finally {
            set({ isCreatingOrUpdatingReview: false });
        }
    },
}));

export default useReviews;