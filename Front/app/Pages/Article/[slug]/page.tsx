"use client";

import React, { useEffect, useState } from "react";
import { useArticles } from "../../../Context/ArticleContext";
import { useParams, useRouter } from "next/navigation";
import {
    Calendar,
    User,
    ArrowLeft,
    Share2,
    MessageCircle,
    Eye,
    Clock,
    Loader2,
    Building2
} from "lucide-react";
import { motion } from "framer-motion";
import { Article } from "../../../utils/Types";
import { format } from "date-fns";

export default function ArticleDetailPage() {
    const { slug } = useParams();
    const { fetchArticleBySlug } = useArticles();
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const getArticle = async () => {
            if (typeof slug === "string") {
                const data = await fetchArticleBySlug(slug);
                setArticle(data);
            }
            setLoading(false);
        };
        getArticle();
    }, [slug, fetchArticleBySlug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin text-primary-500" size={40} />
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Article not found</h2>
                <button onClick={() => router.push("/Pages/Blog")} className="btn-primary">Back to Blog</button>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors pt-20">
            {/* Article Header */}
            <header className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
                <img
                    src={article.image.url}
                    alt={article.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end">
                    <div className="container-custom pb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-4xl"
                        >
                            <div className="flex flex-wrap gap-2 mb-6">
                                {article.tags.map((tag, idx) => (
                                    <span key={idx} className="bg-primary-500 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-primary-500/20">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <h1 className="text-4xl md:text-6xl font-black font-heading text-white leading-tight mb-8 drop-shadow-2xl">
                                {article.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-white/90">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full border-2 border-white/20 overflow-hidden">
                                        <img src={article.author.avatar.url} alt={article.author.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-black tracking-tighter opacity-70">Published By</p>
                                        <p className="font-bold">{article.author.name}</p>
                                    </div>
                                </div>

                                <div className="h-8 w-px bg-white/20 hidden md:block" />

                                <div className="flex items-center gap-10">
                                    <div className="flex flex-col">
                                        <p className="text-[10px] uppercase font-black tracking-tighter opacity-70">Date</p>
                                        <div className="flex items-center gap-2 font-bold text-sm">
                                            <Calendar size={14} />
                                            {format(new Date(article.createdAt), "MMM dd, yyyy")}
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <p className="text-[10px] uppercase font-black tracking-tighter opacity-70">Views</p>
                                        <div className="flex items-center gap-2 font-bold text-sm">
                                            <Eye size={14} />
                                            {article.views}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </header>

            {/* Article Content */}
            <section className="container-custom py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <article className="prose prose-xl prose-slate dark:prose-invert max-w-none">
                            <div
                                className="text-slate-700 dark:text-slate-300 leading-loose text-lg whitespace-pre-wrap"
                                dangerouslySetInnerHTML={{ __html: article.content }}
                            />
                        </article>

                        {/* Tags Bottom */}
                        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <p className="text-sm font-bold text-slate-500">Filed under:</p>
                                <div className="flex flex-wrap gap-2">
                                    {article.tags.map((tag, idx) => (
                                        <span key={idx} className="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-800">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-8">
                        {/* Company Info Card */}
                        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-white p-2 shadow-sm border border-slate-100">
                                    <img
                                        src={typeof article.company.logo === 'string' ? article.company.logo : article.company.logo?.url}
                                        alt={article.company.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black font-heading text-slate-900 dark:text-white">{article.company.name}</h3>
                                    <div className="flex items-center gap-1 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-widest mt-1">
                                        <Building2 size={12} /> verified company
                                    </div>
                                </div>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                                Explore more articles and job opportunities from {article.company.name} on JobFinder.
                            </p>
                            <button
                                onClick={() => router.push(`/Pages/Company/${article.company._id}`)}
                                className="w-full btn-primary py-3 rounded-xl shadow-lg shadow-primary-500/20"
                            >
                                View Company Profile
                            </button>
                        </div>

                        {/* Newsletter or CTA */}
                        <div className="gradient-primary rounded-3xl p-8 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                            <h3 className="text-2xl font-black font-heading mb-4 relative z-10">Stay Updated</h3>
                            <p className="text-white/80 text-sm mb-6 relative z-10 font-medium">
                                Subscribe to our newsletter to receive the latest career advice directly in your inbox.
                            </p>
                            <div className="flex gap-2 relative z-10">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 flex-1 text-sm placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                                />
                                <button className="bg-white text-primary-600 px-4 py-2 rounded-xl text-sm font-black hover:bg-slate-100 transition-colors">
                                    Join
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}
