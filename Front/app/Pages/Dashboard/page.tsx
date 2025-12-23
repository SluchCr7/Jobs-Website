'use client'

import React from 'react'
import Link from 'next/link'
import { Bell, Briefcase, Users, BarChart3, Settings, CreditCard, MessageSquare, Shield, Star, Menu } from 'lucide-react'

export default function CompanyDashboard() {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 font-sans transition-colors">

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-72 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex-col fixed inset-y-0 z-20">
        <div className="p-8 border-b border-slate-100 dark:border-slate-700">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center font-bold">JF</div>
            <span className="font-heading font-bold text-xl text-slate-900 dark:text-white">Workspace</span>
          </Link>
        </div>
        <nav className="flex-1 p-6 space-y-1 overflow-y-auto">
          {[
            { icon: BarChart3, label: 'Overview', active: true },
            { icon: Briefcase, label: 'Jobs' },
            { icon: Users, label: 'Candidates' },
            { icon: MessageSquare, label: 'Messages' },
            { icon: Star, label: 'Reviews' },
            { icon: CreditCard, label: 'Billing' },
          ].map((item, i) => (
            <Link key={i} href="#" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${item.active ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
              <item.icon className="w-5 h-5" /> {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-6 border-t border-slate-100 dark:border-slate-700 space-y-1">
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <Shield className="w-5 h-5" /> Security
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <Settings className="w-5 h-5" /> Settings
          </Link>
          <Link href="/Pages/Login" className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors mt-2">
            Log Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:pl-72 flex flex-col min-h-screen">

        {/* Top Navbar */}
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
              <Menu className="w-6 h-6 text-slate-600 dark:text-slate-300" />
            </button>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white hidden sm:block">Dashboard Overview</h1>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition text-slate-500">
              <Bell className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-800"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-slate-200 dark:border-slate-700">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Acme Corp</p>
                <p className="text-xs text-slate-500">Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-slate-500 font-bold">A</div>
            </div>
          </div>
        </header>

        <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto w-full">

          {/* KPIs */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Active Jobs', value: 24, change: '+2', trend: 'up' },
              { label: 'Total Applications', value: 1320, change: '+12%', trend: 'up' },
              { label: 'Hired Candidates', value: 86, change: '+4', trend: 'up' },
              { label: 'Conversion Rate', value: '6.5%', change: '-0.2%', trend: 'down' }
            ].map((k, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <p className="text-slate-500 text-sm font-medium">{k.label}</p>
                <div className="flex items-end justify-between mt-2">
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{k.value}</h3>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${k.trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {k.change}
                  </span>
                </div>
              </div>
            ))}
          </section>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Job Management */}
            <section className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Active Listings</h2>
                <button className="btn-primary text-sm px-4 py-2">Post Job</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-xs font-semibold text-slate-400 border-b border-slate-100 dark:border-slate-700">
                      <th className="pb-3 pl-2">Title</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">Applications</th>
                      <th className="pb-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {[1, 2, 3].map(i => (
                      <tr key={i} className="border-b last:border-0 border-slate-50 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
                        <td className="py-4 pl-2 font-medium text-slate-900 dark:text-slate-200">Senior Frontend Developer</td>
                        <td className="py-4"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span></td>
                        <td className="py-4 text-slate-500">142</td>
                        <td className="py-4">
                          <button className="text-primary-600 hover:text-primary-700 font-medium">Manage</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Quick Messages */}
            <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Recent Messages</h2>
              <div className="space-y-4">
                {[1, 2, 3].map(m => (
                  <div key={m} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-slate-900 dark:text-white text-sm">Sarah Johnson</span>
                      <span className="text-xs text-slate-400">2h ago</span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2">Hi, I wanted to follow up on my application for the Senior Designer role...</p>
                  </div>
                ))}
                <button className="w-full py-2 text-sm text-center text-primary-600 font-medium hover:underline">View All Messages</button>
              </div>
            </section>
          </div>

          {/* Candidate Pipeline */}
          <section className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Candidate Pipeline</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {['New', 'Shortlisted', 'Interview', 'Offer', 'Hired'].map((stage, idx) => (
                <div key={stage} className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl min-h-[200px]">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-sm text-slate-700 dark:text-slate-300">{stage}</h4>
                    <span className="text-xs bg-white dark:bg-slate-700 px-2 py-1 rounded-md text-slate-500 shadow-sm">2</span>
                  </div>
                  {[1, 2].map(c => (
                    <div key={c} className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 mb-2 cursor-pointer hover:shadow-md transition">
                      <p className="font-medium text-sm text-slate-900 dark:text-white">Candidate {c}</p>
                      <p className="text-xs text-green-600 mt-1">9{c}% Match</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}
