'use client';
import React, { useState } from "react";
import { FiltersProps, FiltersType } from "@/app/utils/Types";
import { FaSlidersH, FaSearch, FaMapMarkerAlt, FaBriefcase, FaLaptopCode, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Filters({ setFilters }: FiltersProps) {
  const [data, setData] = useState<FiltersType>({
    keyword: "",
    location: "",
    remote: false,
    employment: [],
    skills: [],
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  const employmentTypes: string[] = ["Full-time", "Part-time", "Contract", "Internship"];
  const skillList: string[] = ["React", "SEO", "Writing", "Node.js", "UI/UX", "Communication"];

  const handleEmployment = (type: string) => {
    setData(prev => ({
      ...prev,
      employment: prev.employment.includes(type)
        ? prev.employment.filter(t => t !== type)
        : [...prev.employment, type],
    }));
  };

  const handleSkill = (skill: string) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const applyFilters = () => {
    setFilters(data);
    setDrawerOpen(false);
  }
  const resetFilters = () => {
    const empty: FiltersType = { keyword: "", location: "", remote: false, employment: [], skills: [] };
    setData(empty);
    setFilters(empty);
  };

  const FilterContent = () => (
    <div className="flex flex-col gap-6 p-6 bg-white dark:bg-slate-800 h-full w-full rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary-50 dark:bg-slate-700 text-primary-600">
            <FaSlidersH className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Filter Jobs</h2>
        </div>
        <button className="md:hidden text-slate-500 hover:text-slate-700 dark:text-slate-400" onClick={() => setDrawerOpen(false)}>
          <FaTimes className="w-5 h-5" />
        </button>
      </div>

      {/* Keyword */}
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2 font-semibold text-sm text-slate-700 dark:text-slate-300">
          <FaSearch className="w-3.5 h-3.5 text-primary-500" /> Keyword
        </label>
        <input
          type="text"
          value={data.keyword}
          onChange={e => setData({ ...data, keyword: e.target.value })}
          placeholder="Job title, skill..."
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary-500 transition outline-none text-sm dark:text-white"
        />
      </div>

      {/* Location */}
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2 font-semibold text-sm text-slate-700 dark:text-slate-300">
          <FaMapMarkerAlt className="w-3.5 h-3.5 text-primary-500" /> Location
        </label>
        <input
          type="text"
          value={data.location}
          onChange={e => setData({ ...data, location: e.target.value })}
          placeholder="City or Country"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary-500 transition outline-none text-sm dark:text-white"
        />
        <label className="flex items-center gap-2 mt-1 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={data.remote}
            onChange={() => setData({ ...data, remote: !data.remote })}
            className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 border-slate-300"
          />
          <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">Remote Only</span>
        </label>
      </div>

      {/* Employment */}
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2 font-semibold text-sm text-slate-700 dark:text-slate-300">
          <FaBriefcase className="w-3.5 h-3.5 text-primary-500" /> Employment Type
        </label>
        <div className="flex flex-wrap gap-2">
          {employmentTypes.map((type, idx) => (
            <button
              key={idx}
              onClick={() => handleEmployment(type)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${data.employment.includes(type)
                  ? "bg-primary-600 text-white border-primary-600 shadow-md shadow-primary-500/20"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-600 hover:border-primary-300 dark:hover:border-primary-700"
                }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2 font-semibold text-sm text-slate-700 dark:text-slate-300">
          <FaLaptopCode className="w-3.5 h-3.5 text-primary-500" /> Skills
        </label>
        <div className="flex flex-wrap gap-2">
          {skillList.map((skill, idx) => (
            <button
              key={idx}
              onClick={() => handleSkill(skill)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${data.skills.includes(skill)
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-500/20"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-600 hover:border-emerald-300 dark:hover:border-emerald-700"
                }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mt-auto pt-6 border-t border-slate-100 dark:border-slate-700">
        <button onClick={applyFilters} className="btn-primary py-3 text-sm rounded-xl">
          Apply
        </button>
        <button onClick={resetFilters} className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition text-sm">
          Reset
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-80 flex-col sticky top-24 h-[calc(100vh-120px)] overflow-y-auto scrollbar-hide">
        <FilterContent />
      </div>

      {/* Mobile Drawer */}
      <div className="md:hidden">
        <button
          onClick={() => setDrawerOpen(true)}
          className="bg-primary-600 text-white px-5 py-3 rounded-full font-bold shadow-lg shadow-primary-600/30 hover:scale-105 transition fixed bottom-8 right-6 z-40 flex items-center gap-2"
        >
          <FaSlidersH /> Filters
        </button>

        <AnimatePresence>
          {drawerOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-0 z-50 flex justify-end"
            >
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setDrawerOpen(false)}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              />

              <div className="relative w-full max-w-sm h-full bg-white dark:bg-slate-800 shadow-2xl overflow-y-auto">
                <FilterContent />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
