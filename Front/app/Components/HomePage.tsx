'use client';

import React, { JSX, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineSearch, HiOutlineLocationMarker, HiOutlineSparkles } from "react-icons/hi";
import { FiBell, FiMoon, FiSun, FiMail, FiPhone, FiLink } from "react-icons/fi";
import { companies, jobs , articles , categories ,  testimonials , stats} from "../utils/Data"; // افترض أنك تملك هذه الملفات كما في المشروع
import { JobsData } from "../utils/Types";
// Note: adjust imports if مسار مختلف


/* ---------------------- Helper Components ---------------------- */
const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="max-w-7xl mx-auto px-5">{children}</div>
);

const Pill: React.FC<{ children: React.ReactNode, className?:string }> = ({ children, className='' }) =>
  <span className={`px-3 py-1 rounded-full text-sm font-medium ${className}`}>{children}</span>;

/* ---------------------- Main Component ---------------------- */
export default function EnhancedHomePage(): JSX.Element {
  // SEARCH + FILTER STATE
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [jobType, setJobType] = useState<"any" | "fulltime" | "parttime" | "contract">("any");
  const [dark, setDark] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  // simulate data loading (for skeletons)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700); // realistic quick load
    return () => clearTimeout(t);
  }, []);

  // theme persist
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('jobfinder_theme') : null;
    if (saved) setDark(saved === 'dark');
  }, []);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jobfinder_theme', dark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', dark);
    }
  }, [dark]);

  // derived filtered jobs (simple client-side)
  const filteredJobs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter(j => {
      if (remoteOnly && !j.remote) return false;
      if (selectedCategory && j.categoryId !== selectedCategory) return false;
      if (jobType !== "any" && j.employmentType?.toLowerCase() !== jobType) return false;
      if (location && !j.location.toLowerCase().includes(location.toLowerCase())) return false;
      if (!q) return true;
      return (
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.skills.join(" ").toLowerCase().includes(q)
      );
    });
  }, [jobs, query, location, selectedCategory, remoteOnly, jobType]);

  // autocomplete suggestions (simple in-memory)
  const suggestions = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    const titles = Array.from(new Set(jobs.map(j => j.title)))
      .filter(t => t.toLowerCase().includes(q))
      .slice(0,5);
    const skills = Array.from(new Set(jobs.flatMap(j => j.skills)))
      .filter(s => s.toLowerCase().includes(q))
      .slice(0,5);
    return [...titles, ...skills].slice(0,6);
  }, [query]);

  // subscribe handler (mock)
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  // structured data for SEO (simple JobPosting aggregate)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": jobs.slice(0,6).map((j: JobsData, i: number) => ({
      "@type": "ListItem",
      "position": i+1,
      "item": {
        "@type": "JobPosting",
        "title": j.title,
        "hiringOrganization": { "@type": "Organization", "name": j.company },
        "jobLocation": { "@type": "Place", "address": j.location },
        "employmentType": j.employmentType || "Full-time",
        "datePosted": j.postedDate || new Date().toISOString()
      }
    }))
  };

  /* ---------------------- UI ---------------------- */
  return (
    <div className="min-h-screen font-sans text-gray-900 bg-gray-50 dark:bg-gray-900 dark:text-gray-100 transition-colors">
      {/* JSON-LD for SEO */}
      <script key="ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="pt-8 pb-12">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.6 }}>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Find your next <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">career move</span> — faster.
              </h1>
              <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-xl">Discover thousands of remote and onsite roles from trusted companies. Personalized matches and one-click applications.</p>

              {/* Search area */}
              <div className="mt-6 p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-md">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex items-center gap-3 flex-1 bg-gray-50 dark:bg-gray-900/40 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
                    <HiOutlineSearch className="text-gray-500 dark:text-gray-300 text-xl" aria-hidden />
                    <div className="relative flex-1">
                      <input
                        aria-label="Job title, keyword, or company"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className="w-full bg-transparent focus:outline-none text-sm dark:placeholder-gray-400"
                        placeholder="Job title, keyword, or company"
                      />
                      {/* autocomplete dropdown */}
                      <AnimatePresence>
                        {suggestions.length > 0 && query.trim().length > 0 && (
                          <motion.ul
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            className="absolute left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20 text-sm"
                          >
                            {suggestions.map((s, i) => (
                              <li key={i} onClick={() => setQuery(s)} className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">{s}</li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-900/40 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
                    <HiOutlineLocationMarker className="text-gray-500 dark:text-gray-300 text-xl" />
                    <input aria-label="Location" placeholder="Location (e.g. Cairo)" value={location} onChange={e => setLocation(e.target.value)} className="bg-transparent focus:outline-none text-sm dark:placeholder-gray-400" />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { /* trigger search logic or route */ }}
                      className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow hover:shadow-lg transition"
                    >Search</button>

                    <button aria-expanded={showAdvanced} onClick={() => setShowAdvanced(s => !s)} className="px-3 py-2 rounded-lg border hidden md:inline-block">
                      Advanced
                    </button>
                  </div>
                </div>

                {/* Advanced panel */}
                <AnimatePresence>
                {showAdvanced && (
                  <motion.div initial={{ opacity:0, height: 0 }} animate={{ opacity:1, height: "auto" }} exit={{ opacity:0, height:0 }} className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div className="flex items-center gap-2">
                        <input id="remote" type="checkbox" className="w-4 h-4" checked={remoteOnly} onChange={(e)=> setRemoteOnly(e.target.checked)} />
                        <label htmlFor="remote" className="text-sm">Remote only</label>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500 mb-1">Category</label>
                        <select className="w-full rounded-md border px-3 py-2 bg-white dark:bg-gray-800" value={selectedCategory ?? ""} onChange={(e)=> setSelectedCategory(e.target.value ? Number(e.target.value): null)}>
                          <option value="">Any</option>
                          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500 mb-1">Type</label>
                        <select className="w-full rounded-md border px-3 py-2 bg-white dark:bg-gray-800" value={jobType} onChange={(e) => setJobType(e.target.value as any)}>
                          <option value="any">Any</option>
                          <option value="fulltime">Full-time</option>
                          <option value="parttime">Part-time</option>
                          <option value="contract">Contract</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500 mb-1">Sort</label>
                        <select className="w-full rounded-md border px-3 py-2 bg-white dark:bg-gray-800">
                          <option>Relevance</option>
                          <option>Newest</option>
                          <option>Salary</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}
                </AnimatePresence>
              </div>

              {/* stats */}
              <div className="mt-4 flex gap-6 flex-wrap">
                {stats.map(s => (
                  <div key={s.id} className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/20"><s.icon className="text-blue-600" /></div>
                    <div>
                      <p className="font-semibold">{s.value}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* right visual */}
            <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.6 }} className="relative flex items-center justify-center">
              <div className="w-full h-80 rounded-2xl relative overflow-hidden bg-gradient-to-tr from-blue-50 to-purple-50 dark:from-transparent dark:to-transparent">
                <Image src="/hero.svg" alt="Hero illustration" fill style={{ objectFit: 'contain' }} priority />
              </div>

              <div className="absolute top-6 right-6 bg-white dark:bg-gray-800 border rounded-xl px-3 py-2 shadow">
                <span className="text-sm font-semibold">⭐ 14k+ Active Jobs</span>
              </div>
            </motion.div>
          </div>

          {/* Trending tags */}
          <div className="mt-8 flex flex-wrap gap-3">
            {["Remote React Jobs", "Frontend", "Product Manager", "Design", "Data Science"].map((t, i) => (
              <button key={i} onClick={() => setQuery(t)} className="px-3 py-1 rounded-full border bg-white dark:bg-gray-800 text-sm hover:shadow">
                {t}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured / Filters */}
      <section className="mt-8">
        <Container>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Jobs</h2>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-gray-500">Showing</span>
              <Pill className="bg-gray-100 dark:bg-gray-800">{filteredJobs.length} results</Pill>
              <Link href="/jobs" className="text-blue-600 hover:underline">See all</Link>
            </div>
          </div>

          {/* filters row */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button onClick={() => { setSelectedCategory(null); setJobType('any'); setRemoteOnly(false); setQuery(''); }} className="px-3 py-1 rounded-full border text-sm">Reset</button>
            <div className="flex items-center gap-2 text-sm">
              <label className="text-sm">Remote</label>
              <input type="checkbox" checked={remoteOnly} onChange={e=>setRemoteOnly(e.target.checked)} />
            </div>
            <div className="flex gap-2 overflow-auto">
              {categories.map(c => (
                <button key={c.id} onClick={() => setSelectedCategory(c.id)} className={`px-3 py-1 rounded-full text-sm ${selectedCategory === c.id ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 border'}`}>
                  {c.icon} {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* job grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array(6).fill(0).map((_,i)=>(
                <div key={i} className="p-6 rounded-2xl bg-white dark:bg-gray-800 border animate-pulse h-40" />
              ))
            ) : filteredJobs.length === 0 ? (
              <div className="col-span-full p-8 bg-white dark:bg-gray-800 rounded-2xl text-center">No jobs found — try adjusting filters.</div>
            ) : filteredJobs.slice(0,9).map(job => (
              <motion.article key={job.id} whileHover={{ y:-6 }} className="p-6 rounded-2xl bg-white dark:bg-gray-800 border shadow-sm hover:shadow-lg transition flex flex-col justify-between" aria-labelledby={`job-${job.id}`}>
                <div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center border">
                      {/* company initial as fallback */}
                      <span className="font-bold">{job.company?.[0]}</span>
                    </div>
                    <div>
                      <h3 id={`job-${job.id}`} className="text-lg font-semibold">{job.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{job.company} • {job.location}</p>
                    </div>
                    <div className="ml-auto text-sm">
                      {/* badges */}
                      {job.urgent && <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">Urgent</span>}
                      {job.hot && <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full ml-2">Hot</span>}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {job.skills.slice(0,3).map(s => <span key={s} className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600">{s}</span>)}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm font-medium">{job.salary}</div>
                  <div className="flex gap-2">
                    <Link href={`/jobs/${job.id}`} className="px-3 py-1 rounded-lg border text-sm">Details</Link>
                    <button className="px-3 py-1 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm">Apply</button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>

      {/* Top Companies carousel */}
      <section className="mt-16">
        <Container>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Top Hiring Companies</h2>
            <Link href="/companies" className="text-sm text-blue-600">Explore companies →</Link>
          </div>

          <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 items-center">
            {companies.map((c,i) => (
              <motion.div key={c.id} initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} transition={{ delay: i*0.06 }} className="group flex flex-col items-center">
                <div className="w-30 h-30 rounded-2xl p-3 bg-white dark:bg-gray-800 border flex items-center justify-center hover:shadow-lg transition">
                  <Image src={c.logoUrl} alt={c.name} width={120} height={48} className="object-contain w-full h-full" />
                </div>
                <p className="text-sm mt-2 text-center">{c.name}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="mt-16">
        <Container>
          <h2 className="text-2xl font-bold mb-6">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card title="Search & Discover" desc="Use personalized filters and AI suggestions to find relevant roles quickly." />
            <Card title="One-click Apply" desc="Apply using your profile and uploaded resume — no repeated forms." />
            <Card title="Track & Interview" desc="Manage applications and schedule interviews inside the platform." />
          </div>
        </Container>
      </section>

      {/* Testimonials + Articles */}
      <section className="mt-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Success Stories</h2>
              <div className="space-y-4">
                {testimonials.map(t => (
                  <motion.blockquote key={t.id} className="p-6 bg-white dark:bg-gray-800 border rounded-2xl shadow-sm" whileHover={{ scale: 1.01 }}>
                    <p className="text-gray-700 dark:text-gray-200">“{t.quote}”</p>
                    <footer className="mt-3 text-sm font-semibold">{t.name} <span className="text-gray-500 dark:text-gray-400">• {t.role}</span></footer>
                  </motion.blockquote>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Career Advice</h2>
              <div className="space-y-4">
                {articles.map(a => (
                  <article key={a.id} className="p-6 bg-white dark:bg-gray-800 border rounded-2xl shadow-sm">
                    <h3 className="font-semibold">{a.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{a.excerpt}</p>
                    <a href="#" className="text-sm text-blue-600 mt-3 inline-block">Read article →</a>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Newsletter CTA */}
      <section className="mt-16 mb-20">
        <Container>
          <div className="rounded-2xl p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold">Get top jobs weekly</h3>
              <p className="mt-1 text-sm">Subscribe to our newsletter for curated job matches.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-3 w-full md:w-auto">
              <input aria-label="Email for newsletter" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" className="rounded-lg px-4 py-2 text-gray-900 w-full md:w-72" />
              <button type="submit" className="px-4 py-2 rounded-lg bg-white text-blue-600 font-semibold">Subscribe</button>
            </form>
            {subscribed && <div className="text-sm bg-white/20 px-3 py-1 rounded">Thanks — check your inbox.</div>}
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <Container>
          <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold">JobFinder</h4>
              <p className="text-sm text-gray-500 mt-2">Find jobs, hire talent, and build your career.</p>
            </div>
            <div className="text-sm text-gray-500">
              <p>© {new Date().getFullYear()} JobFinder</p>
              <p className="mt-2">Privacy · Terms · Contact</p>
            </div>
            <div>
              <h4 className="font-semibold">Contact</h4>
              <p className="text-sm text-gray-500 mt-2"><FiMail className="inline-block mr-2" /> support@jobfinder.example</p>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}

/* ---------------------- Small Components used above ---------------------- */
function Card({ title, desc }: { title: string; desc: string; }) {
  return (
    <motion.div whileHover={{ y: -6 }} className="p-6 rounded-2xl bg-white dark:bg-gray-800 border shadow-sm">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{desc}</p>
    </motion.div>
  );
}
