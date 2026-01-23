"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import { useApplications } from "@/app/Context/ApplicationContext";
import { useAuth } from "@/app/Context/AuthContext";

export default function MyApplicationsPage() {
  const [filter, setFilter] = useState<"All" | "pending" | "accepted" | "rejected">("All");
  const [search, setSearch] = useState("");
  const { myApplications, loading, fetchMyApplications } = useApplications();
  const { user } = useAuth();

  useEffect(() => {
    fetchMyApplications();
  }, [fetchMyApplications]);

  const filteredJobs = myApplications.filter(
    (app) =>
      (filter === "All" || app.status === filter) &&
      (app.job?.title?.toLowerCase().includes(search.toLowerCase()) ||
        app.company?.name?.toLowerCase().includes(search.toLowerCase()))
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800";
      case "accepted":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 border border-green-200 dark:border-green-800";
      case "rejected":
        return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 border border-red-200 dark:border-red-800";
      default: // reviewed etc
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 border border-blue-200 dark:border-blue-800";
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-12 flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Please Login</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">You need to be logged in to view your applications.</p>
          <Link href="/Pages/Login" className="btn-primary mt-4 inline-block">Login</Link>
        </div>
      </div>
    )
  }

  if (loading && myApplications.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-12 flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans transition-colors pt-24 pb-12">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-10 animate-fade-in">
          <nav className="text-sm text-slate-500 dark:text-slate-400 mb-2 font-medium">
            <Link href="/Pages/Dashboard" className="hover:text-primary-600 transition">Home</Link> / Applications
          </nav>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 dark:text-white">My Job Applications</h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
                Track all the jobs you have applied for and see their current status.
              </p>
            </div>
            <div className="hidden md:block">
              <span className="bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300">
                Total: {filteredJobs.length}
              </span>
            </div>
          </div>
        </div>

        {/* Search + Filter Tabs */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="relative w-full lg:w-96">
            <input
              type="text"
              placeholder="Search by job title or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-4 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all dark:text-white placeholder-slate-400"
            />
          </div>

          <div className="flex w-full lg:w-auto overflow-x-auto gap-2 pb-2 lg:pb-0 scrollbar-hide">
            {["All", "pending", "accepted", "rejected"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab as any)}
                className={`px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap capitalize ${filter === tab
                  ? "bg-primary-600 text-white shadow-lg shadow-primary-500/30"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Applications List */}
        <AnimatePresence mode="wait">
          {filteredJobs.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700"
            >
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-4xl mb-4">
                🔍
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No applications found</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm">
                We couldn't find any applications matching your search. Try different keywords or apply to new jobs.
              </p>
              <Link href="/Pages/Jobs" className="btn-primary">
                Browse Jobs
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredJobs.map((app) => (
                <motion.div
                  key={app._id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="group flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm hover:shadow-lg border border-slate-200 dark:border-slate-700 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full md:w-auto text-center sm:text-left">
                    <div className="w-16 h-16 relative bg-slate-50 dark:bg-slate-700 rounded-xl p-2 shrink-0 border border-slate-100 dark:border-slate-600">
                      {app.company?.logo ? (
                        <img
                          src={app.company.logo}
                          alt={app.company.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-bold text-slate-400 text-xl">{app.company?.name?.[0]}</div>
                      )}

                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors">{app.job?.title || "Unknown Job"}</h3>
                      <p className="text-slate-600 dark:text-slate-300 font-medium">{app.company?.name || "Unknown Company"}</p>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2 text-sm text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          📅 {new Date(app.createdAt).toLocaleDateString()}
                        </span>
                        {app.job?.jobType && (
                          <>
                            <span className="hidden sm:inline">•</span>
                            <span className="capitalize">{app.job.jobType.replace('_', ' ')}</span>
                          </>
                        )}

                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                    <span
                      className={`px-4 py-1.5 rounded-full font-semibold text-sm flex items-center gap-2 capitalize ${getStatusStyle(app.status)}`}
                    >
                      {app.status === "pending" && <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />}
                      {app.status === "accepted" && <span className="w-2 h-2 rounded-full bg-green-500" />}
                      {app.status === "rejected" && <span className="w-2 h-2 rounded-full bg-red-500" />}
                      {app.status}
                    </span>

                    <Link href={`/Pages/Job/${app.job?._id || app.job?.id}`} className="px-4 py-2 text-primary-600 font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors text-sm whitespace-nowrap">
                      View Job
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
