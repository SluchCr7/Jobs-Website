'use client';

import React, { useState } from 'react';
import { jobs } from '@/app/utils/Data';
import { FaHeart } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';

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
    <div className="min-h-screen max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-10">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Saved Jobs
        </h1>

        <div className="relative w-full sm:w-1/3">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search job or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-xl w-full pl-10 pr-4 py-2
                       focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white shadow-sm"
          />
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600 text-sm">
          You have <span className="font-semibold text-gray-800">{filteredJobs.length}</span> saved jobs
        </p>

        <select className="px-4 py-2 border bg-white rounded-lg shadow-sm text-gray-700 cursor-pointer">
          <option>Sort by: Latest</option>
          <option>Salary (High → Low)</option>
          <option>Salary (Low → High)</option>
          <option>Company A–Z</option>
        </select>
      </div>

      {/* Jobs List */}
      <main className="flex flex-col gap-6">
        {filteredJobs.length === 0 && (
          <div className="text-center text-gray-400 mt-20 text-lg">
            No saved jobs found. Try modifying your search.
          </div>
        )}

        {filteredJobs.map(job => (
          <div
            key={job.id}
            className="relative bg-white rounded-2xl shadow-lg border border-gray-100
                       p-6 flex flex-col sm:flex-row justify-between gap-6
                       hover:shadow-xl transition-all duration-300 group"
          >
            {/* Love / Remove button */}
            <button
              onClick={() => removeJob(job.id)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-600 transition"
            >
              <FaHeart size={20} />
            </button>

            {/* Left section */}
            <div className="flex-1 flex gap-4">
              {/* Logo */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 
                              flex items-center justify-center text-gray-500 font-bold text-xl shadow-inner">
                {job.company.charAt(0)}
              </div>

              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition">
                  {job.title}
                </h2>

                <p className="text-gray-600 text-sm mt-0.5">
                  {job.company} · {job.location}
                </p>

                {/* Salary + Remote */}
                <p className="mt-3 font-semibold text-gray-800 flex items-center gap-2">
                  {job.salary}
                  <span className="px-2 py-0.5 text-xs rounded-lg bg-green-100 text-green-700">
                    {job.remote ? "Remote" : "On-site"}
                  </span>
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {job.skills.map(skill => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-700 font-medium border border-blue-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <p className="text-gray-400 text-sm mt-3">
                  {job.employmentType} · Posted {job.postedDate}
                </p>
              </div>
            </div>

            {/* Right buttons */}
            <div className="flex gap-3 sm:self-center self-end">
              <button className="px-5 py-2 border border-gray-300 text-gray-700 rounded-xl 
                                 hover:bg-gray-100 transition font-medium shadow-sm">
                View Details
              </button>

              <button className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 
                                 transition font-medium shadow-md">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
