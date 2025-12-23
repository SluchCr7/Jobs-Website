'use client';

import { TopicHelp } from '@/app/utils/Types';
import React, { useState } from 'react';
import { FiSearch, FiChevronDown, FiChevronUp, FiUsers, FiBriefcase, FiHelpCircle, FiMessageSquare } from 'react-icons/fi';
import Link from 'next/link';

const topics: TopicHelp[] = [
  {
    id: 1,
    title: "Account & Profile",
    icon: FiUsers,
    faqs: [
      { q: "How to create an account?", a: 'Click "Register" at the top right, select your role (Job Seeker or Employer), and fill in the required details.' },
      { q: "How to reset password?", a: 'Go to the Login page and click "Forgot Password". Follow the instructions sent to your email.' },
      { q: "Can I change my email?", a: 'Yes, go to Settings > Account Security to update your email address.' },
    ],
  },
  {
    id: 2,
    title: "Job Search",
    icon: FiBriefcase,
    faqs: [
      { q: "How to save jobs?", a: 'Click the heart icon on any job card. You can view them later in the "Saved Jobs" page.' },
      { q: "How to apply for jobs?", a: 'Open a job detail page and click "Apply Now". You can attach your resume and cover letter easily.' },
      { q: "How does the search filter work?", a: 'You can filter by location, job type (full-time, remote), salary range, and specific skills.' },
    ],
  },
  {
    id: 3,
    title: "Support & Safety",
    icon: FiHelpCircle,
    faqs: [
      { q: "How to report a fake job?", a: "Click the 'Report' flag icon on the job listing page. Our team investigates all reports immediately." },
      { q: "Is my data safe?", a: "Yes, we use industry-standard encryption to protect your personal information and resume data." },
    ],
  },
];

export default function HelpPagePro() {
  const [search, setSearch] = useState<string>('');
  const [openFAQ, setOpenFAQ] = useState<{ [key: number]: number | null }>({});

  const toggleFAQ = (topicId: number, faqIndex: number) => {
    setOpenFAQ(prev => ({ ...prev, [topicId]: prev[topicId] === faqIndex ? null : faqIndex }));
  };

  const filteredTopics = topics.map(topic => ({
    ...topic,
    faqs: topic.faqs.filter(faq =>
      faq.q.toLowerCase().includes(search.toLowerCase()) ||
      faq.a.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(topic => topic.faqs.length > 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-200 font-sans transition-colors">

      {/* Hero Section */}
      <div className="relative bg-primary-600 dark:bg-slate-800 py-20 px-6 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/30 text-white font-medium text-sm mb-4 border border-white/20 backdrop-blur-sm">
            24/7 Support Center
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
            How can we help you?
          </h1>
          <p className="text-lg md:text-xl text-primary-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Find answers to common questions, browse guides, and learn how to get the most out of our platform.
          </p>

          <div className="relative max-w-2xl mx-auto group">
            <FiSearch className="absolute top-1/2 left-5 -translate-y-1/2 text-primary-200 group-focus-within:text-primary-600 transition-colors text-xl" />
            <input
              type="text"
              placeholder="Search for answers (e.g., 'reset password')"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-primary-400/30 bg-white/10 backdrop-blur-md text-white placeholder-primary-200 focus:bg-white focus:text-slate-900 focus:placeholder-slate-400 focus:border-white focus:ring-4 focus:ring-white/20 transition-all shadow-xl outline-none text-lg"
            />
          </div>
        </div>
      </div>

      {/* Topics Section */}
      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTopics.length > 0 ? (
            filteredTopics.map(topic => (
              <div key={topic.id} className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 p-8 hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-600 dark:text-primary-400">
                    <topic.icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">{topic.title}</h2>
                </div>

                <div className="space-y-3">
                  {topic.faqs.map((faq, index) => (
                    <div key={index} className="border-b border-slate-100 dark:border-slate-700 last:border-0">
                      <button
                        onClick={() => toggleFAQ(topic.id, index)}
                        className="w-full flex justify-between items-start text-left py-3 focus:outline-none group"
                      >
                        <span className={`font-medium text-sm transition-colors ${openFAQ[topic.id] === index ? "text-primary-600 dark:text-primary-400 px-2" : "text-slate-700 dark:text-slate-300 group-hover:text-primary-600 dark:group-hover:text-primary-400"}`}>
                          {faq.q}
                        </span>
                        <span className={`mt-1 ml-2 text-slate-400 transition-transform duration-300 ${openFAQ[topic.id] === index ? "rotate-180 text-primary-500" : ""}`}>
                          <FiChevronDown />
                        </span>
                      </button>

                      <div className={`grid transition-all duration-300 ease-in-out ${openFAQ[topic.id] === index ? "grid-rows-[1fr] opacity-100 pb-4" : "grid-rows-[0fr] opacity-0"}`}>
                        <div className="overflow-hidden">
                          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg border border-slate-100 dark:border-slate-600">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-slate-500 text-lg">No results found for "{search}"</p>
            </div>
          )}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="max-w-4xl mx-auto px-6 pb-20 text-center">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-primary-900 dark:to-slate-900 rounded-3xl p-10 md:p-14 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-heading font-bold mb-4">Still need help?</h2>
            <p className="text-slate-300 mb-8 text-lg max-w-xl mx-auto">
              Our support team is available 24/7 to assist you. Don't hesitate to reach out if you can't find an answer above.
            </p>
            <Link
              href="/Pages/Contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 font-bold rounded-xl bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-500/30 transition-all hover:scale-105"
            >
              <FiMessageSquare /> Contact Support
            </Link>
          </div>

          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
        </div>
      </div>
    </div>
  );
}
