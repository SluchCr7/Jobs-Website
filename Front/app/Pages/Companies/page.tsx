"use client";

import { companies } from "@/app/utils/Data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="w-full flex flex-col items-center py-14 px-6">

      {/* Hero Section */}
      <div className="max-w-3xl text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          Explore Top Companies Hiring Now
        </h1>
        <p className="mt-4 text-gray-600 text-lg leading-relaxed">
          Discover opportunities from the world’s leading tech companies.
          Browse company profiles, explore open roles, and find the right place
          to grow your career.
        </p>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {companies.map((company) => (
          <div
            key={company.id}
            className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all p-6 flex flex-col justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 relative">
                <Image
                  src={company.logoUrl}
                  alt={company.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {company.name}
                </h3>
                <p className="text-sm text-gray-500">{company.location}</p>
              </div>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              {company.description}
            </p>

            <div className="flex justify-between items-center mt-2">
              <span className="text-sm font-medium text-blue-600">
                {company.jobsCount} open jobs
              </span>

              <Link
                // href={company.website}
                href={`/Pages/Company/${company.id}`}
                target="_blank"
                className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
              >
                View Jobs
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default page;
