"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/Context/AuthContext";
import { toast } from "sonner";
import { X, User, Mail, FileText, Upload, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
    const { user, updateProfile, updateAvatar } = useAuth();
    const [loading, setLoading] = useState(false);
    const [avatarLoading, setAvatarLoading] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        bio: "",
    });

    // Initialize form with user data
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                bio: user.bio || "",
            });
            setAvatarPreview(user.avatar?.url || null);
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size should be less than 5MB");
            return;
        }

        // Preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatarPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Upload
        setAvatarLoading(true);
        try {
            const formData = new FormData();
            formData.append("avatar", file);
            await updateAvatar(formData);
            toast.success("Avatar updated successfully!");
        } catch (error) {
            console.error("Avatar upload error:", error);
            // Reset preview on error
            setAvatarPreview(user?.avatar?.url || null);
        } finally {
            setAvatarLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email) {
            toast.error("Name and email are required");
            return;
        }

        setLoading(true);
        try {
            await updateProfile(formData);
            toast.success("Profile updated successfully!");
            onClose();
        } catch (error) {
            console.error("Update profile error:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden pointer-events-auto"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                                <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">
                                    Edit Profile
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center justify-center transition-colors"
                                >
                                    <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                                </button>
                            </div>

                            {/* Content */}
                            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">

                                {/* Avatar Upload */}
                                <div className="mb-8 flex flex-col items-center">
                                    <div className="relative group">
                                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-700">
                                            {avatarPreview ? (
                                                <Image
                                                    src={avatarPreview}
                                                    alt="Avatar"
                                                    width={128}
                                                    height={128}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <User className="w-12 h-12 text-slate-400" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Upload Overlay */}
                                        <label
                                            htmlFor="avatar-upload"
                                            className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                        >
                                            {avatarLoading ? (
                                                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <Camera className="w-8 h-8 text-white" />
                                            )}
                                        </label>
                                        <input
                                            id="avatar-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleAvatarChange}
                                            disabled={avatarLoading}
                                            className="hidden"
                                        />
                                    </div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">
                                        Click to upload new avatar
                                    </p>
                                </div>

                                {/* Name */}
                                <div className="mb-6">
                                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="John Doe"
                                            className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition dark:text-white"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="mb-6">
                                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                                        Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="john@example.com"
                                            className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition dark:text-white"
                                        />
                                    </div>
                                </div>

                                {/* Bio */}
                                <div className="mb-6">
                                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                                        Bio
                                    </label>
                                    <div className="relative">
                                        <FileText className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                                        <textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleChange}
                                            rows={4}
                                            placeholder="Tell us about yourself..."
                                            maxLength={300}
                                            className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition dark:text-white resize-none"
                                        />
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 text-right">
                                        {formData.bio.length}/300 characters
                                    </p>
                                </div>

                                {/* Role Badge (Read-only) */}
                                <div className="mb-6">
                                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                                        Account Type
                                    </label>
                                    <div className="px-4 py-3 bg-slate-100 dark:bg-slate-700 rounded-xl">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                                            {user.role === "employer" ? "Employer" : user.role === "admin" ? "Admin" : "Job Seeker"}
                                        </span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="flex-1 px-6 py-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-xl font-bold transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 px-6 py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-400 text-white rounded-xl font-bold shadow-lg shadow-primary-500/25 transition-all flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            "Save Changes"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
