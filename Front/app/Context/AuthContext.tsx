"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../utils/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Define User Interface based on Backend Model
export interface User {
    _id: string;
    name: string;
    email: string;
    role: "user" | "employer" | "admin";
    avatar: {
        url: string;
        publicId: string | null;
    };
    bio?: string;
    resume?: string;
    company?: any; // Company object or ID
    isVerified: boolean;
    createdAt?: string;
    updatedAt?: string;
    token?: string; // Token is appended on login
    skills?: string[];
    experience?: any[];
    savedJobs?: string[]; // Array of Job IDs
}

interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    loading: boolean;
    hasCompany: boolean; // Helper to check if user has a company
    register: (data: any) => Promise<void>;
    login: (data: any) => Promise<void>;
    logout: () => void;
    updateProfile: (data: any) => Promise<void>;
    updateAvatar: (formData: FormData) => Promise<void>;
    verifyEmail: (code: string) => Promise<void>;
    resendOTP: () => Promise<void>;
    oauthLogin: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser) {
                    setUser(parsedUser);
                }
            } catch (error) {
                console.error("Failed to parse user from local storage", error);
                localStorage.removeItem("user");
            }
        }
        setLoading(false);
    }, []);

    const login = async (data: any) => {
        try {
            setLoading(true);
            const response = await API.post("/auth/login", data);
            const { user, message } = response.data;

            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));
            toast.success(message || "Login successful");
            
            if (!user.isVerified) {
                router.push("/Pages/VerifyEmail");
            } else {
                router.push("/");
            }
        } catch (error: any) {
            console.error("Login Error:", error);
            toast.error(error.response?.data?.message || "Login failed");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const register = async (data: any) => {
        try {
            setLoading(true);
            const response = await API.post("/auth/register", data);
            const { user, message } = response.data;

            if (user && user.token) {
                setUser(user);
                localStorage.setItem("user", JSON.stringify(user));
                toast.success(message || "Registration successful");
                router.push("/Pages/VerifyEmail");
            } else {
                toast.success(message || "Registration successful. Please login.");
                router.push("/Pages/Login");
            }
        } catch (error: any) {
            console.error("Register Error:", error);
            toast.error(error.response?.data?.message || "Registration failed");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const verifyEmail = async (code: string) => {
        try {
            setLoading(true);
            const response = await API.post("/auth/verify-email", { code });
            const { message } = response.data;

            // Re-fetch profile to update verified status
            const profileRes = await API.get("/user/profile");
            const updatedUser = { ...user, ...profileRes.data };
            setUser(updatedUser as User);
            localStorage.setItem("user", JSON.stringify(updatedUser));
            toast.success(message || "Email verified successfully");
        } catch (error: any) {
            console.error("Verification Error:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const resendOTP = async () => {
        try {
            setLoading(true);
            const response = await API.post("/auth/resend-otp");
            toast.success(response.data?.message || "OTP resent to your email");
        } catch (error: any) {
            console.error("Resend OTP Error:", error);
            toast.error(error.response?.data?.message || "Failed to resend OTP");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        toast.info("Logged out successfully");
        router.push("/Pages/Login");
    };

    const updateProfile = async (data: any) => {
        try {
            setLoading(true);
            const response = await API.put("/user/update", data);
            // Update local state with new data (merge)
            // Note: Backend might return the updated user or just message.
            // Assuming it might return updated info, or we just update local state optimistically
            // Let's check response structure if needed, but for now:

            // We need to re-fetch profile or update local state
            // For simplicity, let's fetch profile:
            const profileRes = await API.get("/user/profile");
            const updatedUser = { ...user, ...profileRes.data }; // Maintain token

            setUser(updatedUser as User);
            localStorage.setItem("user", JSON.stringify(updatedUser));
            toast.success("Profile updated");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Update failed");
        } finally {
            setLoading(false);
        }
    };

    const updateAvatar = async (formData: FormData) => {
        try {
            setLoading(true);
            const response = await API.put("/user/avatar", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            // Re-fetch profile to get new avatar url
            const profileRes = await API.get("/user/profile");
            const updatedUser = { ...user, ...profileRes.data };

            setUser(updatedUser as User);
            localStorage.setItem("user", JSON.stringify(updatedUser)); // Update storage
            toast.success("Avatar updated");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Avatar update failed");
        } finally {
            setLoading(false);
        }
    }

    const oauthLogin = async (token: string) => {
        try {
            setLoading(true);
            localStorage.setItem("user", JSON.stringify({ token }));
            const response = await API.get("/user/profile");
            const user = { ...response.data, token };
            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));
            toast.success("Login successful");
            router.push("/");
        } catch (error: any) {
            console.error("OAuth Login Error", error);
            localStorage.removeItem("user");
            toast.error("Authentication failed");
            router.push("/Pages/Login");
        } finally {
            setLoading(false);
        }
    };

    // Computed value: check if user has a company
    const hasCompany = user?.company ? true : false;

    return (
        <AuthContext.Provider value={{ 
            user, 
            setUser, 
            loading, 
            hasCompany, 
            login, 
            register, 
            logout, 
            updateProfile, 
            updateAvatar, 
            oauthLogin,
            verifyEmail,
            resendOTP
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
