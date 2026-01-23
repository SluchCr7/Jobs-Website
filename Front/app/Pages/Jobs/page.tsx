'use client';

import React, { useState, useMemo, useEffect } from "react";
import Filters from "@/app/Components/Filters";
import { JobsData, FiltersType } from "@/app/utils/Types";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, List, Search, ArrowLeft, ArrowRight, Frown } from "lucide-react";
import JobCard from "@/app/Components/JobCard";
import { useRouter } from "next/navigation";
import { useJobs } from "@/app/Context/JobContext";

export default function JobsPage() {
  const router = useRouter()
  const { jobs, loading, fetchJobs } = useJobs();

  // Refresh jobs on mount to ensure up-to-date
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<FiltersType>({
    keyword: "",
    location: "",
    remote: false,
    employment: [],
    skills: [],
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const jobsPerPage = 6;

  const filteredJobs = useMemo(() => {
    return jobs.filter((job: any) => { // Use 'any' or flexible type
      // Safe access
      const jobTitle = job.title || "";
      const jobSkills = Array.isArray(job.skills) ? job.skills : [];
      const jobLocation = job.location || "";
      const jobRemote = job.remote === true || jobLocation.toLowerCase() === 'remote';
      const jobEmployment = job.employmentType || job.jobType || "";

      const matchKeyword =
        jobTitle.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        jobSkills.some((s: string) => s.toLowerCase().includes(filters.keyword.toLowerCase()));
      const matchLocation = filters.location
        ? jobLocation.toLowerCase().includes(filters.location.toLowerCase())
        : true;
      const matchRemote = filters.remote ? jobRemote : true;
      const matchEmployment =
        filters.employment.length > 0 ? filters.employment.some(t => jobEmployment.toLowerCase().includes(t.toLowerCase().replace('_', '-'))) : true;
      const matchSkills =
        filters.skills.length > 0 ? filters.skills.every((s) => jobSkills.includes(s)) : true;

      return matchKeyword && matchLocation && matchRemote && matchEmployment && matchSkills;
    });
  }, [filters, jobs]);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLast = currentPage * jobsPerPage;
  const indexOfFirst = indexOfLast - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirst, indexOfLast);

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-20 transition-colors font-sans relative">
      <div className="container-custom flex flex-col lg:flex-row gap-8">

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:w-80 shrink-0 lg:sticky lg:top-24 lg:h-[calc(100vh-120px)]"
        >
          <Filters setFilters={setFilters} />
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-subtle p-6 rounded-2xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl font-heading font-bold text-slate-900 dark:text-white">Job Listings</h1>
              <p className="text-slate-500 text-sm mt-1 font-medium">Found <span className="text-primary-600 dark:text-primary-400 font-bold">{filteredJobs.length}</span> opportunities for you</p>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setView("grid")}
                className={`p-2.5 rounded-lg transition-all ${view === 'grid' ? 'bg-white dark:bg-slate-700 text-primary-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                aria-label="Grid View"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-2.5 rounded-lg transition-all ${view === 'list' ? 'bg-white dark:bg-slate-700 text-primary-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                aria-label="List View"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Jobs List */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="h-72 rounded-3xl skeleton"></div>
              ))}
            </div>
          ) : currentJobs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 bg-white dark:bg-slate-800/50 rounded-3xl p-16 text-center border-2 border-dashed border-slate-200 dark:border-slate-700"
            >
              <div className="w-24 h-24 bg-slate-50 dark:bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Frown className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No jobs matched your criteria</h3>
              <p className="text-slate-500 max-w-md mx-auto mb-8">Try adjusting your filters or search for broader keywords to find more opportunities.</p>
              <button
                onClick={() => setFilters({ keyword: "", location: "", remote: false, employment: [], skills: [] })}
                className="btn-primary"
              >
                Clear All Filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              layout
              className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6' : 'flex flex-col gap-4'}
            >
              <AnimatePresence mode="popLayout">
                {currentJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <JobCard job={job} variant={view} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-12 gap-3">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="btn-outline px-5 py-2.5 flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:scale-100"
              >
                <ArrowLeft size={16} /> Previous
              </button>

              <div className="hidden sm:flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${currentPage === i + 1
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30 scale-110'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="btn-outline px-5 py-2.5 flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:scale-100"
              >
                Next <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
