'use client';

import React, { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  FiMapPin,
  FiGlobe,
  FiUsers,
  FiCalendar,
  FiCheckCircle,
  FiArrowLeft,
  FiExternalLink,
  FiShare2,
  FiHeart,
  FiStar,
  FiActivity,
  FiBriefcase
} from 'react-icons/fi';
import { companies, jobs } from '@/app/utils/Data';
import { Company, JobsData } from '@/app/utils/Types';
import JobCard from '@/app/Components/JobCard';

const CompanyDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = Number(params?.id);
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'culture'>('overview');

  const company: Company | undefined = companies.find(c => c.id === id);

  const companyJobs = useMemo(() => {
    if (!company) return [];
    return jobs.filter(j => j.company.toLowerCase() === company.name.toLowerCase());
  }, [company]);

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">🚫</div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 italic">Company not found</h2>
          <button onClick={() => router.push('/Pages/Companies')} className="btn-primary">
            Browse Companies
          </button>
        </div>
      </div>
    );
  }

  const companyMeta = {
    industry: "Technology & Software",
    founded: "2010",
    size: "1,000 - 5,000 Employees",
    type: "Public Company",
    benefits: [
      { id: 1, title: "Healthcare", desc: "Comprehensive dental and medical insurance." },
      { id: 2, title: "Remote Work", desc: "Flexible work-from-anywhere policy." },
      { id: 3, title: "Learning Path", desc: "Annual budget for courses and certifications." },
      { id: 4, title: "Wellness", desc: "Gym memberships and mental health support." },
    ],
    reviews: [
      { id: 1, user: "Software Engineer", rating: 5, comment: "Amazing culture and brilliant colleagues. The tech stack is modern and challenging." },
      { id: 2, user: "Product Manager", rating: 4, comment: "High growth environment. Lots of opportunities to take ownership." }
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'jobs', label: `Jobs (${companyJobs.length})` },
    { id: 'culture', label: 'Culture & Benefits' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors pt-20 pb-20">

      {/* Navigation Breadcrumb */}
      <div className="container-custom mb-6">
        <button
          onClick={() => router.push('/Pages/Companies')}
          className="flex items-center gap-2 text-slate-500 hover:text-primary-600 transition font-medium group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Companies
        </button>
      </div>

      {/* Header / Hero Section */}
      <div className="relative">
        {/* Cover Image Placeholder */}
        <div className="h-48 md:h-64 lg:h-80 w-full bg-gradient-to-r from-primary-600 to-indigo-700 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 0 L100 0 L100 100 L0 100 Z" fill="url(#grid)" />
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
            </svg>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/10"
          />
        </div>

        <div className="container-custom relative -mt-16 md:-mt-24">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-32 h-32 md:w-40 md:h-40 bg-white dark:bg-slate-700 rounded-3xl p-4 shadow-2xl border border-slate-100 dark:border-slate-600 flex items-center justify-center shrink-0 z-10 glass"
              >
                <Image
                  width={200}
                  height={200}
                  src={company.logoUrl}
                  alt={company.name}
                  className="w-full h-full object-contain"
                />
              </motion.div>

              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 dark:text-white">
                    {company.name}
                  </h1>
                  <FiCheckCircle className="text-primary-500 text-2xl" />
                </div>

                <div className="flex flex-wrap items-center gap-4 text-slate-600 dark:text-slate-400 font-medium text-sm md:text-base">
                  <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900 px-3 py-1 rounded-lg border border-slate-100 dark:border-slate-700">
                    <FiMapPin className="text-primary-500" />
                    <span>{company.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900 px-3 py-1 rounded-lg border border-slate-100 dark:border-slate-700">
                    <FiGlobe className="text-primary-500" />
                    <a href={company.website} target="_blank" className="hover:text-primary-600 transition">
                      Visit Website
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900 px-3 py-1 rounded-lg border border-slate-100 dark:border-slate-700">
                    <FiUsers className="text-primary-500" />
                    <span>{companyMeta.size}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                <button className="flex-1 md:flex-none btn-primary px-8 py-3 shadow-lg shadow-primary-500/20">Follow</button>
                <button className="p-3 rounded-2xl border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-500 transition group">
                  <FiShare2 className="group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-8 mt-10 border-b border-slate-100 dark:border-slate-700 overflow-x-auto scrollbar-hide">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-4 text-sm font-bold transition-all relative whitespace-nowrap ${activeTab === tab.id
                      ? 'text-primary-600'
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-primary-600 rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container-custom mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column (Main) */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
                    <h3 className="text-2xl font-bold mb-4 font-heading">About {company.name}</h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                      {company.description || "Leading the industry with innovation and excellence. Join us in our journey to build the future of technology."}
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mt-10">
                      <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/5 rounded-full -translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-500" />
                        <h4 className="font-bold mb-2 flex items-center gap-2 relative z-10">
                          <FiActivity className="text-primary-500" /> Our Mission
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 text-sm relative z-10">
                          To empower every person and organization on the planet to achieve more through cutting-edge technology and human-centric design.
                        </p>
                      </div>
                      <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full -translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-500" />
                        <h4 className="font-bold mb-2 flex items-center gap-2 relative z-10">
                          <FiStar className="text-amber-500" /> Our Vision
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 text-sm relative z-10">
                          Redefining the boundaries of what is possible by fostering a culture of curiosity, inclusivity, and relentless pursuit of excellence.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Highlights / Features */}
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { title: 'Innovation Hub', icon: <FiActivity />, color: 'primary' },
                      { title: 'Global Impact', icon: <FiGlobe />, color: 'blue' },
                      { title: 'Diverse Team', icon: <FiUsers />, color: 'indigo' }
                    ].map(item => (
                      <div key={item.title} className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center card-hover">
                        <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center text-primary-600 mb-4 text-xl">
                          {item.icon}
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
                        <p className="text-xs text-slate-500 mt-2">Leading the industry standards with high-end solutions.</p>
                      </div>
                    ))}
                  </div>

                  {/* Reviews Sample */}
                  <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
                    <h3 className="text-2xl font-bold mb-6 font-heading">Working Here</h3>
                    <div className="space-y-6">
                      {companyMeta.reviews.map(review => (
                        <div key={review.id} className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-bold text-slate-900 dark:text-white">{review.user}</span>
                            <div className="flex text-amber-500 gap-0.5">
                              {Array(review.rating).fill(0).map((_, i) => <FiStar key={i} fill="currentColor" />)}
                            </div>
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 italic font-medium">"{review.comment}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'jobs' && (
                <motion.div
                  key="jobs"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-6 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div>
                      <h3 className="text-2xl font-bold font-heading">Open Opportunities</h3>
                      <p className="text-slate-500 text-sm">Find your next career move at {company.name}</p>
                    </div>
                    <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-2xl">
                      <span className="text-primary-600 font-bold block text-2xl leading-none">{companyJobs.length}</span>
                      <span className="text-[10px] text-primary-400 uppercase tracking-widest font-bold">Jobs</span>
                    </div>
                  </div>

                  {companyJobs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {companyJobs.map(job => (
                        <JobCard key={job.id} job={job} />
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-16 text-center border border-dashed border-slate-200 dark:border-slate-700">
                      <div className="w-24 h-24 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">📭</div>
                      <h4 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">No active listings</h4>
                      <p className="text-slate-500 max-w-xs mx-auto">We don't have any open positions at the moment. Follow us to get notified when new roles arrive!</p>
                      <button className="mt-8 btn-primary">Follow Updates</button>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'culture' && (
                <motion.div
                  key="culture"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
                    <h3 className="text-2xl font-bold mb-6 font-heading">Perks & Benefits</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {companyMeta.benefits.map(benefit => (
                        <div key={benefit.id} className="flex gap-4 p-5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                          <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center justify-center text-primary-600 shrink-0 shadow-sm shadow-primary-500/10">
                            <FiCheckCircle />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 dark:text-white">{benefit.title}</h4>
                            <p className="text-sm text-slate-500 leading-relaxed">{benefit.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Photo Gallery Placeholder */}
                  <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
                    <h3 className="text-2xl font-bold mb-2 font-heading">Our Workspace</h3>
                    <p className="text-slate-500 text-sm mb-8">A glimpse into where the magic happens.</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="aspect-video bg-slate-100 dark:bg-slate-900 rounded-2xl overflow-hidden relative group">
                          <div className="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/10 transition-all duration-300" />
                          <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <FiActivity size={32} className="opacity-20" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="space-y-6">
            {/* Quick Info Box */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 bg-primary-500 h-full group-hover:w-3 transition-all" />
              <h3 className="font-bold text-slate-900 dark:text-white mb-8 text-lg">Company Info</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center text-primary-500 border border-slate-100 dark:border-slate-700">
                    <FiBriefcase />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-bold uppercase tracking-wider">Industry</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{companyMeta.industry}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center text-primary-500 border border-slate-100 dark:border-slate-700">
                    <FiCalendar />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-bold uppercase tracking-wider">Founded</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{companyMeta.founded}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center text-primary-500 border border-slate-100 dark:border-slate-700">
                    <FiExternalLink />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-bold uppercase tracking-wider">Type</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{companyMeta.type}</span>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-700">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Connect With Us</h4>
                <div className="flex gap-4">
                  {['linkedin', 'twitter', 'facebook'].map(social => (
                    <a key={social} href="#" className="w-10 h-10 flex items-center justify-center bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl text-slate-600 hover:text-primary-600 hover:border-primary-100 transition-all card-hover">
                      <FiGlobe />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Impact/CTA Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden group">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors"
              />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/10">
                  <FiHeart className="text-2xl" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Diversity First</h3>
                <p className="text-indigo-100 text-sm leading-relaxed mb-8">
                  We believe that the best products are built by diverse teams that reflect the world we live in. We are an equal opportunity employer.
                </p>
                <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-bold text-sm hover:scale-[1.02] transition-all drop-shadow-xl active:scale-[0.98]">
                  Our Culture Manual
                </button>
              </div>

              <div className="absolute bottom-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <FiActivity size={80} />
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default CompanyDetailPage;
