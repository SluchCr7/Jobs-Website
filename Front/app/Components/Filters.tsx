'use client';
import React, { useState } from "react";
import { FiltersProps, FiltersType } from "@/app/utils/Types";
import { SlidersHorizontal, Search, MapPin, Briefcase, Code2, X, RotateCcw, Check } from "lucide-react";
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
    <div className="flex flex-col gap-6 p-6 h-full w-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl gradient-primary text-white shadow-lg shadow-primary-500/20">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-heading font-bold text-slate-900 dark:text-white">Filters</h2>
        </div>
        <button className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors" onClick={() => setDrawerOpen(false)}>
          <X className="w-5 h-5 text-slate-500" />
        </button>
      </div>

      <div className="space-y-6 overflow-y-auto flex-1 pr-1 custom-scrollbar">
        {/* Keyword */}
        <div className="space-y-2.5">
          <label className="flex items-center gap-2 font-bold text-sm text-slate-700 dark:text-slate-300 uppercase tracking-wide">
            <Search className="w-4 h-4 text-primary-500" /> Keywords
          </label>
          <input
            type="text"
            value={data.keyword}
            onChange={e => setData({ ...data, keyword: e.target.value })}
            placeholder="Title, skill, etc..."
            className="input-premium text-sm py-2.5"
          />
        </div>

        {/* Location */}
        <div className="space-y-2.5">
          <label className="flex items-center gap-2 font-bold text-sm text-slate-700 dark:text-slate-300 uppercase tracking-wide">
            <MapPin className="w-4 h-4 text-primary-500" /> Location
          </label>
          <input
            type="text"
            value={data.location}
            onChange={e => setData({ ...data, location: e.target.value })}
            placeholder="City or Country"
            className="input-premium text-sm py-2.5"
          />
          <label className="flex items-center gap-3 mt-2 cursor-pointer group select-none p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${data.remote
                ? 'bg-primary-600 border-primary-600'
                : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
              }`}>
              {data.remote && <Check className="w-3.5 h-3.5 text-white" />}
            </div>
            <input
              type="checkbox"
              checked={data.remote}
              onChange={() => setData({ ...data, remote: !data.remote })}
              className="hidden"
            />
            <span className="text-sm text-slate-600 dark:text-slate-400 font-semibold group-hover:text-primary-600 transition-colors">Remote Only</span>
          </label>
        </div>

        {/* Employment */}
        <div className="space-y-2.5">
          <label className="flex items-center gap-2 font-bold text-sm text-slate-700 dark:text-slate-300 uppercase tracking-wide">
            <Briefcase className="w-4 h-4 text-primary-500" /> Job Type
          </label>
          <div className="flex flex-wrap gap-2">
            {employmentTypes.map((type, idx) => (
              <button
                key={idx}
                onClick={() => handleEmployment(type)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${data.employment.includes(type)
                  ? "bg-primary-600 text-white border-primary-600 shadow-md shadow-primary-500/20"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-primary-400 dark:hover:border-primary-600"
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-2.5">
          <label className="flex items-center gap-2 font-bold text-sm text-slate-700 dark:text-slate-300 uppercase tracking-wide">
            <Code2 className="w-4 h-4 text-primary-500" /> Skills
          </label>
          <div className="flex flex-wrap gap-2">
            {skillList.map((skill, idx) => (
              <button
                key={idx}
                onClick={() => handleSkill(skill)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${data.skills.includes(skill)
                  ? "bg-accent-600 text-white border-accent-600 shadow-md shadow-accent-500/20"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-accent-400 dark:hover:border-accent-600"
                  }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mt-auto pt-6 border-t border-slate-200 dark:border-slate-700">
        <button onClick={applyFilters} className="btn-primary py-3 text-sm rounded-xl shadow-lg shadow-primary-500/20">
          Apply
        </button>
        <button onClick={resetFilters} className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition text-sm">
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-full h-full bg-white dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl overflow-hidden sticky top-24">
        <FilterContent />
      </div>

      {/* Mobile Drawer */}
      <div className="md:hidden">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setDrawerOpen(true)}
          className="fixed bottom-6 right-6 z-40 px-6 py-3 rounded-full gradient-primary text-white font-bold shadow-2xl shadow-primary-600/40 flex items-center gap-2"
        >
          <SlidersHorizontal className="w-5 h-5" /> Filters
        </motion.button>

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
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />

              <div className="relative w-full max-w-sm h-full bg-white dark:bg-slate-900 shadow-2xl overflow-y-auto">
                <FilterContent />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
