"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useArticles } from "../../Context/ArticleContext";
import { useRouter } from "next/navigation";
import {
    FileText,
    Image as ImageIcon,
    Tag,
    Send,
    X,
    Loader2,
    AlertCircle,
    Layout
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function WriteArticlePage() {
    const { user, loading: authLoading } = useAuth();
    const { createArticle, loading: articleLoading } = useArticles();
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [currentTag, setCurrentTag] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Check permissions
    useEffect(() => {
        if (!authLoading && (!user || (user.role !== "employer" && user.role !== "admin"))) {
            toast.error("You are not authorized to write articles");
            router.push("/");
        }
    }, [user, authLoading, router]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const addTag = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && currentTag.trim()) {
            e.preventDefault();
            if (!tags.includes(currentTag.trim().toLowerCase())) {
                setTags([...tags, currentTag.trim().toLowerCase()]);
            }
            setCurrentTag("");
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(t => t !== tagToRemove));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !content) {
            toast.error("Title and Content are required");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("excerpt", excerpt);
        formData.append("content", content);
        tags.forEach(tag => formData.append("tags[]", tag));
        if (image) {
            formData.append("image", image);
        }

        try {
            await createArticle(formData);
        } catch (error) {
            // Error handled in context
        }
    };

    if (authLoading) return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="animate-spin text-primary-500" size={40} />
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12">
            <div className="container-custom max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800"
                >
                    {/* Header */}
                    <div className="gradient-primary p-8 text-white">
                        <div className="flex items-center gap-3 mb-2">
                            <FileText size={24} />
                            <span className="text-sm font-bold uppercase tracking-widest opacity-80">Creator Studio</span>
                        </div>
                        <h1 className="text-3xl font-black font-heading">Write New Article</h1>
                        <p className="opacity-80 mt-2">Share your industry insights and tips with the JobFinder community.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        {/* Title Section */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                Article Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="How to ace your next MERN stack interview..."
                                className="w-full px-5 py-4 rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary-500 text-lg font-bold"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Thumbnail Image</label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="relative h-64 w-full rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors overflow-hidden group"
                            >
                                {imagePreview ? (
                                    <>
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <p className="text-white font-bold flex items-center gap-2">
                                                <ImageIcon size={20} /> Change Image
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                                            <ImageIcon className="text-slate-400" size={32} />
                                        </div>
                                        <p className="text-slate-500 font-medium">Click to upload thumbnail</p>
                                        <p className="text-xs text-slate-400 mt-1">Recommended: 1200x630 (PNG, JPG)</p>
                                    </>
                                )}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>

                        {/* Excerpt */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Short Excerpt</label>
                            <textarea
                                placeholder="A brief summary that appears on the feed..."
                                className="w-full px-5 py-4 rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary-500 h-24 resize-none text-sm"
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                            />
                        </div>

                        {/* Content Section */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                Content <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                placeholder="Start writing your article here..."
                                className="w-full px-5 py-4 rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary-500 min-h-[400px] resize-y custom-scrollbar"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>

                        {/* Tags */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                <Tag size={16} /> Tags
                            </label>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="flex items-center gap-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-3 py-1.5 rounded-full text-xs font-bold"
                                    >
                                        #{tag}
                                        <X size={12} className="cursor-pointer hover:text-red-500" onClick={() => removeTag(tag)} />
                                    </span>
                                ))}
                            </div>
                            <input
                                type="text"
                                placeholder="Add tags and press Enter..."
                                className="w-full px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary-500 text-sm"
                                value={currentTag}
                                onChange={(e) => setCurrentTag(e.target.value)}
                                onKeyDown={addTag}
                            />
                        </div>

                        {/* Footer Actions */}
                        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-slate-400 text-xs">
                                <AlertCircle size={14} />
                                <span>Article will be published as <b>{user?.name}</b> from <b>{user?.company?.name || "Company"}</b></span>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => router.back()}
                                    className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                >
                                    Discard
                                </button>
                                <button
                                    type="submit"
                                    disabled={articleLoading}
                                    className="btn-primary flex items-center gap-2 px-8 py-3 shadow-lg shadow-primary-500/30 disabled:opacity-50"
                                >
                                    {articleLoading ? (
                                        <Loader2 size={20} className="animate-spin" />
                                    ) : (
                                        <Send size={20} />
                                    )}
                                    Publish Article
                                </button>
                            </div>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
