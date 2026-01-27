"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bell, CheckCheck, Trash2, ExternalLink, Inbox, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNotifications } from "../Context/NotificationContext";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { cn } from "../utils/cn";

export default function NotificationMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification, loading } = useNotifications();
    const menuRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "application": return <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600"><ExternalLink size={14} /></div>;
            case "message": return <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600"><Inbox size={14} /></div>;
            case "job": return <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600"><Bell size={14} /></div>;
            default: return <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600"><Bell size={14} /></div>;
        }
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all relative group"
                aria-label="Notifications"
            >
                <Bell size={20} className={cn("transition-transform", isOpen && "scale-110")} />
                {unreadCount > 0 && (
                    <span className="absolute top-2 right-2.5 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center animate-in zoom-in duration-300">
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        className="absolute right-0 top-full mt-3 w-[350px] sm:w-[400px] glass-strong rounded-2xl shadow-2xl overflow-hidden origin-top-right border border-slate-200/50 dark:border-slate-700/50 z-[60]"
                    >
                        {/* Header */}
                        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white/50 dark:bg-slate-900/50">
                            <div>
                                <h3 className="text-base font-bold text-slate-900 dark:text-white">Notifications</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">You have {unreadCount} unread messages</p>
                            </div>
                            {unreadCount > 0 && (
                                <button
                                    onClick={markAllAsRead}
                                    className="text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
                                >
                                    <CheckCheck size={14} /> Mark all read
                                </button>
                            )}
                        </div>

                        {/* List */}
                        <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                            {loading && notifications.length === 0 ? (
                                <div className="py-10 flex flex-col items-center justify-center text-slate-400">
                                    <Loader2 size={24} className="animate-spin mb-2" />
                                    <p className="text-sm">Loading notifications...</p>
                                </div>
                            ) : notifications.length > 0 ? (
                                <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
                                    {notifications.map((notification) => (
                                        <div
                                            key={notification._id}
                                            className={cn(
                                                "p-4 flex gap-4 transition-colors relative group",
                                                !notification.isRead ? "bg-primary-50/30 dark:bg-primary-500/5" : "hover:bg-slate-50 dark:hover:bg-slate-800/30"
                                            )}
                                        >
                                            <div className="flex-shrink-0 pt-1">
                                                {getTypeIcon(notification.type)}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2">
                                                    <h4 className={cn("text-sm font-semibold truncate", !notification.isRead ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400")}>
                                                        {notification.title}
                                                    </h4>
                                                    <span className="text-[10px] text-slate-400 whitespace-nowrap pt-0.5">
                                                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                                                    {notification.message}
                                                </p>

                                                <div className="flex items-center gap-3 mt-3">
                                                    {notification.link && (
                                                        <Link
                                                            href={notification.link}
                                                            onClick={() => {
                                                                markAsRead(notification._id);
                                                                setIsOpen(false);
                                                            }}
                                                            className="text-[11px] font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 transition-colors flex items-center gap-1"
                                                        >
                                                            View Details <ExternalLink size={10} />
                                                        </Link>
                                                    )}
                                                    {!notification.isRead && !notification.link && (
                                                        <button
                                                            onClick={() => markAsRead(notification._id)}
                                                            className="text-[11px] font-bold text-primary-600 dark:text-primary-400"
                                                        >
                                                            Mark as read
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Delete Button - Visible on hover */}
                                            <button
                                                onClick={() => deleteNotification(notification._id)}
                                                className="absolute right-2 bottom-2 p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 opacity-0 group-hover:opacity-100 transition-all"
                                                title="Delete"
                                            >
                                                <Trash2 size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-12 flex flex-col items-center justify-center text-slate-400 bg-slate-50/30 dark:bg-slate-900/10">
                                    <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                                        <Bell size={24} className="text-slate-300 dark:text-slate-600" />
                                    </div>
                                    <p className="text-sm font-medium">All caught up!</p>
                                    <p className="text-xs">No new notifications for you.</p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-3 border-t border-slate-100 dark:border-slate-800 text-center bg-white/50 dark:bg-slate-900/50">
                            <button className="text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
                                View All Notification Activity
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
