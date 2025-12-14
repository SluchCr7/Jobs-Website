"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gray-50 dark:bg-gray-900">
      
      {/* Illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Image
          src="/empty.svg"
          alt="Not Found Illustration"
          width={400}
          height={400}
          className="mx-auto opacity-90"
        />
      </motion.div>

      {/* Text Content */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mt-6"
      >
        Page Not Found
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        className="text-gray-600 dark:text-gray-300 text-lg md:text-xl mt-4 max-w-xl"
      >
        The page you're looking for doesn't exist or has been moved.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex gap-4 mt-8 flex-wrap justify-center"
      >
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-md transition"
        >
          Go Home
        </Link>

        <Link
          href="/Pages/Jobs"
          className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 
          text-gray-700 dark:text-gray-200 px-8 py-3 rounded-xl font-semibold shadow-sm transition"
        >
          Browse Jobs
        </Link>
      </motion.div>
    </div>
  );
}
