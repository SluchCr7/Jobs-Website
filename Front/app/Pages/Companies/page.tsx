"use client";

import { companies } from "@/app/utils/Data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center py-20 px-4 md:px-8 bg-slate-50 dark:bg-slate-900 transition-colors">

      {/* Hero Section */}
      <div className="max-w-3xl text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white tracking-tight mb-4">
          Explore Top Companies
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          Discover opportunities from the world’s leading tech companies.
          Browse company profiles, explore open roles, and find the right place
          to grow your career.
        </p>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        {companies.map((company) => (
          <div
            key={company.id}
            className="group bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col justify-between transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 relative bg-slate-50 dark:bg-slate-700 rounded-xl p-2 flex items-center justify-center overflow-hidden">
                  <Image
                    src={company.logoUrl}
                    alt={company.name}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors">
                    {company.name}
                  </h3>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    {company.location}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
              {company.description}
            </p>

            <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-700">
              <span className="text-sm font-semibold text-primary-600 bg-primary-50 dark:bg-primary-900/20 px-3 py-1 rounded-full">
                {company.jobsCount} open jobs
              </span>

              <Link
                href={`/Pages/Company/${company.id}`}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1 group/link"
              >
                View Profile
                <span className="group-hover/link:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Page;
