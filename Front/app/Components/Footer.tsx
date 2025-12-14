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
      setTimeout(() => setSubscribed(false), 3000); // reset message after 3 sec
    }
  }

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo & About */}
        <div className="space-y-4">
          <h3 className="text-white text-2xl font-bold">JobBoard</h3>
          <p className="text-gray-400">Find your dream job and connect with top companies worldwide. Join our community today!</p>
          <div className="flex gap-4 mt-2">
            {socialLinks.map(link => (
              <a key={link.id} href={link.url} className="hover:text-white transition transform hover:scale-110"><link.Icon/></a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-lg">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-white transition hover:translate-x-1 duration-300">About Us</Link></li>
            <li><Link href="#" className="hover:text-white transition hover:translate-x-1 duration-300">Contact</Link></li>
            <li><Link href="#" className="hover:text-white transition hover:translate-x-1 duration-300">Blog</Link></li>
            <li><Link href="#" className="hover:text-white transition hover:translate-x-1 duration-300">Careers</Link></li>
            <li><Link href="#" className="hover:text-white transition hover:translate-x-1 duration-300">FAQs</Link></li>
          </ul>
        </div>

        {/* Latest Jobs */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-lg">Latest Jobs</h4>
          <ul className="space-y-2">
            {latestJobs.map(job => (
              <li key={job.id}>
                <Link href={job.url} className="hover:text-white transition hover:translate-x-1 duration-300">{job.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter / Subscribe */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-lg">Subscribe to Newsletter</h4>
          <p className="text-gray-400">Get the latest job updates and news directly in your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input 
              type="email" 
              placeholder="Your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-l-full flex-1 text-black focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
            <button 
              onClick={handleSubscribe}
              className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-r-full font-semibold text-white transition transform hover:scale-105"
            >
              Subscribe
            </button>
          </div>
          {subscribed && <p className="text-green-400 mt-2 animate-pulse">Subscribed successfully!</p>}
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 mt-12 py-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} JobBoard. All Rights Reserved.
      </div>
    </footer>
  )
}

export default InteractiveFooter;
