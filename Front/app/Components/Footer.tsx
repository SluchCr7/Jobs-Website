'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { latestJobs, socialLinks } from '../utils/Data';

const InteractiveFooter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  }

  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

        {/* Logo & About */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center font-bold text-lg">JF</div>
            <span className="font-heading font-bold text-xl text-white tracking-tight">JobFinder</span>
          </Link>
          <p className="text-slate-400 leading-relaxed">
            Connecting talent with opportunity. The most trusted platform for finding your next career move and hiring top professionals.
          </p>
          <div className="flex gap-4">
            {socialLinks.map((link, idx) => (
              <a key={idx} href={link.url} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary-600 hover:text-white transition-all transform hover:-translate-y-1">
                <link.Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h4 className="text-white font-heading font-bold text-lg">Platform</h4>
          <ul className="space-y-3">
            {['About Us', 'Contact', 'Blog', 'Careers', 'Privacy Policy'].map((item) => (
              <li key={item}>
                <Link href="#" className="hover:text-primary-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Latest Jobs */}
        <div className="space-y-6">
          <h4 className="text-white font-heading font-bold text-lg">Trending Jobs</h4>
          <ul className="space-y-3">
            {latestJobs && latestJobs.slice(0, 5).map((job: any, index: number) => (
              <li key={index}>
                <Link href={job.url || '#'} className="hover:text-primary-400 transition-colors block truncate">
                  {job.title}
                </Link>
                <span className="text-xs text-slate-500">{job.location || 'Remote'}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-6">
          <h4 className="text-white font-heading font-bold text-lg">Stay Updated</h4>
          <p className="text-slate-400">Join our newsletter to get weekly job alerts and career advice.</p>
          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition"
            />
            <button
              onClick={handleSubscribe}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-lg shadow-primary-900/20"
            >
              Subscribe Now
            </button>
          </div>
          {subscribed && <p className="text-green-400 text-sm animate-fade-in">Thanks! check your inbox.</p>}
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="container-custom pt-8 border-t border-slate-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} JobFinder. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="#" className="hover:text-white transition">Terms</Link>
          <Link href="#" className="hover:text-white transition">Privacy</Link>
          <Link href="#" className="hover:text-white transition">Cookies</Link>
        </div>
      </div>
    </footer>
  )
}

export default InteractiveFooter;
