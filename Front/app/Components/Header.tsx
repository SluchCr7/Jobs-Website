'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Menu, X, Bell, User, Sun, Moon, LogOut, ChevronDown, LayoutDashboard, HelpCircle, Mail, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../Context/AuthContext';
import { links } from '@/app/utils/Data';

export default function Header() {
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { user, logout } = useAuth();

  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  // Handle hydration mismatch
  useEffect(() => setMounted(true), []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

  if (!mounted) return null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-white/20 dark:border-slate-700/50 shadow-lg'
            : 'bg-transparent py-4'
          }`}
      >
        <div className="container-custom">
          {/* Top Bar for Desktop - Optional Utility Links */}
          {!scrolled && (
            <div className="hidden lg:flex justify-end items-center gap-6 py-2 text-xs font-medium text-slate-500 dark:text-slate-400 border-b border-slate-200/20 dark:border-slate-700/20 mb-2">
              <Link href="/Pages/Help" className="hover:text-primary-500 transition-colors flex items-center gap-1">
                <HelpCircle size={12} /> Help Center
              </Link>
              <Link href="/Pages/Contact" className="hover:text-primary-500 transition-colors flex items-center gap-1">
                <Mail size={12} /> Contact Support
              </Link>
            </div>
          )}

          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl gradient-primary text-white flex items-center justify-center font-black text-xl shadow-lg shadow-primary-500/30 group-hover:scale-105 transition-transform">
                JF
              </div>
              <span className={`font-heading font-black text-xl tracking-tight ${scrolled ? 'text-slate-900 dark:text-white' : 'text-slate-900 dark:text-white'}`}>
                JobFinder
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-md border border-white/20 dark:border-slate-700/30">
              {links.map((link) => {
                const isActive = pathname === link.url;
                return (
                  <Link
                    key={link.id}
                    href={link.url}
                    className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${isActive
                        ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-white/50 dark:hover:bg-slate-700/50'
                      }`}
                  >
                    {link.title}
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3 md:gap-5">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all hover:rotate-12"
                aria-label="Toggle Theme"
              >
                {resolvedTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {user ? (
                <>
                  {/* Notifications */}
                  <div className="relative hidden md:block">
                    <button className="p-2.5 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative group">
                      <Bell size={20} />
                      <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-900 animate-pulse"></span>
                    </button>
                  </div>

                  {/* Profile Dropdown Trigger */}
                  <div className="relative">
                    <button
                      onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                      className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-500 transition-all"
                    >
                      <div className="w-8 h-8 rounded-full gradient-accent flex items-center justify-center text-white font-bold text-xs">
                        {user.avatar?.url ? (
                          <img src={user.avatar.url} alt={user.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          user.name?.[0] || 'U'
                        )}
                      </div>
                      <ChevronDown size={14} className={`text-slate-400 transition-transform ${profileMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Profile Dropdown */}
                    <AnimatePresence>
                      {profileMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 top-full mt-2 w-64 glass-strong rounded-2xl shadow-2xl overflow-hidden origin-top-right border border-slate-200/50 dark:border-slate-700/50 p-2"
                        >
                          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700/50 mb-2">
                            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                          </div>

                          <div className="space-y-1">
                            <Link href="/Pages/Profile" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                              <User size={16} /> Profile
                            </Link>
                            {user.role === 'admin' && (
                              <Link href="/Dashboard" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                <LayoutDashboard size={16} /> Dashboard
                              </Link>
                            )}
                            {user.role === 'employer' && (
                              <Link href="/Pages/AddJob" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                <LayoutDashboard size={16} /> Post Job
                              </Link>
                            )}
                            <Link href="/Pages/Saved" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                              <Heart size={16} /> Saved Jobs
                            </Link>
                            <button
                              onClick={logout}
                              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                            >
                              <LogOut size={16} /> Logout
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Link href="/Pages/Login" className="hidden md:block text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    Log In
                  </Link>
                  <Link href="/Pages/Register" className="btn-primary text-sm px-6 py-2.5 shadow-lg shadow-primary-500/20">
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden p-2 text-slate-600 dark:text-slate-300"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content jump */}
      <div className={`h-[88px] ${scrolled ? 'block' : 'hidden lg:block'}`}></div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />

            {/* Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute right-0 top-0 bottom-0 w-[80%] max-w-sm bg-white dark:bg-slate-900 shadow-2xl p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-heading font-black text-2xl text-slate-900 dark:text-white">Menu</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-2 flex-1 overflow-y-auto">
                {links.map((link) => (
                  <Link
                    key={link.id}
                    href={link.url}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-5 py-4 rounded-xl text-lg font-semibold transition-colors ${pathname === link.url
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                {!user && (
                  <Link
                    href="/Pages/Login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-primary w-full flex justify-center py-4 text-base"
                  >
                    Sign In / Register
                  </Link>
                )}
                <div className="mt-6 text-center text-xs text-slate-400">
                  © 2026 JobFinder Inc.
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
