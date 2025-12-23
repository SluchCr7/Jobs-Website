'use client';

import React, { useState } from "react";
import { JobsData } from "@/app/utils/Types";
import { FiArrowRight, FiArrowLeft, FiCheck, FiBriefcase, FiMapPin, FiDollarSign, FiLayers, FiCalendar, FiGlobe } from "react-icons/fi";

const initialJob: Partial<JobsData> = {
  title: "",
  company: "",
  description: "",
  location: "",
  remote: false,
  salary: "",
  skills: [],
  categoryId: 1,
  employmentType: "full_time",
  postedDate: new Date().toISOString().split("T")[0],
  logo: "",
  hot: false,
  urgent: false,
};

export default function AddJobPage() {
  const [step, setStep] = useState(1);
  const [job, setJob] = useState<Partial<JobsData>>(initialJob);
  const [skillInput, setSkillInput] = useState("");

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleChange = (field: keyof JobsData, value: any) => {
    setJob({ ...job, [field]: value });
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !job.skills?.includes(skillInput.trim())) {
      setJob({ ...job, skills: [...(job.skills || []), skillInput.trim()] });
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setJob({ ...job, skills: job.skills?.filter((s: string) => s !== skill) });
  };

  const handleSubmit = () => {
    console.log("Job Submitted:", job);
    alert("Job submitted successfully!");
    setStep(1);
    setJob(initialJob);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-3xl space-y-8">

        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 dark:text-white">Post a New Job</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Find the best talent for your company.</p>
        </div>

        {/* Step Indicator */}
        <div className="w-full">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-700 -z-10 rounded-full"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary-600 transition-all duration-300 rounded-full" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>

            {[1, 2, 3, 4].map((s) => (
              <div key={s} className={`flex flex-col items-center gap-2 bg-slate-50 dark:bg-slate-900 px-2`}>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-4 
                     ${step >= s
                      ? "bg-primary-600 border-primary-100 dark:border-primary-900 text-white shadow-lg shadow-primary-500/30"
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400"
                    }`}
                >
                  {step > s ? <FiCheck className="text-lg" /> : s}
                </div>
                <span className={`text-xs font-medium transition-colors ${step >= s ? "text-primary-600 dark:text-primary-400" : "text-slate-500"}`}>
                  {s === 1 ? "Basics" : s === 2 ? "Details" : s === 3 ? "Skills" : "Review"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Steps */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 transition-all">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-4">
                <FiBriefcase className="text-primary-500" /> Basic Information
              </h2>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Job Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Senior Frontend Developer"
                    value={job.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all dark:text-white placeholder:text-slate-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Company Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Corp"
                    value={job.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all dark:text-white placeholder:text-slate-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Description</label>
                  <textarea
                    placeholder="Describe the role, responsibilities, and requirements..."
                    value={job.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all dark:text-white placeholder:text-slate-400 min-h-[150px]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Location & Type */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-4">
                <FiMapPin className="text-primary-500" /> Location & Details
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. San Francisco, CA"
                    value={job.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all dark:text-white placeholder:text-slate-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Employment Type</label>
                  <div className="relative">
                    <select
                      value={job.employmentType}
                      onChange={(e) => handleChange("employmentType", e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all dark:text-white appearance-none cursor-pointer"
                    >
                      <option value="full_time">Full-time</option>
                      <option value="part_time">Part-time</option>
                      <option value="internship">Internship</option>
                      <option value="contract">Contract</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                      <FiBriefcase />
                    </div>
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Salary Range</label>
                  <div className="relative">
                    <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. $80k - $120k"
                      value={job.salary}
                      onChange={(e) => handleChange("salary", e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all dark:text-white placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 pt-2">
                  <label className="flex items-center gap-3 p-4 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${job.remote ? 'bg-primary-600 border-primary-600' : 'border-slate-400'}`}>
                      {job.remote && <FiCheck className="text-white text-xs" />}
                    </div>
                    <input
                      type="checkbox"
                      checked={job.remote}
                      onChange={(e) => handleChange("remote", e.target.checked)}
                      className="hidden"
                    />
                    <span className="font-medium text-slate-700 dark:text-slate-200">This is a fully remote position</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Skills & Category */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-4">
                <FiLayers className="text-primary-500" /> Skills & Categorization
              </h2>

              <div className="space-y-4">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Required Skills</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a skill and press Add (e.g. React, Node.js)"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                    className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all dark:text-white placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 min-h-[50px] p-4 bg-slate-50 dark:bg-slate-700/30 rounded-xl border border-dashed border-slate-300 dark:border-slate-600">
                  {job.skills?.length === 0 && <span className="text-slate-400 text-sm">No skills added yet.</span>}
                  {job.skills?.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 bg-white dark:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg shadow-sm border border-slate-200 dark:border-slate-500 flex items-center gap-2 text-sm font-medium animate-fade-in">
                      {skill}
                      <button onClick={() => handleRemoveSkill(skill)} className="text-slate-400 hover:text-red-500 transition-colors">
                        &times;
                      </button>
                    </span>
                  ))}
                </div>

                <div className="space-y-2 mt-4">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Category ID</label>
                  <input
                    type="number"
                    value={job.categoryId}
                    onChange={(e) => handleChange("categoryId", Number(e.target.value))}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all dark:text-white placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Final Details */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-4">
                <FiCalendar className="text-primary-500" /> Final Settings
              </h2>

              <div className="space-y-5">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Posting Date</label>
                    <input
                      type="date"
                      value={job.postedDate}
                      onChange={(e) => handleChange("postedDate", e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Company Logo URL</label>
                    <div className="relative">
                      <FiGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="https://example.com/logo.png"
                        value={job.logo}
                        onChange={(e) => handleChange("logo", e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <label className="flex-1 flex items-center gap-3 p-4 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${job.hot ? 'bg-orange-500 border-orange-500' : 'border-slate-400'}`}>
                      {job.hot && <FiCheck className="text-white text-xs" />}
                    </div>
                    <input
                      type="checkbox"
                      checked={job.hot}
                      onChange={(e) => handleChange("hot", e.target.checked)}
                      className="hidden"
                    />
                    <div>
                      <span className="font-medium text-slate-900 dark:text-white block">Hot Job</span>
                      <span className="text-xs text-slate-500">Highlight this job as popular</span>
                    </div>
                  </label>

                  <label className="flex-1 flex items-center gap-3 p-4 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${job.urgent ? 'bg-red-500 border-red-500' : 'border-slate-400'}`}>
                      {job.urgent && <FiCheck className="text-white text-xs" />}
                    </div>
                    <input
                      type="checkbox"
                      checked={job.urgent}
                      onChange={(e) => handleChange("urgent", e.target.checked)}
                      className="hidden"
                    />
                    <div>
                      <span className="font-medium text-slate-900 dark:text-white block">Urgent Hiring</span>
                      <span className="text-xs text-slate-500">Mark as urgent position</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
            {step > 1 ? (
              <button
                onClick={prevStep}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
              >
                <FiArrowLeft /> Back
              </button>
            ) : (
              <div></div>
            )}

            {step < 4 ? (
              <button
                onClick={nextStep}
                className="btn-primary flex items-center gap-2 px-8 py-3 text-lg"
              >
                Next Step <FiArrowRight />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition flex items-center gap-2 shadow-lg shadow-green-500/30 text-lg hover:-translate-y-1"
              >
                Publish Job <FiCheck />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
