'use client';

import { TopicHelp } from '@/app/utils/Types';
import React, { useState } from 'react';
import { FiSearch, FiChevronDown, FiChevronUp, FiMail, FiHelpCircle, FiUsers, FiBriefcase } from 'react-icons/fi';
const topics: TopicHelp[] = [
  {
    id: 1,
    title: "Account",
    icon: FiUsers,
    faqs: [
      { q: "How to create an account?", a: 'Click "Get Started" and fill the form to register.' },
      { q: "How to reset password?", a: 'Use "Forgot Password" link on login page.' },
    ],
  },
  {
    id: 2,
    title: "Jobs",
    icon: FiBriefcase,
    faqs: [
      { q: "How to save jobs?", a: 'Click the "Save Job" button on any job listing.' },
      { q: "How to apply for jobs?", a: 'Open the job and click "Apply Now".' },
    ],
  },
  {
    id: 3,
    title: "Support",
    icon: FiHelpCircle,
    faqs: [
      { q: "How to contact support?", a: "Use the contact form below or email support@jobfinder.com." },
    ],
  },
];

export default function HelpPagePro() {
  const [search, setSearch] = useState<string>('');
  const [openFAQ, setOpenFAQ] = useState<{[key: number]: number | null}>({});

  const toggleFAQ = (topicId: number, faqIndex: number) => {
    setOpenFAQ(prev => ({ ...prev, [topicId]: prev[topicId] === faqIndex ? null : faqIndex }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      {/* Hero Section */}
      <div className="bg-red-500 dark:bg-red-600 py-16">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <h1 className="text-5xl font-extrabold text-white">Help Center</h1>
          <p className="mt-4 text-lg sm:text-xl text-white/90">
            Find answers to common questions and learn how to get the most out of JobFinder
          </p>
          <div className="mt-6 flex justify-center">
            <div className="relative w-full max-w-xl">
              <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search help articles..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-white/50 focus:ring-2 focus:ring-white focus:outline-none bg-white/20 text-white placeholder-white/70 backdrop-blur-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Topics Section */}
      <div className="max-w-7xl mx-auto px-5 mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map(topic => (
          <div key={topic.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition p-5">
            <div className="flex items-center gap-3 mb-4">
              <topic.icon className="text-red-500 w-6 h-6"/>
              <h2 className="text-xl font-semibold">{topic.title}</h2>
            </div>
            <div className="space-y-2">
              {topic.faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-0">
                  <button
                    onClick={() => toggleFAQ(topic.id, index)}
                    className="w-full flex justify-between items-center py-3 focus:outline-none hover:bg-gray-50 dark:hover:bg-gray-700 transition px-2 rounded"
                  >
                    <span>{faq.q}</span>
                    {openFAQ[topic.id] === index ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  {openFAQ[topic.id] === index && (
                    <p className="px-2 pb-3 text-gray-700 dark:text-gray-300">{faq.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Contact CTA */}
      <div className="max-w-7xl mx-auto px-5 mt-16 pt-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Still need help?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Contact our support team and we'll get back to you as soon as possible.
        </p>
        <a
          href="/Pages/contact"
          className="inline-block px-8 py-3 font-semibold rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:scale-105 transition-transform duration-200"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}
