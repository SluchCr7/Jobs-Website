'use client'
import React from "react";
import { articles } from "@/app/utils/Data";
import { useRouter } from "next/navigation";

const Page = () => {
    const route = useRouter();
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Articles & Insights
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Expert-written articles to help you grow your career, improve your
          skills, and stay ahead in the modern tech industry.
        </p>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col"
          >
            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs font-medium bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {article.title}
              </h2>

              {/* Excerpt */}
              <p className="text-gray-600 mb-6 leading-relaxed flex-1">
                {article.excerpt}
              </p>

              {/* Meta */}
              <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
                <span>{article.author}</span>
                <time>{article.publishedAt}</time>
              </div>
            </div>

            {/* Action */}
            <div className="border-t border-gray-100 p-4">
              <button onClick={()=>route.push(`/Pages/Article/${article.id}`)} className="w-full text-center text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
                Read Full Article →
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Page;
