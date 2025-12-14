"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { ContactForm } from "@/app/utils/Types";
export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", message: "" });

  return (
    <div className="w-full min-h-screen bg-gray-50 py-20 px-6 flex flex-col items-center">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-6 text-gray-900"
      >
        Contact Us
      </motion.h1>

      <p className="text-gray-600 max-w-2xl text-center mb-14">
        We are here to help you. Feel free to reach out at any time and our team will respond shortly.
      </p>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-6xl">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white shadow-lg rounded-2xl p-8"
        >
          <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>

          <div className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="Your Name"
              className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <textarea
              placeholder="Your Message"
              className="p-3 rounded-xl border border-gray-300 h-32 resize-none focus:outline-none focus:border-blue-500"
            />

            <button className="w-full py-6 text-lg rounded-xl">Send Message</button>
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-8 bg-white shadow-lg rounded-2xl p-8"
        >
          <h2 className="text-2xl font-semibold mb-4">Get in touch</h2>

          <div className="flex items-start gap-4">
            <FaPhoneAlt className="text-blue-600 text-xl" />
            <div>
              <h4 className="font-bold text-gray-900">Phone</h4>
              <p className="text-gray-600">+1 234 567 890</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaEnvelope className="text-blue-600 text-xl" />
            <div>
              <h4 className="font-bold text-gray-900">Email</h4>
              <p className="text-gray-600">support@jobfinder.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="text-blue-600 text-xl" />
            <div>
              <h4 className="font-bold text-gray-900">Address</h4>
              <p className="text-gray-600">123 Business Street, Cairo, Egypt</p>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="rounded-xl overflow-hidden h-56 mt-4">
            <iframe
              src="https://maps.google.com/maps?q=Cairo&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
}