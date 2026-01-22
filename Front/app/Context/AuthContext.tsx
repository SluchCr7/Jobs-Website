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
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    hasCompany: boolean; // Helper to check if user has a company
    register: (data: any) => Promise<void>;
    login: (data: any) => Promise<void>;
    logout: () => void;
    updateProfile: (data: any) => Promise<void>;
    updateAvatar: (formData: FormData) => Promise<void>;
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
                    // Optional: Verify token validity here with a backend call
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
            setLoading(true); // Set loading true during request
            const response = await API.post("/auth/login", data);
            const { user, message } = response.data;

            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));
            toast.success(message || "Login successful");
            router.push("/"); // Redirect to home or dashboard
        } catch (error: any) {
            console.error("Login Error:", error);
            toast.error(error.response?.data?.message || "Login failed");
            throw error; // Re-throw for component to handle if needed
        } finally {
            setLoading(false);
        }
    };

    const register = async (data: any) => {
        try {
            setLoading(true);
            const response = await API.post("/auth/register", data);

            // Backend now returns { user, token, message }
            const { user, message } = response.data;

            if (user && user.token) {
                setUser(user);
                localStorage.setItem("user", JSON.stringify(user));
                toast.success(message || "Registration successful");

                // EMPLOYER FLOW: Check if employer needs to create company
                if (user.role === "employer") {
                    if (!user.company) {
                        // Redirect to create company page
                        router.push("/Pages/CreateCompany");
                    } else {
                        // Already has company, go to dashboard/jobs
                        router.push("/Pages/Jobs");
                    }
                } else {
                    // JOB SEEKER FLOW: Go to job listings
                    router.push("/Pages/Jobs");
                }
            } else {
                // Fallback if backend doesn't return auto-login data
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

    // Computed value: check if user has a company
    const hasCompany = user?.company ? true : false;

    return (
        <AuthContext.Provider value={{ user, loading, hasCompany, login, register, logout, updateProfile, updateAvatar }}>
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
