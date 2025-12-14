'use client';

import React, { useState } from "react";
import { JobsData } from "@/app/utils/Types";
import { FiArrowRight, FiArrowLeft, FiCheck } from "react-icons/fi";

type EmploymentType = "full_time" | "part_time" | "internship";

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
    setJob({ ...job, skills: job.skills?.filter((s : string) => s !== skill) });
  };

  const handleSubmit = () => {
    console.log("Job Submitted:", job);
    alert("Job submitted successfully!");
    setStep(1);
    setJob(initialJob);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-gray-900">Add New Job</h1>
      <p className="text-gray-600">Fill the details to post a new job opening.</p>

      {/* Step Indicator */}
      <div className="flex justify-between items-center">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex-1">
            <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center font-bold ${step === s ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}>
              {s}
            </div>
            {s < 4 && <div className={`h-1 w-full ${step > s ? "bg-blue-600" : "bg-gray-200"}`}></div>}
          </div>
        ))}
      </div>

      {/* Form Steps */}
      <div className="bg-white p-6 rounded-2xl shadow-lg space-y-6">
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Basic Information</h2>
            <input
              type="text"
              placeholder="Job Title"
              value={job.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Company Name"
              value={job.company}
              onChange={(e) => handleChange("company", e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Job Description"
              value={job.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>
        )}

        {/* Step 2: Location & Type */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Location & Employment Type</h2>
            <input
              type="text"
              placeholder="Location"
              value={job.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={job.remote}
                  onChange={(e) => handleChange("remote", e.target.checked)}
                />
                Remote
              </label>
              <select
                value={job.employmentType}
                onChange={(e) => handleChange("employmentType", e.target.value)}
                className="border rounded-lg px-4 py-2"
              >
                <option value="full_time">Full-time</option>
                <option value="part_time">Part-time</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Salary Range (e.g., $80k - $120k)"
              value={job.salary}
              onChange={(e) => handleChange("salary", e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Step 3: Skills & Category */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Skills & Category</h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a skill"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {job.skills?.map((skill) => (
                <span key={skill} className="px-3 py-1 bg-gray-200 rounded-full flex items-center gap-2">
                  {skill} <button onClick={() => handleRemoveSkill(skill)}>x</button>
                </span>
              ))}
            </div>
            <input
              type="number"
              placeholder="Category ID"
              value={job.categoryId}
              onChange={(e) => handleChange("categoryId", Number(e.target.value))}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Step 4: Optional Meta */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Additional Details</h2>
            <input
              type="date"
              value={job.postedDate}
              onChange={(e) => handleChange("postedDate", e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Logo URL"
              value={job.logo}
              onChange={(e) => handleChange("logo", e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={job.hot}
                onChange={(e) => handleChange("hot", e.target.checked)}
              />
              Hot Job
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={job.urgent}
                onChange={(e) => handleChange("urgent", e.target.checked)}
              />
              Urgent
            </label>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              <FiArrowLeft /> Back
            </button>
          )}
          {step < 4 && (
            <button
              onClick={nextStep}
              className="ml-auto flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Next <FiArrowRight />
            </button>
          )}
          {step === 4 && (
            <button
              onClick={handleSubmit}
              className="ml-auto flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Submit <FiCheck />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
