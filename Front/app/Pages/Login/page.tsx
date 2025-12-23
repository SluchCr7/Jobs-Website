'use client'
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white dark:bg-slate-900">
      {/* Left Side - Illustration */}
      <div className="lg:w-1/2 w-full hidden lg:flex justify-center items-center bg-primary-50 dark:bg-slate-800 p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-200/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

        <div className="relative z-10 text-center">
          <Image
            src="/login.svg"
            width={600}
            height={400}
            alt="Welcome back"
            className="w-full h-auto max-w-lg mx-auto drop-shadow-2xl"
            priority
          />
          <h2 className="mt-8 text-3xl font-heading font-bold text-slate-800 dark:text-white">Welcome Back!</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Log in to access your dashboard, manage your applications, and find your next dream job.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="lg:w-1/2 w-full flex flex-col justify-center items-center p-6 md:p-12">
        <div className="w-full max-w-md space-y-8">

          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-heading font-bold text-slate-900 dark:text-white mb-2">Sign In</h1>
            <p className="text-slate-500 text-lg">
              Don't have an account? <Link href="/Pages/Register" className="text-primary-600 font-semibold hover:underline">Create one</Link>
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              {/* Email */}
              <div className="relative group">
                <FaEnvelope className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors z-10" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary-500 focus:bg-white dark:focus:bg-slate-700 rounded-xl outline-none transition-all font-medium placeholder-slate-400 text-slate-900 dark:text-white"
                />
              </div>

              {/* Password */}
              <div className="relative group">
                <FaLock className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors z-10" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-11 pr-16 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary-500 focus:bg-white dark:focus:bg-slate-700 rounded-xl outline-none transition-all font-medium placeholder-slate-400 text-slate-900 dark:text-white"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500 border-gray-300" />
                <span className="text-sm text-slate-500">Remember me</span>
              </label>
              <Link href="#" className="text-sm font-semibold text-primary-600 hover:text-primary-700">Forgot Password?</Link>
            </div>

            <button
              type="submit"
              className="w-full btn-primary py-4 text-lg shadow-xl shadow-primary-500/30"
            >
              Sign In
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-slate-900 text-slate-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition font-medium text-slate-700 dark:text-slate-300">
              <FcGoogle className="text-xl" /> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition font-medium text-slate-700 dark:text-slate-300">
              <FaLinkedin className="text-xl text-[#0077b5]" /> LinkedIn
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
