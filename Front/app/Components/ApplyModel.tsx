"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

interface Job {
  title: string;
  company: string;
  location: string;
  remote: boolean;
}

interface ApplyJobModalProps {
  open: boolean;
  onClose: () => void;
  job: Job;
}

export default function ApplyJobModal({ open, onClose, job }: ApplyJobModalProps) {
  const [step, setStep] = useState(1);
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState("");

  const uploadResume = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResume(e.target.files?.[0] || null);
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
                  className={`h-2 flex-1 mx-1 rounded-full ${
                    step > idx ? "bg-blue-600" : "bg-gray-300"
                  }`}
                ></div>
              ))}
            </div>

            {/* Step 1 — Confirmation */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Apply for {job.title}
                </h2>
                <p className="text-gray-600 mt-3">
                  You are about to apply for this position. Please confirm to proceed.
                </p>
                <div className="bg-gray-50 p-4 rounded-xl mt-5 border">
                  <p><strong>Company:</strong> {job.company}</p>
                  <p><strong>Location:</strong> {job.location}</p>
                  <p><strong>Work Mode:</strong> {job.remote ? "Remote" : "On-site"}</p>
                </div>
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
                  >
                    Continue
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 border border-gray-300 py-3 rounded-xl font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 — Resume Upload */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Upload Your Resume
                </h2>
                <p className="text-gray-600 mt-3">
                  Upload a new resume or choose one from your saved files.
                </p>

                {!resume ? (
                  <label className="mt-6 block w-full border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:bg-gray-50">
                    <input type="file" hidden onChange={uploadResume} />
                    <p className="text-gray-700">Click to upload your resume (PDF / DOCX)</p>
                  </label>
                ) : (
                  <div className="mt-5 bg-gray-100 p-4 rounded-xl">
                    <p className="font-medium text-gray-700">{resume.name}</p>
                    <button
                      className="mt-3 text-red-500 underline"
                      onClick={() => setResume(null)}
                    >
                      Remove
                    </button>
                  </div>
                )}

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
                  >
                    Continue
                  </button>
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 border border-gray-300 py-3 rounded-xl font-semibold"
                  >
                    Back
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 — Cover Letter */}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Write a Short Cover Letter
                </h2>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full mt-5 p-4 border rounded-xl h-32"
                  placeholder="Explain briefly why you're a good fit for this role..."
                />

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setStep(4)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
                  >
                    Submit Application
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 border border-gray-300 py-3 rounded-xl font-semibold"
                  >
                    Back
                  </button>
                </div>
              </div>
            )}

            {/* Step 4 — Success */}
            {step === 4 && (
              <div className="text-center">
                <div className="text-green-600 text-5xl font-bold">✔</div>
                <h2 className="text-2xl font-bold mt-4 text-gray-900">
                  Application Submitted!
                </h2>
                <p className="text-gray-600 mt-2">
                  We will notify you once the employer reviews your application.
                </p>

                <div className="mt-8 flex gap-4">
                  <button
                    onClick={() => { setStep(1); onClose(); }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
                  >
                    Back to Job
                  </button>

                  <button className="flex-1 border border-gray-300 py-3 rounded-xl font-semibold">
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
