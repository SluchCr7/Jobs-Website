'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

// dummy suggestions (you can replace with real API)
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

  // simple debounce
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

  // close on outside click
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
    // placeholder action (navigate or call API)
    console.log('Search', { title, location });
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="w-full max-w-2xl relative">
      <div className="flex items-center gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 shadow-sm">
        <div className="flex-1 flex gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Job title, keywords..."
            className="w-[50%] text-sm bg-transparent text-white focus:outline-none px-2"
            aria-label="Job title"
          />
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City or country"
            className="w-[50%] text-sm bg-transparent text-white focus:outline-none border-l border-gray-100 pl-3"
            aria-label="Location"
          />
        </div>

        <button
          onClick={onSearch}
          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2"
          aria-label="Search"
        >
          <FiSearch />
        </button>
      </div>

      {/* Suggestions dropdown */}
      {open && filtered.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-30 overflow-hidden">
          <ul className="divide-y divide-gray-100 dark:divide-gray-700">
            {filtered.map((s) => (
              <li
                key={s}
                onClick={() => { setTitle(s); setOpen(false); }}
                className="px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition text-sm"
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
