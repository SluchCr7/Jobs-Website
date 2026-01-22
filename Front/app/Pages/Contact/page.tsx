"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import { ContactForm } from "@/app/utils/Types";
import { FiMessageSquare, FiSend } from "react-icons/fi";

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", message: "" });

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 py-24 px-4 md:px-8 transition-colors font-sans overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="container-custom relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-primary-600 bg-primary-50 dark:bg-primary-900/30 dark:text-primary-300 rounded-full">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-slate-900 dark:text-white">
              We'd love to hear from you
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Have a question about our services? Need help with your account? Our team is ready to assist you.
            </p>
          </motion.div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Contact Info</h3>

                <div className="space-y-8">
                  <div className="flex items-start gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-slate-700 flex items-center justify-center text-primary-600 dark:text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                      <FaEnvelope className="text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">Email</h4>
                      <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                        support@jobfinder.com<br />
                        sales@jobfinder.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-slate-700 flex items-center justify-center text-primary-600 dark:text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                      <FaPhoneAlt className="text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">Phone</h4>
                      <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                        +1 (555) 123-4567<br />
                        Mon-Fri 9am to 6pm EST
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-slate-700 flex items-center justify-center text-primary-600 dark:text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                      <FaMapMarkerAlt className="text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">Office</h4>
                      <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                        123 Business Avenue,<br />
                        Tech District, Cairo, Egypt
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Thumbnail */}
              <div className="mt-10 rounded-2xl overflow-hidden h-48 border border-slate-100 dark:border-slate-700 relative group cursor-pointer">
                <iframe
                  src="https://maps.google.com/maps?q=Cairo&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                ></iframe>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors pointer-events-none" />
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 dark:bg-slate-700/50 rounded-bl-[100px] -z-0" />

              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Send us a message</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8">Fill out the form below and we'll reply within 24 hours.</p>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-900 dark:text-white ml-1">Full Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all dark:text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-900 dark:text-white ml-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900 dark:text-white ml-1">Subject</label>
                    <input
                      type="text"
                      placeholder="How can we help?"
                      className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all dark:text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900 dark:text-white ml-1">Message</label>
                    <textarea
                      placeholder="Tell us more about your inquiry..."
                      className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl h-40 resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all dark:text-white"
                    />
                  </div>

                  <button className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-primary-500/25 transition-all active:scale-[0.99] flex items-center justify-center gap-2">
                    <FiSend /> Send Message
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}