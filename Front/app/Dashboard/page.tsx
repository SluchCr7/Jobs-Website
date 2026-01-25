'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bell, Briefcase, Users, BarChart3, Settings, CreditCard, MessageSquare,
  Shield, Star, Menu, Search, Plus, TrendingUp, TrendingDown, Eye, Edit,
  Trash2, MoreVertical, Download, Filter, Calendar, DollarSign, Clock,
  Target, Award, Zap, Activity, ArrowUpRight, ArrowDownRight, X, ChevronDown,
  Building2, MapPin, Globe, Mail, Phone, ExternalLink, FileText
} from 'lucide-react'
import { useAuth } from '../Context/AuthContext'
import { useCompanies } from '../Context/CompanyContext'
import { useApplications } from '../Context/ApplicationContext'
import { useJobs } from '../Context/JobContext'

export default function CompanyDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState('overview')
  const [showNotifications, setShowNotifications] = useState(false)

  const { user } = useAuth()
  const { currentCompany, fetchCompanyById } = useCompanies()
  const { companyApplications, fetchCompanyApplications, updateApplicationStatus, loading: appsLoading } = useApplications()
  const { jobs: allJobs, fetchJobs, deleteJob } = useJobs()

  const searchParams = useSearchParams()
  const companyId = searchParams.get('company') || (user?.company?._id || user?.company)

  useEffect(() => {
    if (companyId) {
      fetchCompanyById(companyId)
      fetchCompanyApplications(companyId)
      fetchJobs()
    }
  }, [companyId])

  const companyJobs = useMemo(() => {
    return allJobs.filter(j => {
      const jId = typeof j.company === 'string' ? j.company : j.company?._id;
      return jId === companyId;
    })
  }, [allJobs, companyId])

  // Real Stats
  const stats = [
    {
      label: 'Active Jobs',
      value: companyJobs.length.toString(),
      change: '+0%',
      trend: 'up',
      icon: Briefcase,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      label: 'Total Applications',
      value: companyApplications.length.toString(),
      change: '+0%',
      trend: 'up',
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      label: 'New Applications',
      value: companyApplications.filter(a => a.status === 'pending').length.toString(),
      change: '+0%',
      trend: 'up',
      icon: Activity,
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
    },
    {
      label: 'Interviews',
      value: companyApplications.filter(a => a.status === 'accepted' || a.status === 'reviewed').length.toString(),
      change: '+0%',
      trend: 'up',
      icon: Target,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    }
  ]

  const recentJobs = [
    { id: 1, title: 'Senior Frontend Developer', status: 'active', applications: 142, views: 1240, posted: '2 days ago' },
    { id: 2, title: 'Product Designer', status: 'active', applications: 89, views: 890, posted: '5 days ago' },
    { id: 3, title: 'Backend Engineer', status: 'paused', applications: 56, views: 450, posted: '1 week ago' },
    { id: 4, title: 'DevOps Engineer', status: 'active', applications: 73, views: 620, posted: '3 days ago' },
  ]

  const recentMessages = [
    { id: 1, name: 'Sarah Johnson', message: 'Hi, I wanted to follow up on my application...', time: '2h ago', avatar: 'SJ', unread: true },
    { id: 2, name: 'Michael Chen', message: 'Thank you for the interview opportunity...', time: '5h ago', avatar: 'MC', unread: true },
    { id: 3, name: 'Emma Wilson', message: 'Could you provide more details about...', time: '1d ago', avatar: 'EW', unread: false },
  ]

  const candidatePipeline = [
    { stage: 'New', count: 24, candidates: ['John D.', 'Sarah M.'], color: 'bg-slate-100 dark:bg-slate-800' },
    { stage: 'Screening', count: 18, candidates: ['Mike R.', 'Lisa K.'], color: 'bg-blue-100 dark:bg-blue-900/30' },
    { stage: 'Interview', count: 12, candidates: ['Tom B.', 'Anna P.'], color: 'bg-purple-100 dark:bg-purple-900/30' },
    { stage: 'Offer', count: 5, candidates: ['David L.', 'Emma W.'], color: 'bg-orange-100 dark:bg-orange-900/30' },
    { stage: 'Hired', count: 8, candidates: ['Chris H.', 'Nina S.'], color: 'bg-emerald-100 dark:bg-emerald-900/30' },
  ]

  const activities = [
    { type: 'application', user: 'John Doe', action: 'applied for', job: 'Senior Developer', time: '5 min ago', icon: Briefcase },
    { type: 'message', user: 'Sarah Johnson', action: 'sent a message', job: 'Product Designer', time: '12 min ago', icon: MessageSquare },
    { type: 'view', user: '12 candidates', action: 'viewed', job: 'Backend Engineer', time: '1h ago', icon: Eye },
    { type: 'hire', user: 'Michael Chen', action: 'was hired for', job: 'DevOps Engineer', time: '2h ago', icon: Award },
  ]

  const sidebarItems = [
    { icon: BarChart3, label: 'Overview', id: 'overview', active: true },
    { icon: Briefcase, label: 'Jobs', id: 'jobs', badge: '24' },
    { icon: Users, label: 'Candidates', id: 'candidates', badge: '142' },
    { icon: MessageSquare, label: 'Messages', id: 'messages', badge: '5' },
    { icon: Star, label: 'Reviews', id: 'reviews' },
    { icon: Activity, label: 'Analytics', id: 'analytics' },
    { icon: CreditCard, label: 'Billing', id: 'billing' },
  ]

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 transition-colors">

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-80 glass-strong border-r border-slate-200/50 dark:border-slate-700/50 flex-col fixed inset-y-0 z-30">
        {/* Logo */}
        <div className="p-8 border-b border-slate-200/50 dark:border-slate-700/50">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl gradient-primary text-white flex items-center justify-center font-black text-xl shadow-xl shadow-primary-500/30 group-hover:scale-110 transition-transform">
              JF
            </div>
            <div>
              <span className="font-heading font-black text-2xl gradient-text">JobFinder</span>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Dashboard</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedTab(item.id)}
              className={`w-full flex items-center justify-between gap-3 px-5 py-4 rounded-2xl font-semibold transition-all duration-300 ${selectedTab === item.id
                ? 'gradient-primary text-white shadow-xl shadow-primary-500/30 scale-105'
                : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:scale-105'
                }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${selectedTab === item.id
                  ? 'bg-white/20 text-white'
                  : 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                  }`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-6 border-t border-slate-200/50 dark:border-slate-700/50 space-y-2">
          <Link href="#" className="flex items-center gap-3 px-5 py-4 rounded-2xl font-semibold text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 transition-all hover:scale-105">
            <Shield className="w-5 h-5" />
            <span>Security</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-5 py-4 rounded-2xl font-semibold text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 transition-all hover:scale-105">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
          <Link href="/Pages/Login" className="flex items-center gap-3 px-5 py-4 rounded-2xl font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all hover:scale-105">
            <span>Log Out</span>
          </Link>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              className="fixed inset-y-0 left-0 w-80 glass-strong border-r border-slate-200/50 dark:border-slate-700/50 z-50 lg:hidden flex flex-col"
            >
              {/* Same content as desktop sidebar */}
              <div className="p-8 border-b border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl gradient-primary text-white flex items-center justify-center font-black text-xl shadow-xl">
                    JF
                  </div>
                  <span className="font-heading font-black text-2xl gradient-text">JobFinder</span>
                </Link>
                <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setSelectedTab(item.id); setSidebarOpen(false); }}
                    className={`w-full flex items-center justify-between gap-3 px-5 py-4 rounded-2xl font-semibold transition-all ${selectedTab === item.id
                      ? 'gradient-primary text-white shadow-xl'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${selectedTab === item.id ? 'bg-white/20 text-white' : 'bg-primary-100 text-primary-600'
                        }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 lg:pl-80 flex flex-col min-h-screen">

        {/* Top Navbar */}
        <header className="sticky top-0 z-20 glass-strong backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 px-6 md:px-10 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Menu className="w-6 h-6 text-slate-600 dark:text-slate-300" />
              </button>
              <div>
                <h1 className="text-2xl font-black text-slate-900 dark:text-white">Dashboard Overview</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Welcome back, manage your recruitment</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700">
                <Search className="w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent outline-none text-sm w-48 text-slate-900 dark:text-white placeholder-slate-400"
                />
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Bell className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-80 glass-strong rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden"
                    >
                      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                        <h3 className="font-bold text-slate-900 dark:text-white">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {activities.slice(0, 5).map((activity, i) => (
                          <div key={i} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-100 dark:border-slate-800 last:border-0">
                            <div className="flex items-start gap-3">
                              <div className="p-2 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                                <activity.icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-slate-700 dark:text-slate-300">
                                  <span className="font-semibold">{activity.user}</span> {activity.action} <span className="font-semibold">{activity.job}</span>
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{activity.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 border-t border-slate-200 dark:border-slate-700">
                        <button className="w-full text-center text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline">
                          View all notifications
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile */}
              <div className="flex items-center gap-3 pl-4 border-l-2 border-slate-200 dark:border-slate-700">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Acme Corporation</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Admin Account</p>
                </div>
                <div className="w-12 h-12 rounded-2xl gradient-accent flex items-center justify-center text-white font-black text-lg shadow-lg cursor-pointer hover:scale-110 transition-transform">
                  A
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 md:p-10 space-y-8 flex-1">

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card-premium p-6 card-hover group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-4 rounded-2xl ${stat.bgColor} group-hover:scale-110 transition-transform`}>
                    <stat.icon className={`w-6 h-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} style={{ WebkitTextFillColor: 'transparent' }} />
                  </div>
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${stat.trend === 'up'
                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                    }`}>
                    {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {stat.change}
                  </div>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-2">{stat.label}</p>
                <h3 className="text-4xl font-black text-slate-900 dark:text-white">{stat.value}</h3>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Active Jobs Table */}
            <div className="lg:col-span-2 card-premium p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">Active Job Listings</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Manage and track your job postings</p>
                </div>
                <Link href="/Pages/AddJob" className="btn-primary px-6 py-3 flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  <span className="hidden sm:inline">Post Job</span>
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs font-bold text-slate-500 dark:text-slate-400 border-b-2 border-slate-200 dark:border-slate-700 uppercase tracking-wide">
                      <th className="pb-4 pl-2 text-left">Job Title</th>
                      <th className="pb-4 text-left">Status</th>
                      <th className="pb-4 text-left">Applications</th>
                      <th className="pb-4 text-left">Views</th>
                      <th className="pb-4 text-right pr-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {companyJobs.map((job, i) => (
                      <motion.tr
                        key={job._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                      >
                        <td className="py-5 pl-2">
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                              {job.title}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Posted {new Date(job.createdAt).toLocaleDateString()}</p>
                          </div>
                        </td>
                        <td className="py-5">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${job.status === 'open'
                            ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                            : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                            }`}>
                            {job.status === 'open' ? '● Active' : '⏸ Closed'}
                          </span>
                        </td>
                        <td className="py-5">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-slate-400" />
                            <span className="font-bold text-slate-900 dark:text-white">
                              {companyApplications.filter(a => a.job?._id === job._id).length}
                            </span>
                          </div>
                        </td>
                        <td className="py-5">
                          <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4 text-slate-400" />
                            <span className="font-semibold text-slate-600 dark:text-slate-400">0</span>
                          </div>
                        </td>
                        <td className="py-5 pr-2">
                          <div className="flex items-center justify-end gap-2">
                            <Link href={`/Pages/Job/${job._id}`} className="p-2 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 text-primary-600 dark:text-primary-400 transition-colors">
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => deleteJob(job._id)}
                              className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                    {companyJobs.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-10 text-center text-slate-500 italic">No jobs posted yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Candidates / Applications */}
            <div className="card-premium p-6 overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white mb-1">New Applications</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Review recent candidate submissions</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-bold">
                  {companyApplications.filter(a => a.status === 'pending').length} New
                </span>
              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
                {companyApplications.map((app, i) => (
                  <motion.div
                    key={app._id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-4 rounded-2xl border-2 transition-all hover:shadow-lg ${app.status === 'pending'
                      ? 'bg-white dark:bg-slate-800 border-primary-200 dark:border-primary-800/50'
                      : 'bg-slate-50/50 dark:bg-slate-900/30 border-transparent'
                      }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-inner shrink-0">
                        {app.applicant?.name?.charAt(0) || 'U'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-bold text-slate-900 dark:text-white truncate">{app.applicant?.name}</p>
                          <span className="text-[10px] text-slate-400 font-bold uppercase">{new Date(app.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs text-primary-600 dark:text-primary-400 font-bold mb-3 truncate">{app.job?.title}</p>

                        <div className="flex items-center gap-2">
                          <a
                            href={app.resume}
                            target="_blank"
                            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-slate-100 dark:bg-slate-700 rounded-lg text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:bg-primary-600 hover:text-white transition-all shadow-sm"
                          >
                            <FileText size={14} /> Resume
                          </a>
                          <select
                            value={app.status}
                            onChange={(e) => updateApplicationStatus(app._id, e.target.value)}
                            className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-2 text-[10px] font-bold outline-none focus:border-primary-500"
                          >
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {companyApplications.length === 0 && (
                  <div className="text-center py-10">
                    <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 text-sm font-medium">No applications found.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Candidate Pipeline */}
          <div className="card-premium p-6 md:p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">Candidate Pipeline</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Track candidates through your hiring process</p>
              </div>
              <button className="btn-outline px-6 py-3 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {candidatePipeline.map((stage, idx) => (
                <motion.div
                  key={stage.stage}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`${stage.color} p-5 rounded-2xl min-h-[240px] border-2 border-slate-200 dark:border-slate-700`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-black text-sm text-slate-700 dark:text-slate-300 uppercase tracking-wide">{stage.stage}</h4>
                    <span className="px-3 py-1 rounded-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-bold shadow-sm">
                      {stage.count}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {stage.candidates.map((candidate, i) => (
                      <div
                        key={i}
                        className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 cursor-pointer hover:shadow-lg hover:scale-105 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg gradient-primary text-white flex items-center justify-center text-xs font-bold">
                            {candidate.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm text-slate-900 dark:text-white truncate">{candidate}</p>
                            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">9{i}% Match</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card-premium p-6 md:p-8">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {activities.map((activity, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                    <activity.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      <span className="font-bold text-slate-900 dark:text-white">{activity.user}</span> {activity.action}{' '}
                      <span className="font-bold text-slate-900 dark:text-white">{activity.job}</span>
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {activity.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
