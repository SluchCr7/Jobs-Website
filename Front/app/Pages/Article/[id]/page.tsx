import React from "react";
import { articles } from "@/app/utils/Data";
import { notFound } from "next/navigation";

type Params = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Params) => {
  const articleId = Number(params.id);
  const article = articles.find((a) => a.id === articleId);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans transition-colors">
      {/* Hero Section */}
      <section className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 relative overflow-hidden pt-24 pb-16">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.map((tag, index) => (
              <span
                key={index}
                className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white leading-tight mb-8">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 text-sm font-medium text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 font-bold">
                {article.author[0]}
              </div>
              <span>{article.author}</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
            <time>{article.publishedAt}</time>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <article className="prose prose-lg prose-slate dark:prose-invert max-w-none">
          {article.content.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-6 leading-relaxed text-slate-700 dark:text-slate-300">
              {paragraph}
            </p>
          ))}
        </article>
      </section>

      {/* Footer CTA */}
      <section className="bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 font-heading">
            Enjoyed this article?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-lg mx-auto">
            Explore more insights and practical guides to accelerate your
            professional growth in our blog.
          </p>
          <a
            href="/Pages/Blog"
            className="btn-primary inline-flex items-center gap-2 px-8 py-3 shadow-lg shadow-primary-500/20"
          >
            Back to Articles
          </a>
        </div>
      </section>
    </main>
  );
};

export default Page;
