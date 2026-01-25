"use client";

import { useCompanies } from "@/app/Context/CompanyContext";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMapPin, FiArrowRight, FiSearch, FiBriefcase,
  FiGlobe, FiUsers, FiStar, FiFilter
} from "react-icons/fi";

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
  const { companies, loading } = useCompanies();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCompanies = useMemo(() => {
    return companies.filter(c =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [companies, searchQuery]);

  if (loading && companies.length === 0) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary-500/20 rounded-full" />
            <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0" />
          </div>
          <p className="text-slate-500 font-bold tracking-widest uppercase text-xs animate-pulse">Initializing Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center py-24 pb-32 px-4 md:px-8 bg-slate-50/50 dark:bg-slate-950 transition-colors relative overflow-hidden">

      {/* Background Orbs */}
      <div className="absolute top-0 -left-64 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -right-64 w-[600px] h-[600px] bg-accent-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl text-center mb-24 relative z-10"
      >
        <span className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-black uppercase tracking-[0.2em] mb-6 shadow-sm">
          World Class Partners
        </span>
        <h1 className="text-5xl md:text-7xl font-heading font-black text-slate-900 dark:text-white tracking-tight mb-8">
          The Hub of <br />
          <span className="gradient-text">Innovation</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-medium">
          Connect with the industry's most influential companies and discover high-impact roles tailored to your expertise.
        </p>

        {/* Premium Search Bar */}
        <div className="mt-12 max-w-2xl mx-auto relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
          <div className="relative glass-strong p-2 rounded-[2rem] border border-white/20 dark:border-slate-800 flex items-center shadow-2xl">
            <div className="pl-6 pr-4">
              <FiSearch className="text-slate-400 group-focus-within:text-primary-500 transition-colors text-xl" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by company name or location..."
              className="flex-1 py-4 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder-slate-400 font-bold"
            />
            <button className="hidden md:flex btn-primary !rounded-2xl !px-8 h-12 items-center gap-2">
              <FiFilter />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Companies Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl relative z-10"
      >
        <AnimatePresence>
          {filteredCompanies.map((company) => (
            <motion.div
              layout
              key={company.id || company._id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.9 }}
              className="group glass-strong rounded-[2.5rem] p-8 flex flex-col border border-white/20 dark:border-slate-800 hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(14,165,233,0.1)] relative overflow-hidden"
            >
              {/* Card Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary-500/10 transition-colors" />

              <div className="flex items-start justify-between mb-10">
                <div className="w-20 h-20 relative glass flex items-center justify-center rounded-3xl p-4 overflow-hidden border border-slate-100 dark:border-slate-700/50 shadow-inner group-hover:scale-110 transition-transform duration-700">
                  <Image
                    src={company.logo || company.logoUrl || '/placeholder-logo.png'}
                    alt={company.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex text-yellow-500 mb-1">
                    <FiStar fill="currentColor" size={14} />
                    <FiStar fill="currentColor" size={14} />
                    <FiStar fill="currentColor" size={14} />
                    <FiStar fill="currentColor" size={14} />
                    <FiStar size={14} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Featured</span>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                  {company.name}
                </h3>
                <div className="flex items-center gap-4 text-sm font-bold text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <FiMapPin className="text-primary-500" />
                    {company.location}
                  </div>
                  <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <div className="flex items-center gap-1.5">
                    <FiGlobe className="text-emerald-500" />
                    Global
                  </div>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-10 line-clamp-3 font-medium">
                {company.description || "Leading the future through innovation and specialized expertise. Join our journey to redefine the digital landscape."}
              </p>

              <div className="mt-auto pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center">
                    <FiBriefcase className="text-primary-600" size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-black text-slate-900 dark:text-white">{company.jobsCount || 0}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Positions</span>
                  </div>
                </div>

                <Link
                  href={`/Pages/Company/${company._id || company.id}`}
                  className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl shadow-black/10"
                >
                  <FiArrowRight size={20} />
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* No Results */}
      {filteredCompanies.length === 0 && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-32 text-center"
        >
          <div className="text-6xl mb-6">🔍</div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">No companies found</h3>
          <p className="text-slate-500">Try adjusting your search query.</p>
        </motion.div>
      )}

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mt-32 w-full max-w-7xl gradient-mesh rounded-[3.5rem] p-16 md:p-24 text-center text-white relative overflow-hidden shadow-2xl"
      >
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Elevate Your <br /> Employer Brand</h2>
          <p className="text-white/80 mb-12 text-lg md:text-xl font-medium">Join 5,000+ companies hiring top tech talent through our platform.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto bg-white text-slate-900 px-12 py-5 rounded-[2rem] font-black text-lg hover:scale-105 transition shadow-2xl shadow-black/20">
              List Your Company
            </button>
            <button className="w-full sm:w-auto bg-transparent border-2 border-white/30 backdrop-blur-md text-white px-12 py-5 rounded-[2rem] font-black text-lg hover:bg-white/10 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Animated Orbs for Mesh */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse-slow" />
      </motion.div>

    </div>
  );
};

export default CompaniesListingPage;
