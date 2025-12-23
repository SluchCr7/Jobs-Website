'use client';

import Image from "next/image";
import { useState } from "react";
import { FaEnvelope, FaLock, FaUser, FaBriefcase, FaArrowLeft, FaCheck } from "react-icons/fa";
import Link from 'next/link';

type Role = "job_seeker" | "employer";

interface RegisterData {
  role?: Role;
  username: string;
  email: string;
  password: string;
}

const steps = ["Account Type", "Basic Info", "Security", "Review"];

export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState<RegisterData>({
    username: "",
    email: "",
    password: "",
  });

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleSignup = () => {
    console.log("REGISTER PAYLOAD", form);
    // API CALL HERE
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-slate-900 font-sans">
      {/* LEFT CONTENT */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl font-heading font-bold text-slate-900 dark:text-white mb-2">Create Account</h1>
            <p className="text-slate-500">
              Already have an account? <Link href="/Pages/Login" className="text-primary-600 font-semibold hover:underline">Log in</Link>
            </p>
          </div>

          {/* Progress Stepper */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-2">
              {steps.map((label, i) => (
                <div key={i} className="flex flex-col items-center relative z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${i <= step ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30' : 'bg-slate-200 text-slate-500 dark:bg-slate-700'}`}>
                    {i < step ? <FaCheck /> : i + 1}
                  </div>
                </div>
              ))}
            </div>
            <div className="relative h-1 bg-slate-200 dark:bg-slate-700 rounded-full -mt-6 mx-4 z-0">
              <div
                className="absolute left-0 top-0 h-full bg-primary-600 transition-all duration-500 rounded-full"
                style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-6 text-xs font-medium text-slate-500">
              <span>Type</span>
              <span>Info</span>
              <span>Security</span>
              <span>Review</span>
            </div>
          </div>

          {/* STEP CONTENT */}
          <div className="min-h-[300px]">
            {step === 0 && (
              <div className="space-y-4 animate-slide-up">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">I want to...</h2>
                <button
                  onClick={() => { setForm({ ...form, role: "job_seeker" }); next(); }}
                  className={`w-full p-6 border-2 rounded-2xl flex items-center gap-4 transition-all hover:shadow-lg group text-left ${form.role === 'job_seeker' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-slate-200 dark:border-slate-700 hover:border-primary-200'}`}
                >
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    <FaUser />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Find a Job</h3>
                    <p className="text-sm text-slate-500 mt-1">Discover opportunities and apply.</p>
                  </div>
                </button>

                <button
                  onClick={() => { setForm({ ...form, role: "employer" }); next(); }}
                  className={`w-full p-6 border-2 rounded-2xl flex items-center gap-4 transition-all hover:shadow-lg group text-left ${form.role === 'employer' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-slate-200 dark:border-slate-700 hover:border-primary-200'}`}
                >
                  <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    <FaBriefcase />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Hire Talent</h3>
                    <p className="text-sm text-slate-500 mt-1">Post jobs and find candidates.</p>
                  </div>
                </button>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4 animate-slide-up">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Basic Information</h2>
                <Input
                  icon={<FaUser />}
                  placeholder="Full Name"
                  value={form.username}
                  onChange={(v) => setForm({ ...form, username: v })}
                  autoFocus
                />
                <Input
                  icon={<FaEnvelope />}
                  placeholder="Email Address"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-slide-up">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Secure your account</h2>
                <div className="relative group">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full pl-12 pr-16 py-4 border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-xl focus:border-primary-500 focus:bg-white dark:focus:bg-slate-700 outline-none transition-all"
                    autoFocus
                  />
                  <span
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 cursor-pointer hover:text-primary-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "HIDE" : "SHOW"}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Must be at least 8 characters long.
                </p>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-slide-up">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Review Details</h2>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 space-y-4 border border-slate-100 dark:border-slate-700">
                  <Review label="Account Type" value={form.role === 'job_seeker' ? 'Candidate' : 'Employer'} />
                  <Review label="Full Name" value={form.username} />
                  <Review label="Email Address" value={form.email} />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500 border-slate-300" id="terms" />
                  <label htmlFor="terms" className="text-sm text-slate-500">I agree to the <a href="#" className="text-primary-600 hover:underline">Terms of Service</a> and <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a>.</label>
                </div>
              </div>
            )}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={back}
              className={`flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white transition ${step === 0 ? 'invisible' : ''}`}
            >
              <FaArrowLeft /> Back
            </button>

            {step < steps.length - 1 ? (
              <button
                onClick={next}
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary-500/30 transition-all active:scale-95"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSignup}
                className="bg-gradient-to-r from-primary-600 to-primary-500 hover:to-primary-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary-500/30 transition-all active:scale-95"
              >
                Create Account
              </button>
            )}
          </div>

        </div>
      </div>

      {/* RIGHT SIDE (Illustration) */}
      <div className="hidden lg:flex items-center justify-center p-12 bg-primary-50 dark:bg-slate-800 relative overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="relative z-10 text-center">
          <Image src="/register.svg" width={500} height={500} alt="Join us" className="drop-shadow-2xl mb-8" />
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Start your journey today</h3>
          <p className="text-slate-500 mt-2">Join thousands of professionals growing their careers.</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Small Components ---------- */

function Input({
  icon,
  placeholder,
  value,
  onChange,
  type = "text",
  autoFocus
}: {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoFocus?: boolean;
}) {
  return (
    <div className="relative group">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors z-10">
        {icon}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-xl focus:border-primary-500 focus:bg-white dark:focus:bg-slate-700 outline-none transition-all placeholder-slate-400 text-slate-900 dark:text-white font-medium"
        autoFocus={autoFocus}
      />
    </div>
  );
}

function Review({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700 last:border-0">
      <span className="text-slate-500 text-sm">{label}</span>
      <span className="font-semibold text-slate-800 dark:text-white">{value}</span>
    </div>
  );
}
