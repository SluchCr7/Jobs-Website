"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import API from "../utils/axios";
import { Notification } from "../utils/Types";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

interface NotificationContextType {
    notifications: Notification[];
    unreadCount: number;
    loading: boolean;
    fetchNotifications: () => Promise<void>;
    markAsRead: (id: string) => Promise<void>;
    markAllAsRead: () => Promise<void>;
    deleteNotification: (id: string) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const { user } = useAuth();

    const fetchNotifications = useCallback(async () => {
        if (!user) return;
        try {
            setLoading(true);
            const [notifsRes, countRes] = await Promise.all([
                API.get("/notifications"),
                API.get("/notifications/unread/count"),
            ]);
            setNotifications(notifsRes.data);
            setUnreadCount(countRes.data.count);
        } catch (error) {
            console.error("Failed to fetch notifications", error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    const markAsRead = async (id: string) => {
        try {
            await API.patch(`/notifications/${id}/read`);
            setNotifications((prev) =>
                prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
            );
            setUnreadCount((prev) => Math.max(0, prev - 1));
        } catch (error) {
            toast.error("Failed to mark notification as read");
        }
    };

    const markAllAsRead = async () => {
        try {
            await API.patch("/notifications/mark-all-read");
            setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
            setUnreadCount(0);
            toast.success("All notifications marked as read");
        } catch (error) {
            toast.error("Failed to mark all as read");
        }
    };

    const deleteNotification = async (id: string) => {
        try {
            const notification = notifications.find(n => n._id === id);
            await API.delete(`/notifications/${id}`);
            setNotifications((prev) => prev.filter((n) => n._id !== id));
            if (notification && !notification.isRead) {
                setUnreadCount((prev) => Math.max(0, prev - 1));
            }
        } catch (error) {
            toast.error("Failed to delete notification");
        }
    };

    // Fetch notifications on mount or when user changes
    useEffect(() => {
        if (user) {
            fetchNotifications();

            // Polling every 60 seconds (optional, but professional)
            const interval = setInterval(fetchNotifications, 60000);
            return () => clearInterval(interval);
        } else {
            setNotifications([]);
            setUnreadCount(0);
        }
    }, [user, fetchNotifications]);

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                unreadCount,
                loading,
                fetchNotifications,
                markAsRead,
                markAllAsRead,
                deleteNotification,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotifications must be used within a NotificationProvider");
    }
    return context;
};
