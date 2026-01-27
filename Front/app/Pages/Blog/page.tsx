"use client";

import React from "react";
import { useArticles } from "../../Context/ArticleContext";
import { useRouter } from "next/navigation";
import { Loader2, Calendar, User, ArrowRight, Eye } from "lucide-react";
import { motion } from "framer-motion";

const BlogPage = () => {
  const { articles, loading } = useArticles();
  const router = useRouter();

  if (loading && articles.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary-500" size={40} />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 px-6 py-24 transition-colors">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto mb-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 text-sm font-semibold mb-6"
        >
          Knowledge Center
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-heading font-black text-slate-900 dark:text-white mb-6 tracking-tight"
        >
          Articles & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Company Insights</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 20 }}
          transition={{ delay: 0.1 }}
          className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Discover stories, insights, and expert advice from top companies and industry leaders to help you navigate your career journey.
        </motion.p>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <motion.article
              key={article._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => router.push(`/Pages/Article/${article.slug}`)}
              className="group bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 border border-slate-200 dark:border-slate-800 flex flex-col cursor-pointer overflow-hidden transform"
            >
              {/* Image Container */}
              <div className="h-56 relative overflow-hidden">
                <img
                  src={article.image.url}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Float Company Logo */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white p-1 shadow-lg">
                    <img
                      src={typeof article.company.logo === 'string' ? article.company.logo : article.company.logo?.url}
                      alt={article.company.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-white text-xs font-bold drop-shadow-md">{article.company.name}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-1 bg-white dark:bg-slate-900">
                <div className="flex items-center gap-3 mb-4">
                  {article.tags.slice(0, 2).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-black uppercase tracking-widest bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 px-3 py-1.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 transition-colors font-heading leading-tight line-clamp-2">
                  {article.title}
                </h2>

                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1 text-sm line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Meta Information */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800 mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary-100 dark:border-primary-900/30">
                      <img src={article.author.avatar.url} alt={article.author.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-black tracking-tighter">Author</p>
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{article.author.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-slate-400">
                    <div className="flex items-center gap-1 text-[10px]">
                      <Eye size={12} />
                      {article.views}
                    </div>
                    <ArrowRight size={16} className="text-primary-500 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <h3 className="text-2xl font-bold text-slate-400">No articles found yet.</h3>
          </div>
        )}
      </section>
    </main>
  );
};

export default BlogPage;
