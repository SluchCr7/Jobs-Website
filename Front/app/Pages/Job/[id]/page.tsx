"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaGlobe,
  FaArrowLeft,
  FaShareAlt,
  FaHeart
} from "react-icons/fa";
import { MdWork } from "react-icons/md";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { jobs } from "@/app/utils/Data";
import ApplyJobModal from "@/app/Components/ApplyModel";
import { JobsData } from "@/app/utils/Types";

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params?.id);
  const [showModal, setShowModal] = React.useState(false);
  const selectedJob: JobsData | undefined = jobs.find((job) => job.id === id);

  if (!selectedJob) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <p className="text-xl text-slate-500 mb-4">Job not found.</p>
          <button onClick={() => router.push('/Pages/Jobs')} className="btn-primary">Browse Jobs</button>
        </div>
      </div>
    );
  }

  const overallText =
    selectedJob.description ||
    "This role is an exciting opportunity to join a dynamic team and make an impact. We are looking for passionate individuals who are ready to take on challenges and grow their careers.";

  const qualifications = [
    "Bachelor's degree in a related field or equivalent practical experience",
    "3+ years of experience in a relevant role with a track record of success",
    "Strong communication skills and ability to articulate complex ideas",
    "Ability to work independently and collaborate effectively within a team",
  ];

  const requirements = [
    "Proficiency in required technical skills and modern tools",
    "Deep understanding of industry best practices and standards",
    "Familiarity with agile methodologies and project management",
    "Strong problem-solving abilities and attention to detail",
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-20 font-sans transition-colors">
      <div className="container-custom">

        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-500 hover:text-primary-600 transition font-medium">
            <FaArrowLeft /> Back to Jobs
          </button>
          <span className="text-sm text-slate-400 hidden sm:block">
            Jobs / {selectedJob.category || 'General'} / {selectedJob.title}
          </span>
        </div>

        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-24 h-24 rounded-2xl bg-white dark:bg-slate-700 shadow-md flex items-center justify-center p-4 border border-slate-100 dark:border-slate-600 shrink-0">
              {selectedJob.logo ? <img src={selectedJob.logo} alt={selectedJob.company} className="w-full h-full object-contain" /> : <span className="text-3xl font-bold text-gray-400">{selectedJob.company[0]}</span>}
            </div>

            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 dark:text-white mb-4">
                {selectedJob.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
                  <FaBuilding className="text-primary-500" />
                  <span className="font-semibold">{selectedJob.company}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
                  <FaMapMarkerAlt className="text-primary-500" />
                  <span>{selectedJob.location}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
                  <FaMoneyBillWave className="text-green-500" />
                  <span>{selectedJob.salary}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
                  <MdWork className="text-amber-500" />
                  <span>{selectedJob.employmentType}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto">
              <button
                onClick={() => setShowModal(true)}
                className="flex-1 btn-primary py-3 px-8 shadow-lg shadow-primary-500/20 whitespace-nowrap"
              >
                Apply Now
              </button>
              <div className="flex gap-3">
                <button className="p-3 rounded-xl border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-500 transition">
                  <FaHeart />
                </button>
                <button className="p-3 rounded-xl border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-500 transition">
                  <FaShareAlt />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">

          {/* Main Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 font-heading">Overview</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {overallText}
              </p>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4 font-heading">Requirements</h3>
              <ul className="space-y-3">
                {requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-primary-500 shrink-0"></span>
                    <span className="text-slate-600 dark:text-slate-300">{req}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4 font-heading">Qualifications</h3>
              <ul className="space-y-3">
                {qualifications.map((qual, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-primary-500 shrink-0"></span>
                    <span className="text-slate-600 dark:text-slate-300">{qual}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Sidebar Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {selectedJob.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-lg">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Job Info</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex justify-between items-center">
                  <span className="text-slate-500">Posted</span>
                  <span className="font-medium text-slate-900 dark:text-white">{selectedJob.postedDate || 'Just now'}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-slate-500">Experience</span>
                  <span className="font-medium text-slate-900 dark:text-white">Senior Level</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-slate-500">Work Level</span>
                  <span className="font-medium text-slate-900 dark:text-white">{selectedJob.employmentType}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-slate-500">Remote</span>
                  <span className="font-medium text-slate-900 dark:text-white">{selectedJob.remote ? "Yes" : "No"}</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                <FaBuilding className="text-2xl" />
              </div>
              <h3 className="font-bold text-lg mb-2">About {selectedJob.company}</h3>
              <p className="text-slate-300 text-sm mb-4">We are a leading tech company building the future of work. Join our mission.</p>
              <Link href="#" className="text-primary-300 hover:text-white font-medium text-sm transition flex items-center gap-2">
                Visit Website <FaArrowLeft className="rotate-180" />
              </Link>
            </div>

          </motion.div>

        </div>

      </div>
      <ApplyJobModal open={showModal} onClose={() => setShowModal(false)} job={selectedJob} />
    </div>
  );
}
