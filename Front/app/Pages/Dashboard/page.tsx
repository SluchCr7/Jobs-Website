'use client'

import React from 'react'
import Link from 'next/link'
import { Bell, Briefcase, Users, BarChart3, Settings, CreditCard, MessageSquare, Shield, Star } from 'lucide-react'

export default function CompanyDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-xl p-6 space-y-6">
        <h2 className="text-2xl font-extrabold">Company Dashboard</h2>
        <nav className="space-y-4 text-gray-700">
          <Link href="#" className="flex items-center gap-3 font-semibold"><BarChart3 /> Overview</Link>
          <Link href="#" className="flex items-center gap-3"><Briefcase /> Jobs</Link>
          <Link href="#" className="flex items-center gap-3"><Users /> Candidates</Link>
          <Link href="#" className="flex items-center gap-3"><MessageSquare /> Messages</Link>
          <Link href="#" className="flex items-center gap-3"><Star /> Reviews</Link>
          <Link href="#" className="flex items-center gap-3"><CreditCard /> Billing</Link>
          <Link href="#" className="flex items-center gap-3"><Shield /> Security</Link>
          <Link href="#" className="flex items-center gap-3"><Settings /> Settings</Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10 space-y-10">

        {/* Top Bar */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Dashboard Overview</h1>
          <div className="flex items-center gap-6">
            <Bell />
            <div className="w-10 h-10 rounded-full bg-gray-300" />
          </div>
        </div>

        {/* KPIs */}
        <section className="grid md:grid-cols-4 gap-6">
          {[
            { label: 'Active Jobs', value: 24 },
            { label: 'Applications', value: 1320 },
            { label: 'Hired', value: 86 },
            { label: 'Conversion Rate', value: '6.5%' }
          ].map((k, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl shadow">
              <p className="text-gray-500">{k.label}</p>
              <h3 className="text-3xl font-extrabold mt-2">{k.value}</h3>
            </div>
          ))}
        </section>

        {/* Jobs Management */}
        <section className="bg-white p-8 rounded-3xl shadow space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Job Management</h2>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl">Post New Job</button>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500">
                <th>Title</th>
                <th>Status</th>
                <th>Applications</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[1,2,3].map(i => (
                <tr key={i} className="border-t">
                  <td className="py-4 font-semibold">Senior Frontend Developer</td>
                  <td>Active</td>
                  <td>142</td>
                  <td className="space-x-3">
                    <button>Edit</button>
                    <button>Pause</button>
                    <button>Close</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Candidates Pipeline */}
        <section className="bg-white p-8 rounded-3xl shadow">
          <h2 className="text-2xl font-bold mb-6">Candidate Pipeline</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {['New', 'Shortlisted', 'Interview', 'Offer', 'Hired'].map(stage => (
              <div key={stage} className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-semibold mb-3">{stage}</h4>
                {[1,2].map(c => (
                  <div key={c} className="bg-white p-3 rounded-lg shadow mb-3">
                    <p className="font-medium">Candidate {c}</p>
                    <p className="text-sm text-gray-500">85% Match</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Messaging */}
        <section className="bg-white p-8 rounded-3xl shadow">
          <h2 className="text-2xl font-bold mb-4">Messages</h2>
          <div className="space-y-4">
            {[1,2].map(m => (
              <div key={m} className="flex justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-semibold">Candidate Message</p>
                  <p className="text-sm text-gray-500">Regarding interview schedule</p>
                </div>
                <button className="text-blue-600">Reply</button>
              </div>
            ))}
          </div>
        </section>

        {/* Billing */}
        <section className="bg-white p-8 rounded-3xl shadow">
          <h2 className="text-2xl font-bold mb-4">Billing & Subscription</h2>
          <p>Current Plan: <strong>Pro Employer</strong></p>
          <p>Jobs Remaining: 12</p>
          <button className="mt-4 px-6 py-3 border rounded-xl">Upgrade Plan</button>
        </section>

        {/* Security */}
        <section className="bg-white p-8 rounded-3xl shadow">
          <h2 className="text-2xl font-bold mb-4">Security</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Two-Factor Authentication</li>
            <li>Login History</li>
            <li>Role-based Access</li>
          </ul>
        </section>
      </main>
    </div>
  )
}
