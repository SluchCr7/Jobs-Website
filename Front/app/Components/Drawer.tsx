'use client'
import Link from "next/link";
import { HiX } from "react-icons/hi";
import { FiLogIn, FiPlusCircle } from "react-icons/fi";
import { usePathname } from "next/navigation";

export default function Drawer({ open, onClose, links }: { open: boolean; onClose: () => void; links: any[] }) {
  const pathname = usePathname();

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${open ? "pointer-events-auto visible" : "pointer-events-none invisible"
        }`}
    >
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"
          }`}
      />

      {/* Drawer Panel */}
      <div
        className={`absolute top-0 left-0 h-full w-80 bg-white dark:bg-slate-900 shadow-2xl p-6 
          transform transition-transform duration-300 ease-out ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center font-bold">JF</div>
            <span className="font-heading font-bold text-xl text-slate-900 dark:text-white">JobFinder</span>
          </div>
          <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition" onClick={onClose}>
            <HiX size={24} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-2">
          {links.map((item) => {
            const isActive = pathname === item.url;
            return (
              <Link
                key={item.id}
                href={item.url}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${isActive
                    ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary-600 dark:hover:text-primary-400"
                  }`}
                onClick={onClose}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Buttons */}
        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-4">
          <Link href="/Pages/Login" onClick={onClose} className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
            <FiLogIn /> Login
          </Link>
          <Link href="/Pages/AddJob" onClick={onClose} className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl font-semibold bg-primary-600 text-white hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/20">
            <FiPlusCircle /> Post a Job
          </Link>
        </div>
      </div>
    </div>
  );
}
