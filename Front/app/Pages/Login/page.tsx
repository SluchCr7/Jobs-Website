'use client'
import Image from "next/image";
import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // هنا يمكنك إضافة منطق تسجيل الدخول
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Left Side - Illustration */}
      <div className="lg:w-1/2 w-full flex justify-center items-center bg-indigo-50">
        <Image
          src="/login.svg"
          width={600}
          height={600}
          alt="Login Illustration"
          className="w-3/4 h-auto"
        />
      </div>

      {/* Right Side - Form */}
      <div className="lg:w-1/2 w-full flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="bg-indigo-500 p-3 rounded-full">
              <FaEnvelope className="text-white text-2xl" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">Log in to your account</h1>
          <p className="text-gray-500 text-center mb-6">
            Don't have an account? <span className="text-indigo-500 cursor-pointer hover:underline">Sign up</span>
          </p>

          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"/>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"/>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            {/* Forgot password */}
            <div className="text-right">
              <span className="text-indigo-500 cursor-pointer hover:underline text-sm">Forgot password?</span>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-3 rounded-xl font-semibold hover:bg-indigo-600 transition"
            >
              Sign In
            </button>
          </form>

          {/* Or sign in with */}
          <div className="flex items-center my-6">
            <hr className="flex-1 border-gray-300"/>
            <span className="px-4 text-gray-400 text-sm">or sign in with</span>
            <hr className="flex-1 border-gray-300"/>
          </div>

          {/* Social buttons */}
          <div className="flex gap-4 justify-center">
            <button className="flex-1 flex items-center justify-center gap-2 py-2 border rounded-xl hover:bg-gray-100 transition">
              <img src="/google.svg" alt="Google" className="w-5 h-5"/>
              Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 border rounded-xl hover:bg-gray-100 transition">
              <img src="/linkedin.svg" alt="LinkedIn" className="w-5 h-5"/>
              LinkedIn
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
