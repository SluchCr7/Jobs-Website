'use client'
import Link from "next/link";
import { HiX } from "react-icons/hi";

export default function Drawer({ open, onClose, links } : { open: boolean; onClose: () => void; links: any[] }) {
  return (
    <div
      className={`fixed inset-0 z-50 transition ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer Panel */}
      <div
        className={`absolute top-0 left-0 h-full w-72 bg-gray-900 border-r border-gray-700 p-5 
          transform transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-red-400">JOBFINDER</h2>
          <button className="text-red-300 text-2xl" onClick={onClose}>
            <HiX />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-4">
          {links.map((item) => (
            <Link
              key={item.id}
              href={item.url}
              className="text-gray-200 text-lg hover:text-red-400 transition"
              onClick={onClose}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-3">
          <button className="px-4 py-2 rounded-full font-semibold border border-red-500 text-red-400 
              hover:bg-red-600 hover:text-white transition-all">
            Login
          </button>
          <button className="px-4 py-2 rounded-full font-semibold bg-red-600 text-white 
              hover:bg-red-700 transition-all shadow-md">
            Post a Job
          </button>
        </div>
      </div>
    </div>
  );
}
