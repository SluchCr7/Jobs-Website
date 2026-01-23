'use client';

import React, { JSX, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, MapPin, Briefcase, TrendingUp, Users, Award, Mail,
  Sparkles, Rocket, Target, Zap, ArrowRight, Star, Building2,
  Clock, DollarSign, Globe, Filter, X
} from "lucide-react";
import { articles, categories, testimonials, stats } from "../utils/Data";
import { JobsData } from "../utils/Types";
import JobCard from "./JobCard";
import { useJobs } from "../Context/JobContext";
import { useCompanies } from "../Context/CompanyContext";

/* ---------------------- Helper Components ---------------------- */
const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="container-custom">{children}</div>
);

const FloatingOrb: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`absolute rounded-full blur-3xl opacity-20 animate-pulse-slow ${className}`} />
);

/* ---------------------- Main Component ---------------------- */
export default function HomePage(): JSX.Element {
  // SEARCH + FILTER STATE
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [jobType, setJobType] = useState<"any" | "fulltime" | "parttime" | "contract">("any");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const { jobs, loading } = useJobs();
  const { companies } = useCompanies();

  // derived filtered jobs (simple client-side)
  const filteredJobs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter(j => {
      if (remoteOnly && !j.remote && j.location?.toLowerCase() !== 'remote') return false;
      if (selectedCategory && j.categoryId !== selectedCategory && j.category !== selectedCategory) return false;
      if (jobType !== "any" && j.employmentType?.toLowerCase() !== jobType && j.jobType?.toLowerCase() !== jobType) return false;
      if (location && !j.location?.toLowerCase().includes(location.toLowerCase())) return false;
      if (!q) return true;

      const companyName = typeof j.company === 'string' ? j.company : j.company?.name || '';
      const skillsStr = Array.isArray(j.skills) ? j.skills.join(" ") : (j.skills || "");

      return (
        j.title?.toLowerCase().includes(q) ||
        companyName.toLowerCase().includes(q) ||
        skillsStr.toLowerCase().includes(q)
      );
    });
  }, [jobs, query, location, selectedCategory, remoteOnly, jobType]);

  // autocomplete suggestions
  const suggestions = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    const titles = Array.from(new Set(jobs.map(j => j.title)))
      .filter(t => t?.toLowerCase().includes(q))
      .slice(0, 5);

    const allSkills = jobs.flatMap(j => Array.isArray(j.skills) ? j.skills : []);
    const skills = Array.from(new Set(allSkills))
      .filter(s => s.toLowerCase().includes(q))
      .slice(0, 5);
    return [...titles, ...skills].slice(0, 6);
  }, [query, jobs]);

  // subscribe handler
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": jobs.slice(0, 6).map((j: JobsData, i: number) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "JobPosting",
        "title": j.title,
        "hiringOrganization": { "@type": "Organization", "name": j.company },
        "jobLocation": { "@type": "Place", "address": j.location },
        "employmentType": j.employmentType || "Full-time",
        "datePosted": j.postedDate || new Date().toISOString()
      }
    }))
  };

  /* ---------------------- UI ---------------------- */
  return (
    <div className="min-h-screen relative overflow-hidden">
      <script key="ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Floating Background Orbs */}
      <FloatingOrb className="w-[500px] h-[500px] bg-primary-500 top-0 -left-48" />
      <FloatingOrb className="w-[600px] h-[600px] bg-accent-500 top-1/4 -right-64" />
      <FloatingOrb className="w-[400px] h-[400px] bg-purple-500 bottom-0 left-1/3" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong mb-8 group hover:scale-105 transition-transform cursor-pointer"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
                </span>
                <span className="text-sm font-bold gradient-text">Trusted by 50,000+ Professionals</span>
                <Sparkles className="w-4 h-4 text-accent-500" />
              </motion.div>

              {/* Main Heading */}
              <h1 className="text-5xl lg:text-7xl font-heading font-black leading-[1.1] mb-6 text-slate-900 dark:text-white">
                Discover Your{" "}
                <span className="relative inline-block">
                  <span className="gradient-text animate-glow">Dream Career</span>
                  <motion.svg
                    className="absolute w-full h-4 -bottom-2 left-0"
                    viewBox="0 0 200 12"
                    preserveAspectRatio="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  >
                    <motion.path
                      d="M0 6 Q 100 12 200 6"
                      stroke="url(#gradient)"
                      strokeWidth="6"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0ea5e9" />
                        <stop offset="50%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                  </motion.svg>
                </span>
                <br />
                in Seconds
              </h1>

              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-xl mb-10 leading-relaxed">
                Join thousands of professionals finding their perfect match.
                <span className="font-semibold text-primary-600 dark:text-primary-400"> Remote, Full-time, Contract</span> —
                opportunities tailored just for you.
              </p>

              {/* Search Box */}
              <div className="glass-strong p-3 rounded-3xl shadow-2xl border-2 border-white/50 dark:border-slate-700/50">
                <div className="flex flex-col md:flex-row gap-3">
                  {/* Job Title Input */}
                  <div className="flex-1 relative group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors z-10">
                      <Search size={22} />
                    </div>
                    <input
                      value={query}
                      onChange={e => setQuery(e.target.value)}
                      className="w-full pl-14 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-transparent focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 outline-none transition-all placeholder-slate-400 text-slate-900 dark:text-white font-medium"
                      placeholder="Job title, skills, or keywords..."
                    />
                    {/* Suggestions Dropdown */}
                    <AnimatePresence>
                      {suggestions.length > 0 && query.trim().length > 0 && (
                        <motion.ul
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute left-0 right-0 top-full mt-2 glass-strong rounded-2xl shadow-2xl z-20 overflow-hidden"
                        >
                          {suggestions.map((s, i) => (
                            <li
                              key={i}
                              onClick={() => setQuery(s)}
                              className="px-5 py-3 hover:bg-primary-50 dark:hover:bg-primary-900/20 cursor-pointer text-sm text-slate-700 dark:text-slate-300 font-medium transition-colors flex items-center gap-2"
                            >
                              <Search size={14} className="text-slate-400" />
                              {s}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Location Input */}
                  <div className="flex-1 relative group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors z-10">
                      <MapPin size={22} />
                    </div>
                    <input
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      className="w-full pl-14 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-transparent focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 outline-none transition-all placeholder-slate-400 text-slate-900 dark:text-white font-medium"
                      placeholder="City or Remote"
                    />
                  </div>

                  {/* Search Button */}
                  <button className="btn-primary px-10 py-4 rounded-2xl flex items-center gap-2 whitespace-nowrap">
                    <span className="font-bold">Search</span>
                    <ArrowRight size={20} />
                  </button>
                </div>

                {/* Quick Actions */}
                <div className="px-4 py-3 flex flex-wrap items-center justify-between gap-4 text-sm">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Popular:</span>
                    {['Product Designer', 'Frontend Dev', 'Data Analyst'].map(term => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-all font-medium"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold transition-colors"
                  >
                    <Filter size={16} />
                    {showAdvanced ? "Hide Filters" : "Advanced"}
                  </button>
                </div>

                {/* Advanced Filters */}
                <AnimatePresence>
                  {showAdvanced && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden border-t border-slate-200 dark:border-slate-700 mx-3 mt-2"
                    >
                      <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wide">Job Type</label>
                          <select
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value as any)}
                            className="input-premium text-sm"
                          >
                            <option value="any">Any Type</option>
                            <option value="fulltime">Full Time</option>
                            <option value="parttime">Part Time</option>
                            <option value="contract">Contract</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wide">Category</label>
                          <select
                            value={selectedCategory ?? ""}
                            onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : null)}
                            className="input-premium text-sm"
                          >
                            <option value="">All Categories</option>
                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                          </select>
                        </div>
                        <div className="flex items-end">
                          <label className="flex items-center gap-3 cursor-pointer select-none group">
                            <input
                              type="checkbox"
                              checked={remoteOnly}
                              onChange={e => setRemoteOnly(e.target.checked)}
                              className="w-5 h-5 rounded border-2 border-slate-300 dark:border-slate-600 text-primary-600 focus:ring-primary-500 focus:ring-2 cursor-pointer"
                            />
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Remote Only</span>
                          </label>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Stats */}
              <div className="mt-10 flex items-center gap-8 text-sm">
                {[
                  { icon: Briefcase, label: `${jobs.length}+ Active Jobs`, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30' },
                  { icon: Building2, label: `${companies.length}+ Companies`, color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30' },
                  { icon: Users, label: '50k+ Hired', color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30' }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className={`p-2 rounded-xl ${stat.color}`}>
                      <stat.icon size={18} />
                    </div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Visual - Floating Job Cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block relative h-[600px]"
            >
              {/* Card 1 - Main */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 left-0 right-0 glass-strong rounded-3xl p-6 shadow-2xl border-2 border-white/50 dark:border-slate-700/50 z-10"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    G
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Senior Product Designer</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2">
                      <Building2 size={14} />
                      Google Inc • San Francisco
                    </p>
                  </div>
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                </div>
                <div className="flex gap-2 mb-4 flex-wrap">
                  <span className="badge badge-primary">Full Time</span>
                  <span className="badge badge-success">Remote</span>
                  <span className="badge bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">$120k - $180k</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <Clock size={14} />
                    <span>Posted 2 days ago</span>
                  </div>
                  <button className="btn-primary px-6 py-2 text-sm">Apply Now</button>
                </div>
              </motion.div>

              {/* Card 2 - Background */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-0 right-8 glass-subtle rounded-3xl p-5 w-72 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white font-bold">
                    M
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Frontend Engineer</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Microsoft</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="badge badge-primary text-xs">React</span>
                  <span className="badge badge-primary text-xs">TypeScript</span>
                </div>
              </motion.div>

              {/* Card 3 - Background */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 left-8 glass-subtle rounded-3xl p-5 w-64 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">UX Researcher</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Apple Inc</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  <Zap size={12} />
                  <span>Fast hiring</span>
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 right-0 w-32 h-32 border-4 border-dashed border-primary-300 dark:border-primary-700 rounded-full opacity-20"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute bottom-0 left-0 w-24 h-24 bg-accent-400 rounded-full opacity-10 blur-2xl"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Featured Jobs Section */}
      <section className="relative py-20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-bold mb-4">
                  🔥 Hot Opportunities
                </span>
                <h2 className="text-4xl lg:text-5xl font-heading font-black mb-4 text-slate-900 dark:text-white">
                  Featured <span className="gradient-text">Jobs</span>
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Handpicked opportunities from top companies worldwide
                </p>
              </motion.div>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 rounded-xl glass-strong">
                <span className="text-2xl font-bold gradient-text">{filteredJobs.length}</span>
                <span className="text-sm text-slate-500 dark:text-slate-400 ml-2">Jobs Found</span>
              </div>
              <Link href="/Pages/Jobs" className="btn-primary px-6 py-3 flex items-center gap-2">
                View All
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide mb-8">
            <button
              onClick={() => { setSelectedCategory(null); setJobType('any'); setRemoteOnly(false); setQuery(''); }}
              className={`whitespace-nowrap px-6 py-3 rounded-full font-semibold transition-all ${selectedCategory === null
                  ? 'gradient-primary text-white shadow-xl shadow-primary-500/30 scale-105'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:scale-105 border-2 border-slate-200 dark:border-slate-700'
                }`}
            >
              All Jobs
            </button>
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`whitespace-nowrap px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${selectedCategory === c.id
                    ? 'gradient-primary text-white shadow-xl shadow-primary-500/30 scale-105'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:scale-105 border-2 border-slate-200 dark:border-slate-700'
                  }`}
              >
                {c.icon && <span>{c.icon}</span>}
                {c.name}
              </button>
            ))}
          </div>

          {/* Jobs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="h-80 rounded-3xl skeleton"></div>
              ))
            ) : filteredJobs.length === 0 ? (
              <div className="col-span-full py-20 text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-full flex items-center justify-center mx-auto mb-6 text-6xl">
                  🔍
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">No jobs found</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">Try adjusting your search filters or browse all jobs.</p>
                <button
                  onClick={() => { setQuery(''); setLocation(''); setSelectedCategory(null); setRemoteOnly(false); setJobType('any'); }}
                  className="btn-primary"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              filteredJobs.slice(0, 9).map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <JobCard job={job} />
                </motion.div>
              ))
            )}
          </div>
        </Container>
      </section>

      {/* Top Companies */}
      <section className="relative py-24 overflow-hidden">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 text-sm font-bold mb-4">
                💼 Trusted Partners
              </span>
              <h2 className="text-4xl lg:text-5xl font-heading font-black mb-4 text-slate-900 dark:text-white">
                Hire with <span className="gradient-text">Industry Leaders</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Join thousands of companies using our platform to find exceptional talent
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {companies.slice(0, 12).map((company, i) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group"
              >
                <Link href={`/Pages/Company/${company.id}`}>
                  <div className="glass-strong rounded-2xl p-6 h-32 flex flex-col items-center justify-center gap-3 hover:scale-110 hover:shadow-2xl transition-all duration-300 cursor-pointer">
                    <div className="w-16 h-16 relative">
                      <Image
                        width={64}
                        height={64}
                        src={company.logoUrl || '/placeholder-logo.png'}
                        alt={company.name}
                        className="w-full h-full object-contain opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors text-center">
                      {company.name}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Newsletter CTA */}
      <section className="relative py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[2rem] gradient-mesh overflow-hidden p-12 md:p-16 text-center shadow-2xl"
          >
            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md text-white mb-6 shadow-xl">
                <Mail size={36} />
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-6">
                Never Miss an Opportunity
              </h2>
              <p className="text-xl text-white/90 mb-10 leading-relaxed">
                Get personalized job alerts delivered to your inbox.
                <span className="font-bold"> Join 50,000+ subscribers</span> staying ahead in their careers.
              </p>

              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="flex-1 px-8 py-5 rounded-2xl text-slate-900 dark:text-white bg-white dark:bg-slate-800 outline-none focus:ring-4 focus:ring-white/50 placeholder-slate-400 shadow-2xl font-medium text-lg"
                />
                <button className="px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold hover:scale-105 transition-all shadow-2xl text-lg whitespace-nowrap">
                  Subscribe Free
                </button>
              </form>
              {subscribed && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 text-white font-semibold text-lg flex items-center justify-center gap-2"
                >
                  <span className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">✓</span>
                  Successfully subscribed! Check your inbox.
                </motion.p>
              )}
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
