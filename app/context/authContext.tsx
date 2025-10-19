"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, createContext, useContext, ReactNode } from "react";
import useAuthStore from "@/store/authStore";
import { userProps } from "@/global.t";
import { checkConnection } from "@/utils/checkConnection";
type AuthContextType = {
    user: userProps | null;
    isLoading: boolean;
    error: string | null | undefined;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useUser();
    const { signIn, user: authUser, isLoading, error, logout } = useAuthStore();
    useEffect(() => {
        checkConnection();
    }, []);
    useEffect(() => {
        if (user) {
            const email = user.emailAddresses[0]?.emailAddress;
            if (email) signIn(user.fullName || "", email, user.imageUrl || "/");
        } else {
            logout();
        }
    }, [user, signIn]);
    return (
        <AuthContext.Provider value={{ user: authUser, isLoading, error }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};