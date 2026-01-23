'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';

// dummy suggestions
const SUGGESTIONS = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack',
  'Product Designer',
  'Data Scientist',
  'Marketing Manager',
];

export default function SearchBar() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [open, setOpen] = useState(false);
  const [filtered, setFiltered] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const id = setTimeout(() => {
      if (title.trim().length > 0) {
        setFiltered(SUGGESTIONS.filter(s => s.toLowerCase().includes(title.toLowerCase())).slice(0, 5));
        setOpen(true);
      } else {
        setOpen(false);
      }
    }, 180);
    return () => clearTimeout(id);
  }, [title]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!(e.target instanceof Node)) return;
      if (!containerRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const onSearch = () => {
    console.log('Search', { title, location });
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="w-full max-w-2xl relative">
      <div className="flex items-center gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-primary-500/20 transition-all">
        <div className="flex-1 flex gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Job title, keywords..."
            className="w-1/2 text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none px-2"
            aria-label="Job title"
          />
          <div className="w-[1px] bg-slate-200 dark:bg-slate-700 my-1"></div>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City or country"
            className="w-1/2 text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none px-2"
            aria-label="Location"
          />
        </div>

        <button
          onClick={onSearch}
          className="p-2 btn-primary rounded-lg flex items-center justify-center transition-transform active:scale-95"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>

      {/* Suggestions dropdown */}
      {open && filtered.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg z-30 overflow-hidden">
          <ul className="divide-y divide-slate-100 dark:divide-slate-700">
            {filtered.map((s) => (
              <li
                key={s}
                onClick={() => { setTitle(s); setOpen(false); }}
                className="px-4 py-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition text-sm text-slate-700 dark:text-slate-200"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
