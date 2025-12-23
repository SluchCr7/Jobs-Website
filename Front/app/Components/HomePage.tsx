'use client';

import React, { JSX, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineSearch, HiOutlineLocationMarker } from "react-icons/hi";
import { FiBriefcase, FiTrendingUp, FiUsers, FiAward, FiMail } from "react-icons/fi";
import { companies, jobs, articles, categories, testimonials, stats } from "../utils/Data";
import { JobsData } from "../utils/Types";
import JobCard from "./JobCard";

/* ---------------------- Helper Components ---------------------- */
const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="container-custom">{children}</div>
);

const Pill: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) =>
  <span className={`px-3 py-1 rounded-full text-sm font-medium ${className}`}>{children}</span>;

/* ---------------------- Main Component ---------------------- */
export default function HomePage(): JSX.Element {
  // SEARCH + FILTER STATE
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [jobType, setJobType] = useState<"any" | "fulltime" | "parttime" | "contract">("any");
  const [loading, setLoading] = useState<boolean>(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  // simulate data loading (for skeletons)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  // derived filtered jobs (simple client-side)
  const filteredJobs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter(j => {
      if (remoteOnly && !j.remote) return false;
      if (selectedCategory && j.categoryId !== selectedCategory) return false;
      if (jobType !== "any" && j.employmentType?.toLowerCase() !== jobType) return false;
      if (location && !j.location.toLowerCase().includes(location.toLowerCase())) return false;
      if (!q) return true;
      return (
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.skills.join(" ").toLowerCase().includes(q)
      );
    });
  }, [jobs, query, location, selectedCategory, remoteOnly, jobType]);

  // autocomplete suggestions
  const suggestions = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    const titles = Array.from(new Set(jobs.map(j => j.title)))
      .filter(t => t.toLowerCase().includes(q))
      .slice(0, 5);
    const skills = Array.from(new Set(jobs.flatMap(j => j.skills)))
      .filter(s => s.toLowerCase().includes(q))
      .slice(0, 5);
    return [...titles, ...skills].slice(0, 6);
  }, [query]);

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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      <script key="ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero Section */}
      <section className="pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-100/40 via-transparent to-transparent dark:from-primary-900/20 pointer-events-none"></div>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                </span>
                #1 Job Board for Designers & Devs
              </div>
              <h1 className="text-5xl lg:text-7xl font-heading font-bold leading-tight mb-6 text-slate-900 dark:text-white">
                Find your <br />
                <span className="text-primary-600 relative">
                  dream job
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span>
                <br /> in seconds.
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-lg mb-8 leading-relaxed">
                Connect with thousands of hiring companies.
                Full-time, remote, and contract opportunities tailored for you.
              </p>

              {/* Search Box */}
              <div className="bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700">
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex-1 relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors">
                      <HiOutlineSearch size={22} />
                    </div>
                    <input
                      value={query}
                      onChange={e => setQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 focus:bg-white focus:ring-2 focus:ring-primary-100 outline-none transition-all placeholder-slate-400"
                      placeholder="Job title, keywords..."
                    />
                    {/* Suggestions */}
                    <AnimatePresence>
                      {suggestions.length > 0 && query.trim().length > 0 && (
                        <motion.ul
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-xl z-20 overflow-hidden"
                        >
                          {suggestions.map((s, i) => (
                            <li key={i} onClick={() => setQuery(s)} className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer text-sm text-slate-700 dark:text-slate-300">
                              {s}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex-1 relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors">
                      <HiOutlineLocationMarker size={22} />
                    </div>
                    <input
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 focus:bg-white focus:ring-2 focus:ring-primary-100 outline-none transition-all placeholder-slate-400"
                      placeholder="City or Remote"
                    />
                  </div>

                  <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-primary-500/30">
                    Search
                  </button>
                </div>

                {/* Advanced Toggle */}
                <div className="px-4 py-2 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex gap-2">
                    <span className="font-semibold">Popular:</span>
                    <button onClick={() => setQuery("Product Design")} className="hover:text-primary-600 underline decoration-dotted">Product Design</button>
                    <button onClick={() => setQuery("Development")} className="hover:text-primary-600 underline decoration-dotted">Development</button>
                  </div>
                  <button onClick={() => setShowAdvanced(!showAdvanced)} className="pt-2 hover:text-primary-600 font-medium">
                    {showAdvanced ? "Hide Filters" : "Advanced Filters"}
                  </button>
                </div>

                {/* Advanced Filters Panel */}
                <AnimatePresence>
                  {showAdvanced && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-slate-100 dark:border-slate-700 mx-2">
                      <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-2">Job Type</label>
                          <select value={jobType} onChange={(e) => setJobType(e.target.value as any)} className="w-full p-2 rounded-lg bg-slate-50 border border-slate-200 text-sm">
                            <option value="any">Any Type</option>
                            <option value="fulltime">Full Time</option>
                            <option value="parttime">Part Time</option>
                            <option value="contract">Contract</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-2">Category</label>
                          <select value={selectedCategory ?? ""} onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : null)} className="w-full p-2 rounded-lg bg-slate-50 border border-slate-200 text-sm">
                            <option value="">All Categories</option>
                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                          </select>
                        </div>
                        <div className="flex items-end pb-3">
                          <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input type="checkbox" checked={remoteOnly} onChange={e => setRemoteOnly(e.target.checked)} className="rounded text-primary-600 focus:ring-primary-500" />
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Remote Only</span>
                          </label>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Stats */}
              <div className="mt-8 flex items-center gap-8 text-sm font-medium text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-green-100 text-green-700 rounded-full"><FiBriefcase /></div>
                  <span>14k+ Jobs</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-100 text-blue-700 rounded-full"><FiUsers /></div>
                  <span>5k+ Companies</span>
                </div>
              </div>
            </motion.div>

            {/* Right Visual */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="hidden lg:block relative">
              <div className="relative z-10 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-6 border border-slate-100 dark:border-slate-700 rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-xl font-bold">G</div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Senior Product Designer</h3>
                    <p className="text-slate-500 text-sm">Google Inc • Mountain View, CA</p>
                  </div>
                </div>
                <div className="flex gap-2 mb-6">
                  <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-semibold text-slate-600">Full Time</span>
                  <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-semibold text-slate-600">$120k - $150k</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full w-full overflow-hidden">
                  <div className="h-full bg-primary-500 w-2/3"></div>
                </div>
                <p className="text-right text-xs text-slate-400 mt-2">124 Applicants</p>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-12 -right-12 z-0 opacity-50">
                <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#3B82F6" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.4,82.2,23.1,70.8,34.3C59.4,45.5,47.9,54.2,35.6,60.7C23.3,67.2,10.2,71.5,-2.1,75.1C-14.5,78.8,-26.1,81.7,-36.8,75.7C-47.5,69.7,-57.3,54.8,-66.1,39.6C-74.9,24.4,-82.7,8.9,-81.4,-6C-80.1,-20.9,-69.7,-35.3,-58.1,-46.8C-46.5,-58.3,-33.7,-67,-20.8,-74.8C-7.9,-82.6,5.1,-89.5,17.2,-87.3C29.3,-85.1,40.5,-73.8,44.7,-76.4Z" transform="translate(100 100)" />
                </svg>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-3 text-slate-900 dark:text-white">Featured Opportunities</h2>
              <p className="text-slate-500">Explore the latest jobs from top companies.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-slate-400">{filteredJobs.length} Jobs Found</span>
              <Link href="/jobs" className="text-primary-600 font-semibold hover:underline">View All &rarr;</Link>
            </div>
          </div>

          {/* Categories Quick Filter */}
          <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide">
            <button
              onClick={() => { setSelectedCategory(null); setJobType('any'); setRemoteOnly(false); setQuery(''); }}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === null ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              All Jobs
            </button>
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${selectedCategory === c.id ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {c.icon && <span>{c.icon}</span>}
                {c.name}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {loading ? (
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="h-64 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse"></div>
              ))
            ) : filteredJobs.length === 0 ? (
              <div className="col-span-full py-20 text-center">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">🤔</div>
                <h3 className="text-xl font-bold text-slate-800">No jobs found</h3>
                <p className="text-slate-500 mt-2">Try adjusting your search filters.</p>
                <button onClick={() => { setQuery(''); setLocation(''); setSelectedCategory(null); }} className="mt-4 btn-primary">Clear Filters</button>
              </div>
            ) : (
              filteredJobs.slice(0, 9).map(job => (
                <JobCard key={job.id} job={job} />
              ))
            )}
          </div>
        </Container>
      </section>

      {/* Top Companies */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-heading font-bold mb-4">Trusted by Market Leaders</h2>
            <p className="text-slate-500">Join thousands of companies using JobFinder to hire top talent.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {companies.map((company, i) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center justify-center group"
              >
                <div className="w-24 h-24 bg-white dark:bg-slate-700 rounded-2xl shadow-sm group-hover:shadow-lg transition-all duration-300 flex items-center justify-center p-4 border border-slate-100 dark:border-slate-600 group-hover:-translate-y-2">
                  <Image width={100} height={100} src={company.logoUrl} alt={company.name} className="max-w-full max-h-full opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0" />
                </div>
                <span className="mt-3 text-sm font-medium text-slate-500 group-hover:text-primary-600 transition-colors">{company.name}</span>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Newsletter */}
      <section className="py-20">
        <Container>
          <div className="relative rounded-3xl bg-primary-600 overflow-hidden px-8 py-16 md:px-16 text-center shadow-2xl shadow-primary-900/40">
            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="inline-block p-3 rounded-xl bg-white/10 text-white mb-6 backdrop-blur-md">
                <FiMail size={24} />
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">Get the latest jobs sent to your inbox</h2>
              <p className="text-primary-100 mb-8 text-lg">Subscribe to stay updated with new opportunities. No spam, just jobs.</p>

              <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="email@example.com"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="flex-1 px-6 py-4 rounded-xl text-slate-900 outline-none focus:ring-4 focus:ring-primary-400 placeholder-slate-400 shadow-xl"
                />
                <button className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-xl">
                  Subscribe
                </button>
              </form>
              {subscribed && <p className="mt-4 text-green-300 font-medium animate-pulse">Successfully subscribed!</p>}
            </div>

            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
          </div>
        </Container>
      </section>
    </div>
  );
}
