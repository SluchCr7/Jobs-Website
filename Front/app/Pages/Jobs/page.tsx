'use client';
import React, { useState, useMemo } from "react";
import Filters from "@/app/Components/Filters";
import { jobs } from "@/app/utils/Data";
import { JobsData, FiltersType } from "@/app/utils/Types";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiSquares2X2, HiBars3 } from "react-icons/hi2";
import { FaBuilding, FaMapMarkerAlt, FaMoneyBillWave, FaLaptopCode } from "react-icons/fa";

export default function JobsPage() {
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
    <div className="w-full flex flex-col lg:flex-row bg-gray-50 min-h-screen px-4 md:px-6 py-8 gap-6">
      {/* Filters Sidebar */}
      <Filters setFilters={setFilters} />

      <div className="flex-1 flex flex-col gap-6">
        {/* Header & View Toggle */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Job Listings</h2>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">View as:</span>
            <button onClick={() => setView("grid")} className={`p-2 rounded-lg ${view==='grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}>
              <HiSquares2X2 size={22} />
            </button>
            <button onClick={() => setView("list")} className={`p-2 rounded-lg ${view==='list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}>
              <HiBars3 size={22} />
            </button>
          </div>
        </div>

        {/* Jobs Container */}
        <motion.div className={view==='grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6' : 'flex flex-col gap-4'}>
          {currentJobs.map(job => (
            <Link href={`/Pages/Job/${job.id}`} key={job.id} className={view==='grid' ? 'bg-white shadow-lg rounded-3xl border p-6 flex flex-col justify-between hover:shadow-2xl transition group' : 'bg-white shadow-md rounded-2xl border p-5 flex flex-row items-start gap-6 hover:shadow-lg transition group'}>
              {/* Logo */}
              <div className={view==='grid' ? 'w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center border mb-4' : 'w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center border flex-shrink-0'}>
                {job.logo ? <img src={job.logo} alt={job.company} className="w-full h-full object-contain rounded" /> : <span className="font-bold text-gray-700">{job.company[0]}</span>}
              </div>

              {/* Info */}
              <div className={view==='grid' ? 'flex-1' : 'flex-1 flex flex-col gap-1'}>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">{job.title}</h3>
                <div className="flex items-center gap-2 text-gray-600 text-sm"><FaBuilding /> <span>{job.company}</span></div>
                <p className={`text-gray-700 mt-2 ${view==='grid' ? 'line-clamp-3' : 'line-clamp-2'}`}>{job.description}</p>

                {/* Details */}
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                  <div className="flex items-center gap-1"><FaMapMarkerAlt className="text-gray-400" /> {job.location}</div>
                  <div className="flex items-center gap-1"><FaMoneyBillWave className="text-green-600" /> {job.salary}</div>
                  <div className="flex items-center gap-1"><FaLaptopCode className="text-gray-500" /> Skills:</div>
                  <div className="flex flex-wrap gap-1">{job.skills.map((skill, idx)=><span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg">{skill}</span>)}</div>
                </div>

                {/* Employment & Posted */}
                <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-400">
                  <span>Type: {job.employmentType}</span>
                  <span>Posted: {job.postedDate}</span>
                  {job.remote && <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-lg">Remote</span>}
                </div>
              </div>

              {/* Apply Button */}
              <button className={view==='grid' ? 'mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition' : 'self-center flex-shrink-0 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition'}>
                View Details
              </button>
            </Link>
          ))}
        </motion.div>

        {/* Pagination */}
        <div className="w-full flex justify-center items-center py-6 gap-3">
          <button onClick={()=>setCurrentPage(p=>Math.max(1,p-1))} className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300">Prev</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={()=>setCurrentPage(i+1)} className={`px-4 py-2 rounded-xl ${currentPage===i+1 ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}>{i+1}</button>
          ))}
          <button onClick={()=>setCurrentPage(p=>Math.min(totalPages,p+1))} className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300">Next</button>
        </div>
      </div>
    </div>
  );
}
