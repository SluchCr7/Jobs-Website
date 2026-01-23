import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Clock, DollarSign, Building2, ArrowRight, Heart } from 'lucide-react';
import { JobsData } from '../utils/Types';
import Image from 'next/image';

interface JobCardProps {
    job: JobsData;
    variant?: 'grid' | 'list';
}

export default function JobCard({ job, variant = 'grid' }: JobCardProps) {
    const isList = variant === 'list';
    const companyName = typeof job.company === 'string' ? job.company : job.company?.name || 'Unknown Company';
    const companyLogo = typeof job.company === 'object' && job.company?.logo?.url
        ? job.company.logo.url
        : (job.logo || (typeof job.company === 'object' ? job.company.logoUrl : '') || '');
    const jobId = job._id || job.id;

    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`group relative flex ${isList ? 'flex-col sm:flex-row gap-6' : 'flex-col h-full'} 
                p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 
                hover:shadow-2xl hover:shadow-primary-500/10 dark:hover:shadow-primary-900/10 
                hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
        >
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-transparent dark:from-primary-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Header section */}
            <div className="relative flex justify-between items-start mb-4">
                <div className="flex gap-4">
                    <div className="w-14 h-14 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600 flex items-center justify-center p-2 shadow-sm group-hover:scale-110 transition-transform duration-300">
                        {companyLogo ? (
                            <Image
                                src={companyLogo}
                                alt={companyName}
                                width={48}
                                height={48}
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
                                {companyName?.[0] || 'C'}
                            </div>
                        )}
                    </div>
                </div>
                {job.favorite && (
                    <div className="text-red-500 p-2 bg-red-50 dark:bg-red-900/20 rounded-full">
                        <Heart className="w-4 h-4 fill-current" />
                    </div>
                )}
            </div>

            {/* Content section */}
            <div className="relative flex-1">
                <Link href={`/Pages/Job/${jobId}`} className="block group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">
                        {job.title}
                    </h3>
                </Link>

                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
                    <Building2 className="w-4 h-4" />
                    <span className="font-medium">{companyName}</span>
                </div>

                {/* Metadata Pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300">
                        <MapPin className="w-3.5 h-3.5" />
                        {job.location || 'Remote'}
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300">
                        <Clock className="w-3.5 h-3.5" />
                        {job.employmentType?.replace("_", " ") || 'Full Time'}
                    </div>
                    {job.salary && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                            <DollarSign className="w-3.5 h-3.5" />
                            {typeof job.salary === 'object' ? `${job.salary.min} - ${job.salary.max} ${job.salary.currency}` : job.salary}
                        </div>
                    )}
                </div>

                {/* Skills Preview */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {job.skills?.slice(0, 3).map((skill, i) => (
                        <span key={i} className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                            {skill}
                        </span>
                    ))}
                    {job.skills && job.skills.length > 3 && (
                        <span className="text-[10px] px-2 py-1 text-slate-400">+{job.skills.length - 3} more</span>
                    )}
                </div>
            </div>

            {/* Footer Actions */}
            <div className="relative mt-auto pt-4 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between gap-4">
                <Link
                    href={`/Pages/Job/${jobId}`}
                    className="flex-1 text-center py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                    View Details
                </Link>
                <button className="flex-1 btn-primary py-2.5 text-sm flex items-center justify-center gap-2 group/btn">
                    Apply
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
            </div>
        </motion.article>
    );
}
