'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiSearch, FiBell, FiMessageSquare, FiSun, FiMoon } from 'react-icons/fi';
import { HiMenu } from 'react-icons/hi';
import MobileDrawer from './Drawer';
import SearchBar from './SearchBar';
import { links } from '@/app/utils/Data';
import { useRouter } from 'next/navigation';
export default function Header() {
  const route = useRouter()
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dark, setDark] = useState<boolean>(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.pageYOffset;
      if (current <= 50) setShowHeader(true);
      else if (current > lastScroll && current > 120) setShowHeader(false);
      else setShowHeader(true);
      setLastScroll(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScroll]);

  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [dark]);

  return (
    <>
      <div className={`w-full transition-transform duration-300 z-50 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
        {/* Upper utility bar */}
        <div className="hidden lg:block bg-red-50 dark:bg-gray-800/70 backdrop-blur-sm border-b border-red-200/50 dark:border-gray-700/50">
          <div className="max-w-7xl mx-auto px-5 py-2 flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-center gap-6">
              <Link href="/Pages//Help" className="hover:text-red-600 font-medium transition">Help</Link>
              <Link href="/Pages/Contact" className="hover:text-red-600 font-medium transition">Contact</Link>
              <Link href="/Pages/Companies" className="hover:text-red-600 font-medium transition">Companies</Link>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/Pages/Saved" className="hover:text-red-600 font-medium transition">Saved Jobs</Link>
              <button
                aria-label="Toggle theme"
                onClick={() => setDark(d => !d)}
                className="p-2 rounded-md hover:bg-red-100 dark:hover:bg-white/10 transition"
                title="Toggle theme"
              >
                {dark ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-gray-700 dark:text-gray-200" />}
              </button>
              <Link href="/Pages/Login" className="hover:text-red-600 font-semibold transition">Get Started</Link>
            </div>
          </div>
        </div>
        {/* Header */}
        <header className="sticky top-0 z-40 text-gray-900 border-b border-white/50 bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
          <div className="max-w-7xl mx-auto px-5 py-2">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-6">
                <Link href="/" className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">JF</div>
                  <span className="hidden lg:flex font-semibold text-lg">JobFinder</span>
                </Link>

                <nav className="hidden md:flex items-center gap-4 text-sm">
                  <Link href="/" className="hover:underline">Home</Link>
                  <Link href="/Pages/Jobs" className="hover:underline">Jobs</Link>
                  <Link href="/Pages/Companies" className="hover:underline">Companies</Link>
                </nav>
              </div>

              <div className="flex items-center gap-3">


                <button aria-label="Notifications" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition relative">
                  <FiBell />
                  <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full px-1">3</span>
                </button>
                <button onClick={() => setDrawerOpen(true)} className="flex md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"><HiMenu/></button>
                <div className="hidden sm:block">
                  <Link href="/Pages/AddJob" className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold">Post a Job</Link>
                </div>

                <div className="ml-2">
                  <button onClick={()=> route.push('/Pages/Profile')} className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">A</button>
                </div>
              </div>
            </div>
          </div>
        </header>

      </div>

      {/* Mobile Drawer */}
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} links={links} />
    </>
  );
}

              