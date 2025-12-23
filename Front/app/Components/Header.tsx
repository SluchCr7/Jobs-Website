'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiBell, FiSun, FiMoon } from 'react-icons/fi';
import { HiMenu } from 'react-icons/hi';
import MobileDrawer from './Drawer';
import { links } from '@/app/utils/Data';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

export default function Header() {
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  // mounted state to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-slate-200/50 dark:border-slate-700/50'
          : 'bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800'
          }`}
      >
        {/* Upper utility bar */}
        <div className="hidden lg:block bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-xs py-1.5 transition-colors">
          <div className="container-custom flex items-center justify-between text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-4">
              <Link href="/Pages/Help" className="hover:text-primary-600 transition">Help Center</Link>
              <span>•</span>
              <Link href="/Pages/Contact" className="hover:text-primary-600 transition">Contact</Link>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 hover:text-primary-600 transition focus:outline-none"
                title="Toggle theme"
              >
                {mounted && resolvedTheme === 'dark' ? (
                  <>
                    <FiSun className="w-3.5 h-3.5 text-yellow-500" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <FiMoon className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <header className="py-3">
          <div className="container-custom">
            <div className="flex items-center justify-between">
              {/* Logo & Nav */}
              <div className="flex items-center gap-8">
                <Link href="/" className="flex items-center gap-2 group">
                  <div className="w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-primary-500/30 transition-transform group-hover:scale-105">
                    JF
                  </div>
                  <span className="hidden lg:block font-heading font-bold text-xl text-slate-900 dark:text-white tracking-tight">JobFinder</span>
                </Link>

                <nav className="hidden md:flex items-center gap-1">
                  {links.map((link) => {
                    const isActive = pathname === link.url;
                    return (
                      <Link
                        key={link.id}
                        href={link.url}
                        className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                            ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                            : 'text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                      >
                        {link.title}
                        {isActive && (
                          <span className="absolute inset-x-0 -bottom-3 mx-auto h-0.5 w-4 bg-primary-600 dark:bg-primary-400 rounded-full hidden md:block" />
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4">
                <button
                  aria-label="Notifications"
                  className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition relative"
                >
                  <FiBell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-900"></span>
                </button>

                <div className="hidden sm:flex items-center gap-3">
                  <Link href="/Pages/Login" className="text-slate-600 dark:text-slate-300 font-medium hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 transition">
                    Sign In
                  </Link>
                  <Link href="/Pages/AddJob" className="btn-primary text-sm px-5 py-2">
                    Post a Job
                  </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                >
                  <HiMenu className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-28 w-full"></div>

      {/* Mobile Drawer */}
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} links={links} />
    </>
  );
}
