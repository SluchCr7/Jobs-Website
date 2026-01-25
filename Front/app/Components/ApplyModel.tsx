"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { JobsData } from "../utils/Types";
import { useApplications } from "../Context/ApplicationContext";
import { toast } from "sonner";
import {
  FileText, CheckCircle2, UploadCloud, ChevronRight,
  ChevronLeft, X, Briefcase, MapPin,
  ExternalLink, Send, FileCheck, Layers
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ApplyJobModalProps {
  open: boolean;
  onClose: () => void;
  job: JobsData;
}

export default function ApplyJobModal({ open, onClose, job }: ApplyJobModalProps) {
  const [step, setStep] = useState(1);
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const { applyToJob } = useApplications();
  const [submitting, setSubmitting] = useState(false);

  const uploadResume = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResume(e.target.files?.[0] || null);
  };

  const handleSubmitApplication = async () => {
    if (!resume) {
      toast.error("Please upload your resume first.");
      return;
    }

    setSubmitting(true);
    try {
      // Handle both _id (backend) and id (frontend mock)
      const jobId = (job as any)._id || job.id.toString();
      await applyToJob(jobId, resume, coverLetter);
      setStep(4);
    } catch (e) {
      console.error(e);
      // Toast handled in context
    } finally {
      setSubmitting(false);
    }
  };

  const companyName = typeof job.company === 'string' ? job.company : job.company?.name || 'Unknown Company';
  const companyLogo = typeof job.company === 'object' && job.company?.logo?.url
    ? job.company.logo.url
    : (job.logo || (typeof job.company === 'object' ? job.company.logoUrl : '') || '/placeholder-logo.png');

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-2xl glass-strong rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 border border-white/20 dark:border-slate-700/50 flex flex-col md:flex-row min-h-[500px]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors z-20"
            >
              <X className="w-6 h-6 text-slate-500" />
            </button>

            {/* Sidebar Info - Hidden on small screens */}
            <div className="hidden md:flex flex-col w-64 bg-slate-900 text-white p-8 relative overflow-hidden shrink-0">
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-8 p-3">
                  <Image
                    src={companyLogo}
                    alt={companyName}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2 leading-tight">Applying for {job.title}</h3>
                <p className="text-slate-400 text-sm mb-8">{companyName}</p>

                <div className="space-y-6 mt-auto">
                  {[
                    { id: 1, title: "Review", icon: Layers },
                    { id: 2, title: "Resume", icon: FileText },
                    { id: 3, title: "Pitch", icon: Send },
                  ].map((s) => (
                    <div key={s.id} className={`flex items-center gap-3 transition-colors ${step >= s.id ? 'text-primary-400' : 'text-slate-500'}`}>
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${step === s.id ? 'border-primary-500 bg-primary-500 text-slate-900' :
                          step > s.id ? 'border-primary-500 text-primary-500 bg-transparent' : 'border-slate-700'
                        }`}>
                        {step > s.id ? <CheckCircle2 size={14} /> : s.id}
                      </div>
                      <span className="text-sm font-bold uppercase tracking-wider">{s.title}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Decorative mesh */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-white dark:bg-slate-900 p-8 md:p-12 overflow-y-auto">
              <AnimatePresence mode="wait">
                {/* Step 1 — Confirmation/Details */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="mb-8">
                      <span className="text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-widest mb-2 block">Step 01 / 03</span>
                      <h2 className="text-3xl font-heading font-black text-slate-900 dark:text-white">Review Role</h2>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                        <div className="p-3 bg-white dark:bg-slate-700 rounded-xl shadow-sm">
                          <Briefcase className="w-5 h-5 text-primary-500" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Company</p>
                          <p className="text-slate-900 dark:text-white font-bold">{companyName}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                        <div className="p-3 bg-white dark:bg-slate-700 rounded-xl shadow-sm">
                          <MapPin className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Location</p>
                          <p className="text-slate-900 dark:text-white font-bold">{job.location || 'Remote'}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                        <div className="p-3 bg-white dark:bg-slate-700 rounded-xl shadow-sm">
                          <UploadCloud className="w-5 h-5 text-purple-500" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Employment</p>
                          <p className="text-slate-900 dark:text-white font-bold">{job.employmentType?.replace('_', ' ') || 'Full Time'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-8">
                      <button
                        onClick={() => setStep(2)}
                        className="w-full btn-primary h-14 rounded-2xl flex items-center justify-center gap-2 group"
                      >
                        <span className="font-bold">Sounds Good, Next</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2 — Resume Upload */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="mb-8">
                      <span className="text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-widest mb-2 block">Step 02 / 03</span>
                      <h2 className="text-3xl font-heading font-black text-slate-900 dark:text-white">Your Resume</h2>
                    </div>

                    <div className="relative group">
                      {!resume ? (
                        <label className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-[2rem] cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all group-hover:border-primary-500">
                          <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={uploadResume} />
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <div className="w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                              <UploadCloud size={32} />
                            </div>
                            <p className="mb-1 text-sm text-slate-900 dark:text-white font-bold">Drop your resume here</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">PDF, DOCX up to 5MB</p>
                          </div>
                        </label>
                      ) : (
                        <div className="w-full h-56 rounded-[2rem] border-2 border-primary-500 bg-primary-50/30 dark:bg-primary-900/10 flex flex-col items-center justify-center p-6 text-center">
                          <div className="w-16 h-16 rounded-2xl bg-primary-500 text-white flex items-center justify-center mb-4 shadow-xl shadow-primary-500/20">
                            <FileCheck size={32} />
                          </div>
                          <p className="text-slate-900 dark:text-white font-bold truncate max-w-full px-4 mb-2">{resume.name}</p>
                          <button
                            onClick={() => setResume(null)}
                            className="text-primary-600 dark:text-primary-400 text-sm font-bold hover:underline"
                          >
                            Change File
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-4 pt-8">
                      <button
                        onClick={() => setStep(1)}
                        className="flex-1 btn-outline h-14 rounded-2xl flex items-center justify-center gap-2"
                      >
                        <ChevronLeft className="w-5 h-5" />
                        <span className="font-bold text-slate-600 dark:text-slate-300">Back</span>
                      </button>
                      <button
                        onClick={() => setStep(3)}
                        disabled={!resume}
                        className="flex-[2] btn-primary h-14 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        <span className="font-bold">Almost Done</span>
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3 — Cover Letter */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="mb-8">
                      <span className="text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-widest mb-2 block">Step 03 / 03</span>
                      <h2 className="text-3xl font-heading font-black text-slate-900 dark:text-white">Why You?</h2>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Cover Letter (Optional)</label>
                      <textarea
                        placeholder="Briefly explain why you're a perfect match for this position..."
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        className="w-full h-48 p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-primary-500 transition-colors resize-none text-sm font-medium leading-relaxed"
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={() => setStep(2)}
                        className="flex-1 btn-outline h-14 rounded-2xl flex items-center justify-center gap-2"
                      >
                        <ChevronLeft className="w-5 h-5" />
                        <span className="font-bold text-slate-600 dark:text-slate-300">Back</span>
                      </button>
                      <button
                        onClick={handleSubmitApplication}
                        disabled={submitting}
                        className="flex-[2] btn-primary h-14 rounded-2xl flex items-center justify-center gap-2 group"
                      >
                        {submitting ? (
                          <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <span className="font-bold text-white">Submit Application</span>
                            <Send className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 4 — Success */}
                {step === 4 && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6"
                  >
                    <div className="w-24 h-24 bg-emerald-500 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/30">
                      <CheckCircle2 size={48} />
                    </div>
                    <h2 className="text-3xl font-heading font-black text-slate-900 dark:text-white mb-4">
                      All Done!
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-medium">
                      Your application for <span className="text-primary-600 dark:text-primary-400 font-bold">{job.title}</span> has been sent successfully. We'll notify you soon!
                    </p>

                    <div className="flex flex-col gap-4">
                      <button
                        onClick={() => { setStep(1); onClose(); }}
                        className="w-full btn-primary h-14 rounded-2xl font-bold transition-all"
                      >
                        Done
                      </button>
                      <Link
                        href="/Pages/JobsRequests"
                        onClick={onClose}
                        className="w-full text-sm font-bold text-slate-500 hover:text-primary-600 transition-colors flex items-center justify-center gap-2"
                      >
                        View My Applications
                        <ExternalLink size={14} />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
