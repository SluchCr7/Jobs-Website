'use client'
import React from "react";
import { articles } from "@/app/utils/Data";
import { useRouter } from "next/navigation";

const Page = () => {
  const route = useRouter();
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 px-6 py-24 transition-colors">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto mb-20 text-center relative z-10">
        <div className="inline-block px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 text-sm font-semibold mb-6 animate-pulse">
          Latest Updates
        </div>
        <h1 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 dark:text-white mb-6">
          Articles & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Insights</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Expert-written articles to help you grow your career, improve your
          skills, and stay ahead in the modern tech industry.
        </p>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
        {articles.map((article) => (
          <article
            key={article.id}
            onClick={() => route.push(`/Pages/Article/${article.id}`)}
            className="group bg-white dark:bg-slate-800 rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 border border-slate-100 dark:border-slate-700 flex flex-col cursor-pointer overflow-hidden transform hover:-translate-y-2"
          >
            {/* Header Image Placeholder (Optional) */}
            <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col flex-1">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-[10px] font-bold uppercase tracking-wider bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 transition-colors font-heading">
                {article.title}
              </h2>

              {/* Excerpt */}
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1 text-sm">
                {article.excerpt}
              </p>

              {/* Meta */}
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mt-auto pt-6 border-t border-slate-100 dark:border-slate-700">
                <span className="flex items-center gap-2"> By {article.author}</span>
                <time>{article.publishedAt}</time>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Page;
