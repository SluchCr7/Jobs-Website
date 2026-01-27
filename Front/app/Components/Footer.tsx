'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, ArrowRight, Heart } from 'lucide-react';
import { toast } from 'sonner';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success('Thanks for subscribing to our newsletter!');
    setEmail('');
  };

  return (
    <footer className="relative bg-slate-900 pt-20 pb-10 overflow-hidden isolate">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-900/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-40 -left-20 w-72 h-72 bg-purple-900/20 rounded-full blur-3xl -z-10"></div>

      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="w-10 h-10 rounded-xl gradient-primary text-white flex items-center justify-center font-black text-xl shadow-lg">
                JF
              </div>
              <span className="font-heading font-black text-2xl text-white tracking-tight">
                JobFinder
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Connecting exceptional talent with world-class opportunities. Build your career with the most trusted recruitment platform.
            </p>
            <div className="flex items-center gap-4">
              {[
                { Icon: Facebook, url: "https://facebook.com/jobfinder" },
                { Icon: Twitter, url: "https://twitter.com/jobfinder" },
                { Icon: Instagram, url: "https://instagram.com/jobfinder" },
                { Icon: Linkedin, url: "https://linkedin.com/company/jobfinder" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary-600 hover:text-white transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-600/20"
                >
                  <social.Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Explore</h4>
            <ul className="space-y-3">
              {[
                { name: 'Find Jobs', url: '/Pages/Jobs' },
                { name: 'Companies', url: '/Pages/Companies' },
                { name: 'Pricing', url: '/Pages/Pricing' },
                { name: 'Our Blog', url: '/Pages/Blog' },
                { name: 'Help Center', url: '/Pages/Help' }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.url} className="text-slate-400 hover:text-primary-400 transition-colors text-sm font-medium flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-primary-400 transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">For Employers</h4>
            <ul className="space-y-3">
              {[
                { name: 'Post a Job', url: '/Pages/AddJob' },
                { name: 'Candidate Search', url: '/Pages/JobsRequests' },
                { name: 'Employer Dashboard', url: '/Dashboard' },
                { name: 'Write Article', url: '/Pages/WriteArticle' },
                { name: 'Create Company', url: '/Pages/CreateCompany' }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.url} className="text-slate-400 hover:text-primary-400 transition-colors text-sm font-medium flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-primary-400 transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-slate-400 text-sm mb-4">
              Subscribe to our newsletter to get the latest job alerts and career tips.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all text-sm placeholder-slate-500"
                  required
                />
              </div>
              <button className="w-full btn-primary py-3 rounded-xl text-sm font-bold shadow-lg shadow-primary-900/20">
                Subscribe Now
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} JobFinder Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/Pages/Help" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/Pages/Help" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/Pages/Help" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart size={12} className="text-red-500 fill-red-500" />
            <span>by SluchCr7</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
