'use client';
import React, { useState, useMemo } from "react";
import Filters from "@/app/Components/Filters";
import { jobs } from "@/app/utils/Data";
import { JobsData, FiltersType } from "@/app/utils/Types";
import { motion, AnimatePresence } from "framer-motion";
import { HiSquares2X2, HiBars3 } from "react-icons/hi2";
import JobCard from "@/app/Components/JobCard";
import { useRouter } from "next/navigation";

export default function JobsPage() {
  const router = useRouter()
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
    return jobs.filter((job: JobsData) => {
      const matchKeyword =
        job.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        job.skills.some((s) => s.toLowerCase().includes(filters.keyword.toLowerCase()));
      const matchLocation = filters.location
        ? job.location.toLowerCase().includes(filters.location.toLowerCase())
        : true;
      const matchRemote = filters.remote ? job.remote === true : true;
      const matchEmployment =
        filters.employment.length > 0 ? filters.employment.includes(job.employmentType) : true;
      const matchSkills =
        filters.skills.length > 0 ? filters.skills.every((s) => job.skills.includes(s)) : true;

      return matchKeyword && matchLocation && matchRemote && matchEmployment && matchSkills;
    });
  }, [filters]);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLast = currentPage * jobsPerPage;
  const indexOfFirst = indexOfLast - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirst, indexOfLast);

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 pb-12 transition-colors font-sans">
      <div className="container-custom flex flex-col lg:flex-row gap-8">

        {/* Sidebar */}
        <div className="lg:w-80 shrink-0">
          <Filters setFilters={setFilters} />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Header */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Job Listings</h1>
              <p className="text-slate-500 text-sm mt-1">Showing {filteredJobs.length} opportunities</p>
            </div>

            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
              <button
                onClick={() => setView("grid")}
                className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-white dark:bg-slate-700 text-primary-600 shadow' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                aria-label="Grid View"
              >
                <HiSquares2X2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-white dark:bg-slate-700 text-primary-600 shadow' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                aria-label="List View"
              >
                <HiBars3 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Jobs List */}
          {currentJobs.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 text-center border border-slate-100 dark:border-slate-700">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">🤔</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No jobs found</h3>
              <p className="text-slate-500">Try adjusting your search criteria.</p>
            </div>
          ) : (
            <motion.div
              layout
              className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6' : 'flex flex-col gap-4'}
            >
              <AnimatePresence>
                {currentJobs.map(job => (
                  <JobCard key={job.id} job={job} variant={view} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium text-sm"
              >
                Previous
              </button>

              <div className="hidden sm:flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition ${currentPage === i + 1 ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium text-sm"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
