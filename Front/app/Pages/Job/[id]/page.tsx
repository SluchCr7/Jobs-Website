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
import { MdWork, MdCategory, MdAccessTime } from "react-icons/md";
import { useAuth } from "@/app/Context/AuthContext"; // Import AuthContext
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useJobs } from "@/app/Context/JobContext";
import ApplyJobModal from "@/app/Components/ApplyModel";
import { JobsData } from "@/app/utils/Types";

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  // Using string for ID as backend uses MongoDB _id
  const id = params?.id as string;
  const { currentJob, fetchJobById, loading, saveJob } = useJobs();
  const { user } = useAuth(); // Get user to check saved status
  const [showModal, setShowModal] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);

  React.useEffect(() => {
    if (id) {
      fetchJobById(id);
    }
  }, [id, fetchJobById]);

  React.useEffect(() => {
    // Check if current job is saved by user
    if (user && user.savedJobs && currentJob) {
      const isJobSaved = user.savedJobs.some((savedId: any) => savedId.toString() === currentJob._id);
      setIsSaved(isJobSaved);
    }
  }, [user, currentJob]);

  const handleSave = async () => {
    if (!currentJob) return;
    await saveJob(currentJob._id);
    // Note: context update handles state, but local toggle gives instant feedback
    setIsSaved(!isSaved);
  };

  // Loading State
  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 animate-pulse">Loading Job Details...</p>
        </div>
      </div>
    );
  }

  // Use currentJob from context
  const selectedJob = currentJob;

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

  // Handle categories if available or default
  const categoryName = selectedJob.category?.name || 'General';

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
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary-50/50 to-transparent dark:from-primary-900/10 dark:to-transparent pointer-events-none" />

      <div className="container-custom relative z-10">

        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-500 hover:text-primary-600 transition font-medium">
            <FaArrowLeft /> Back to Jobs
          </button>
          <span className="text-sm text-slate-400 hidden sm:block">
            Jobs / {selectedJob.title.split(' ')[0]} / {selectedJob.title}
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
              {(selectedJob.logo || (typeof selectedJob.company !== 'string' && selectedJob.company.logo)) ? (
                <img
                  src={
                    typeof selectedJob.logo === 'string'
                      ? selectedJob.logo
                      : (typeof selectedJob.company !== 'string' ? selectedJob.company.logo?.url : undefined)
                  }
                  alt={typeof selectedJob.company === 'string' ? selectedJob.company : selectedJob.company.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-3xl font-bold text-gray-400">
                  {(typeof selectedJob.company === 'string' ? selectedJob.company : selectedJob.company.name)[0]}
                </span>
              )}
            </div>

            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 dark:text-white mb-4">
                {selectedJob.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
                  <FaBuilding className="text-primary-500" />
                  <span className="font-semibold">{typeof selectedJob.company === 'string' ? selectedJob.company : selectedJob.company.name}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
                  <FaMapMarkerAlt className="text-primary-500" />
                  <span>{selectedJob.location}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
                  <FaMoneyBillWave className="text-green-500" />
                  <span>{typeof selectedJob.salary === 'object' ? `${selectedJob.salary.min} - ${selectedJob.salary.max} ${selectedJob.salary.currency}` : selectedJob.salary}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
                  <MdWork className="text-amber-500" />
                  <span>{selectedJob.employmentType}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
                  <MdCategory className="text-purple-500" />
                  <span>{categoryName}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto">
              {(() => {
                const jobCompanyId = typeof selectedJob.company === 'string' ? selectedJob.company : selectedJob.company?._id || selectedJob.company?.id;
                const userCompanyId = typeof user?.company === 'string' ? user?.company : user?.company?._id || user?.company?.id;

                // Enhanced affiliation check (including members list)
                const isCompanyMember = (selectedJob.company as any)?.members?.some((m: any) =>
                  (typeof m.user === 'string' ? m.user : m.user?._id) === user?._id
                );
                const isOwner = (selectedJob.company as any)?.owner === user?._id || (selectedJob.company as any)?.owner?._id === user?._id;

                const isAffiliated = user && (userCompanyId === jobCompanyId || user._id === selectedJob.createdBy || isCompanyMember || isOwner);

                if (isAffiliated) {
                  return (
                    <div className="flex-1 bg-slate-100 dark:bg-slate-700/50 p-4 rounded-xl border border-slate-200 dark:border-slate-600 text-center text-sm font-bold text-slate-500 flex items-center justify-center gap-2">
                      <FaBuilding className="text-slate-400" />
                      You are affiliated with this company
                    </div>
                  );
                }

                return (
                  <button
                    onClick={() => setShowModal(true)}
                    className="flex-1 btn-primary py-3 px-8 shadow-lg shadow-primary-500/20 whitespace-nowrap"
                  >
                    Apply Now
                  </button>
                );
              })()}

              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className={`p-3 rounded-xl border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition ${isSaved ? 'text-red-500 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900' : 'text-slate-500'}`}
                >
                  <FaHeart className={isSaved ? "fill-current" : ""} />
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
                {selectedJob.skills?.map((skill: any) => (
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
              <h3 className="font-bold text-lg mb-2">About {typeof selectedJob.company === 'string' ? selectedJob.company : selectedJob.company.name}</h3>
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
