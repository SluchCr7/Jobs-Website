'use client';

import Image from "next/image";
import { useState } from "react";
import { FaEnvelope, FaLock, FaUser, FaBriefcase, FaArrowLeft } from "react-icons/fa";

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
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-50">
      {/* LEFT */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          
          {/* Progress */}
          <div className="flex items-center justify-between mb-6">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 mx-1 rounded-full ${
                  i <= step ? "bg-indigo-500" : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          <h1 className="text-2xl font-bold text-center mb-2">
            {steps[step]}
          </h1>

          {/* STEP CONTENT */}
          {step === 0 && (
            <div className="space-y-4 mt-6">
              <button
                onClick={() => { setForm({ ...form, role: "job_seeker" }); next(); }}
                className="w-full p-4 border rounded-xl hover:border-indigo-500 flex items-center gap-3"
              >
                <FaUser />
                Looking for a Job
              </button>

              <button
                onClick={() => { setForm({ ...form, role: "employer" }); next(); }}
                className="w-full p-4 border rounded-xl hover:border-indigo-500 flex items-center gap-3"
              >
                <FaBriefcase />
                Hiring / Employer
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4 mt-6">
              <Input
                icon={<FaUser />}
                placeholder="Username"
                value={form.username}
                onChange={(v) => setForm({ ...form, username: v })}
              />
              <Input
                icon={<FaEnvelope />}
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 mt-6">
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-10 pr-16 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-400"
                />
                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3 mt-6 text-sm">
              <Review label="Role" value={form.role} />
              <Review label="Username" value={form.username} />
              <Review label="Email" value={form.email} />
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex items-center justify-between mt-8">
            {step > 0 ? (
              <button
                onClick={back}
                className="flex items-center gap-2 text-sm text-gray-500"
              >
                <FaArrowLeft /> Back
              </button>
            ) : <span />}

            {step < steps.length - 1 ? (
              <button
                onClick={next}
                className="bg-indigo-500 text-white px-6 py-2 rounded-xl"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSignup}
                className="bg-indigo-600 text-white px-6 py-2 rounded-xl"
              >
                Sign Up
              </button>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="hidden lg:flex items-center justify-center bg-indigo-50">
        <Image src="/register.svg" width={500} height={500} alt="Register" />
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
}: {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-400"
      />
    </div>
  );
}

function Review({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between border-b py-2">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
