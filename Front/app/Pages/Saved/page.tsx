'use client';

import React, { useState } from 'react';
import { jobs } from '@/app/utils/Data';
import { FaHeart, FaMapMarkerAlt, FaMoneyBillWave } from 'react-icons/fa';
import { FiSearch, FiBriefcase } from 'react-icons/fi';
import Link from 'next/link';

export default function SavedJobsPage() {
  const [savedJobs, setSavedJobs] = useState(jobs);
  const [search, setSearch] = useState("");

  const removeJob = (id: number) => {
    setSavedJobs(prev => prev.filter(job => job.id !== id));
  };

  const filteredJobs = savedJobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors pt-24 pb-12 font-sans">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-10 animate-fade-in">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 dark:text-white tracking-tight">
              Saved Jobs
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400 text-lg">
              Manage your bookmarked opportunities.
            </p>
          </div>

          <div className="relative w-full md:w-96">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search job or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all dark:text-white placeholder-slate-400 shadow-sm"
            />
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm animate-fade-in">
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
            You have <span className="font-bold text-slate-900 dark:text-white">{filteredJobs.length}</span> saved jobs
          </p>

          <div className="relative">
            <select className="pl-4 pr-10 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer appearance-none">
              <option>Sort by: Latest</option>
              <option>Salary (High → Low)</option>
              <option>Salary (Low → High)</option>
              <option>Company A–Z</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">▼</div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredJobs.length === 0 && (
            <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <FiBriefcase size={24} />
              </div>
              <p className="text-lg font-medium text-slate-900 dark:text-white">No saved jobs found.</p>
              <p className="text-slate-500 dark:text-slate-400">Go explore more opportunities!</p>
              <Link href="/Pages/Jobs" className="btn-primary mt-4 inline-block">Browse Jobs</Link>
            </div>
          )}

          {filteredJobs.map((job, idx) => (
            <div
              key={job.id}
              className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between gap-6 shadow-sm hover:shadow-lg border border-slate-200 dark:border-slate-700 transition-all duration-300 group animate-slide-up"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => removeJob(job.id)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors tooltip"
                  title="Remove from Saved"
                >
                  <FaHeart size={18} />
                </button>
              </div>

              {/* Left section */}
              <div className="flex gap-5">
                {/* Logo */}
                <div className="w-16 h-16 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 flex items-center justify-center text-slate-400 font-bold text-xl shrink-0">
                  {job.logo ? <img src={job.logo} alt={job.company} className="w-10 h-10 object-contain" /> : job.company.charAt(0)}
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors">
                    {job.title}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 font-medium">
                    {job.company}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-primary-500" /> {job.location}</span>
                    <span className="flex items-center gap-1"><FaMoneyBillWave className="text-green-500" /> {job.salary}</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${job.remote ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"}`}>
                      {job.remote ? "Remote" : "On-site"}
                    </span>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {job.skills.slice(0, 4).map(skill => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right buttons */}
              <div className="flex flex-row md:flex-col justify-end gap-3 mt-4 md:mt-0 w-full md:w-auto">
                <Link href={`/Pages/Job/${job.id}`} className="px-6 py-2.5 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition font-medium text-center whitespace-nowrap">
                  View Details
                </Link>

                <button className="btn-primary w-full md:w-auto px-6 py-2.5 whitespace-nowrap">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
