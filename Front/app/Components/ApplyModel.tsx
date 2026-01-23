"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { JobsData } from "../utils/Types";
import { useApplications } from "../Context/ApplicationContext";
import { toast } from "sonner";

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

  const stepsCount = 4;

  // Animation Variants
  const variants = {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4"
        >
          <motion.div
            key={step}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-xl relative"
          >
            {/* Step Indicator */}
            <div className="flex justify-center mb-6">
              {Array.from({ length: stepsCount }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 flex-1 mx-1 rounded-full ${step > idx ? "bg-blue-600" : "bg-gray-300"
                    }`}
                ></div>
              ))}
            </div>

            {/* Step 1 — Confirmation */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">
                  Apply for {job.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mt-3">
                  You are about to apply for this position. Please confirm to proceed.
                </p>
                <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-2xl mt-6 border border-slate-100 dark:border-slate-600">
                  <p className="flex justify-between py-1"><strong className="text-slate-700 dark:text-slate-200">Company:</strong> <span className="text-slate-600 dark:text-slate-400">{typeof job.company === 'string' ? job.company : job.company.name}</span></p>
                  <p className="flex justify-between py-1"><strong className="text-slate-700 dark:text-slate-200">Location:</strong> <span className="text-slate-600 dark:text-slate-400">{job.location}</span></p>
                  <p className="flex justify-between py-1"><strong className="text-slate-700 dark:text-slate-200">Work Mode:</strong> <span className="text-slate-600 dark:text-slate-400">{job.remote ? "Remote" : "On-site"}</span></p>
                </div>
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 btn-primary py-3"
                  >
                    Continue
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 btn-outline py-3"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 — Resume Upload */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">
                  Upload Your Resume
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mt-3">
                  Upload a new resume or choose one from your saved files.
                </p>

                {!resume ? (
                  <label className="mt-6 block w-full border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl p-10 text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <input type="file" hidden onChange={uploadResume} />
                    <p className="text-slate-700 dark:text-slate-300 font-medium">Click to upload your resume (PDF / DOCX)</p>
                  </label>
                ) : (
                  <div className="mt-5 bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl flex items-center justify-between">
                    <p className="font-medium text-slate-700 dark:text-slate-200">{resume.name}</p>
                    <button
                      className="text-red-500 hover:text-red-600 font-medium text-sm"
                      onClick={() => setResume(null)}
                    >
                      Remove
                    </button>
                  </div>
                )}

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 btn-primary py-3"
                  >
                    Continue
                  </button>
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 btn-outline py-3"
                  >
                    Back
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 — Cover Letter */}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">
                  Write a Short Cover Letter
                </h2>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full mt-5 p-4 border-2 border-slate-200 dark:border-slate-700 rounded-2xl h-40 bg-transparent text-slate-900 dark:text-white focus:border-primary-500 focus:outline-none transition-colors"
                  placeholder="Explain briefly why you're a good fit for this role..."
                />

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={handleSubmitApplication}
                    disabled={submitting}
                    className="flex-1 btn-primary py-3 flex items-center justify-center"
                  >
                    {submitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 btn-outline py-3"
                  >
                    Back
                  </button>
                </div>
              </div>
            )}

            {/* Step 4 — Success */}
            {step === 4 && (
              <div className="text-center py-4">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">✔</div>
                <h2 className="text-2xl font-heading font-bold mt-4 text-slate-900 dark:text-white">
                  Application Submitted!
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-sm mx-auto">
                  We will notify you once the employer reviews your application. Good luck!
                </p>

                <div className="mt-8 flex gap-4">
                  <button
                    onClick={() => { setStep(1); onClose(); }}
                    className="flex-1 btn-primary py-3"
                  >
                    Back to Job
                  </button>

                  <button className="flex-1 btn-outline py-3">
                    View Applications
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
