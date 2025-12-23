import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiClock, FiMapPin, FiDollarSign } from 'react-icons/fi';
import { JobsData } from '../utils/Types';

interface JobCardProps {
    job: JobsData;
    variant?: 'grid' | 'list';
}

export default function JobCard({ job, variant = 'grid' }: JobCardProps) {
    const isList = variant === 'list';

    return (
        <motion.article
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className={`group relative flex ${isList ? 'flex-col sm:flex-row gap-6' : 'flex-col'} p-6 rounded-2xl bg-white border border-slate-100 hover:border-primary-100 shadow-sm hover:shadow-xl hover:shadow-primary-900/5 transition-all duration-300 dark:bg-slate-800 dark:border-slate-700`}
        >
            <div className={`flex ${isList ? 'flex-col sm:flex-row gap-4 flex-1' : 'flex-col gap-4'}`}>
                <div className="flex items-start justify-between w-full">
                    <div className="flex items-center gap-4">
                        <div className={`${isList ? 'w-16 h-16' : 'w-14 h-14'} shrink-0 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 dark:bg-slate-700 dark:border-slate-600`}>
                            {job.logo ? (
                                <img src={job.logo} alt={job.company} className="w-8 h-8 object-contain" />
                            ) : (
                                <span className="font-bold text-xl text-primary-600">{job.company?.[0] || 'C'}</span>
                            )}
                        </div>
                        <div>
                            <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors line-clamp-1">
                                {job.title}
                            </h3>
                            <p className="text-sm text-slate-500 font-medium dark:text-slate-400">{job.company}</p>
                        </div>
                    </div>

                    {job.favorite && (
                        <span className="text-primary-500">❤️</span>
                    )}
                </div>

                <div className={`space-y-3 ${isList ? 'mt-0' : 'mb-6'}`}>
                    <div className="flex flex-wrap gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md dark:bg-slate-700/50">
                            <FiMapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md dark:bg-slate-700/50">
                            <FiClock className="w-4 h-4" />
                            <span>{job.employmentType?.replace("_", " ")}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md dark:bg-slate-700/50">
                            <FiDollarSign className="w-4 h-4" />
                            <span>{job.salary}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {job.skills?.slice(0, 3).map((skill, i) => (
                            <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                                {skill}
                            </span>
                        ))}
                    </div>

                    {isList && <p className="text-slate-500 text-sm line-clamp-2 mt-2">{job.description}</p>}
                </div>
            </div>

            <div className={`${isList ? 'mt-4 sm:mt-0 sm:ml-auto w-full sm:w-auto flex sm:flex-col justify-center' : 'mt-auto'} flex items-center gap-3`}>
                <Link href={`/Pages/Job/${job.id}`} className="flex-1 btn-outline text-center text-sm py-2 px-4 whitespace-nowrap">
                    Details
                </Link>
                <button className="flex-1 btn-primary text-sm py-2 px-4 whitespace-nowrap">
                    Apply Now
                </button>
            </div>
        </motion.article>
    );
}
