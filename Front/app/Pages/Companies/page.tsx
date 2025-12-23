"use client";

import { companies } from "@/app/utils/Data";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiArrowRight, FiSearch } from "react-icons/fi";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const CompaniesListingPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center py-24 px-4 md:px-8 bg-slate-50 dark:bg-slate-900 transition-colors">

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl text-center mb-20"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-100 dark:border-primary-800 text-primary-700 dark:text-primary-300 text-xs font-bold mb-6">
          <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
          Top Rated Companies
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-slate-900 dark:text-white tracking-tight mb-6">
          Discover <span className="text-primary-600">Top Workplaces</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          Explore profiles from the world's most innovative companies.
          Learn about their culture, benefits, and find your next dream role.
        </p>

        {/* Simple Search Bar */}
        <div className="mt-10 max-w-xl mx-auto relative group">
          <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors text-xl" />
          <input
            type="text"
            placeholder="Search companies by name or location..."
            className="w-full pl-14 pr-6 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm focus:ring-2 focus:ring-primary-100 outline-none transition-all placeholder-slate-400"
          />
        </div>
      </motion.div>

      {/* Companies Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl"
      >
        {companies.map((company) => (
          <motion.div
            key={company.id}
            variants={itemVariants}
            className="group bg-white dark:bg-slate-800 rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-primary-900/5 border border-slate-100 dark:border-slate-700 p-8 flex flex-col justify-between transition-all duration-500 relative overflow-hidden"
          >
            {/* Top Border Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 relative bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-4 flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-600 group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src={company.logoUrl}
                    alt={company.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors mb-1">
                    {company.name}
                  </h3>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <FiMapPin className="text-primary-500" />
                    {company.location}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-8 line-clamp-3 font-medium opacity-80">
              {company.description || "Building the next generation of digital experiences. We focus on innovation and inclusive growth."}
            </p>

            <div className="flex justify-between items-center pt-6 border-t border-slate-50 dark:border-slate-700">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Opportunities</span>
                <span className="text-lg font-bold text-primary-600">
                  {company.jobsCount} Open Roles
                </span>
              </div>

              <Link
                href={`/Pages/Company/${company.id}`}
                className="btn-primary !px-5 !py-2 !text-sm flex items-center gap-2 group-hover:shadow-primary-500/20"
              >
                View Profile
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-24 w-full max-w-7xl bg-slate-900 dark:bg-primary-950 rounded-[3rem] p-12 md:p-16 text-center text-white relative overflow-hidden"
      >
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">List Your Company</h2>
          <p className="text-slate-300 mb-10 text-lg">Reach thousands of talented developers and designers looking for their next move.</p>
          <button className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-bold hover:bg-slate-100 transition shadow-xl shadow-black/20">
            Get Started Now
          </button>
        </div>
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </motion.div>

    </div>
  );
};

export default CompaniesListingPage;
