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
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-16">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
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
          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>
              By <strong className="text-gray-700">{article.author}</strong>
            </span>
            <span>•</span>
            <time>{article.publishedAt}</time>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 py-14">
        <article className="prose prose-lg prose-gray max-w-none">
          {article.content.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </article>
      </section>

      {/* Footer CTA */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Enjoyed this article?
          </h3>
          <p className="text-gray-600 mb-6">
            Explore more insights and practical guides to accelerate your
            professional growth.
          </p>
          <a
            href="/Pages/Blog"
            className="inline-block px-6 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
          >
            Back to Articles
          </a>
        </div>
      </section>
    </main>
  );
};

export default Page;
