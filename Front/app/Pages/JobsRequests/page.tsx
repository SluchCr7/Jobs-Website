"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { jobs } from "@/app/utils/Data";

interface AppliedJob {
  id: number;
  title: string;
  company: string;
  companyLogo: string;
  appliedDate: string;
  employmentType: string;
  status: "Pending" | "Accepted" | "Rejected";
}

const appliedJobs: AppliedJob[] = jobs.map((job, idx) => {
  const logo = job.logo ?? "/placeholder.png";
  const employmentType = job.employmentType ?? "full_time";

  return {
    id: job.id,
    title: job.title,
    company: job.company,
    companyLogo: logo,
    appliedDate: "2025-12-09",
    employmentType,
    status: ["Pending", "Accepted", "Rejected"][idx % 3] as
      | "Pending"
      | "Accepted"
      | "Rejected",
  };
});


export default function MyApplicationsPage() {
  const [filter, setFilter] = useState<"All" | "Pending" | "Accepted" | "Rejected">("All");
  const [search, setSearch] = useState("");

  const filteredJobs = appliedJobs.filter(
    (job) =>
      (filter === "All" || job.status === filter) &&
      (job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()))
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 flex items-center gap-1 px-3 py-1 rounded-full font-semibold";
      case "Accepted":
        return "bg-green-100 text-green-800 flex items-center gap-1 px-3 py-1 rounded-full font-semibold";
      case "Rejected":
        return "bg-red-100 text-red-800 flex items-center gap-1 px-3 py-1 rounded-full font-semibold";
      default:
        return "";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <p className="text-gray-400 text-sm tracking-wide">Home / My Applications</p>
        <h1 className="text-4xl font-bold text-gray-900 mt-2">My Job Applications</h1>
        <p className="text-gray-600 mt-2">
          Track all the jobs you have applied for and see their current status.
        </p>
      </div>

      {/* Search + Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by job title or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-3 flex-wrap">
          {["All", "Pending", "Accepted", "Rejected"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab as any)}
              className={`px-4 py-2 rounded-xl font-medium transition ${
                filter === tab
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      <AnimatePresence>
        {filteredJobs.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 text-gray-400"
          >
            <p className="text-xl font-medium mb-4">No applications found.</p>
            <p className="mb-6">Start exploring jobs and apply to your favorite positions.</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
              Browse Jobs
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-2xl shadow-sm border hover:shadow-lg transition bg-white"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 relative">
                    <Image
                      src={job.companyLogo}
                      alt={job.company}
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-gray-600">{job.company}</p>
                    <p className="text-gray-500 text-sm">
                      Applied on: {job.appliedDate} | {job.employmentType}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <span
                    className={`${getStatusStyle(job.status)} hover:scale-105 transition`}
                  >
                    {job.status === "Pending" && "🕒"}
                    {job.status === "Accepted" && "✅"}
                    {job.status === "Rejected" && "❌"} {job.status}
                  </span>
                  <button className="text-blue-600 font-medium hover:underline text-sm">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
