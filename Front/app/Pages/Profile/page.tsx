'use client'
import React from 'react';
import { userProfile } from '@/app/utils/Data';
import { FiCameraOff, FiMail, FiPhone, FiLink, FiMapPin, FiBriefcase, FiDownload, FiMessageSquare, FiUserPlus } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

const UserProfilePage = () => {
  const renderImage = (url?: string, alt?: string, className?: string) => (
    url ? (
      <Image
        src={url}
        alt={alt ?? "Image"}
        width={500}
        height={500}
        className={className}
      />
    ) : (
      <div className={`flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-slate-400 ${className}`}>
        <FiCameraOff size={40} />
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors pb-20">

      {/* Cover Image */}
      <div className="relative h-64 md:h-80 w-full">
        {userProfile.coverUrl ? (
          <Image
            src={userProfile.coverUrl}
            alt="Cover"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-primary-600 to-primary-900"></div>
        )}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="container-custom relative px-4 sm:px-6 lg:px-8 -mt-20">
        <div className="flex flex-col md:flex-row gap-6 items-end">
          {/* Avatar */}
          <div className="flex-shrink-0 relative">
            {renderImage(userProfile.avatarUrl, userProfile.fullName, "w-40 h-40 rounded-full border-4 border-white dark:border-slate-800 shadow-xl object-cover")}
          </div>

          {/* Header Info */}
          <div className="flex-1 pb-4 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white drop-shadow-md mb-1">{userProfile.fullName}</h1>
            <p className="text-lg text-white/90 font-medium drop-shadow-md flex items-center justify-center md:justify-start gap-2">
              <FiBriefcase className="inline" /> {userProfile.title}
            </p>
            <p className="text-white/80 text-sm flex items-center justify-center md:justify-start gap-2 mt-1">
              <FiMapPin className="inline" /> {userProfile.location}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pb-4 w-full md:w-auto justify-center md:justify-end">
            <button className="btn-primary flex items-center gap-2 px-6 py-2.5 shadow-lg">
              <FiUserPlus /> Follow
            </button>
            <button className="btn-outline flex items-center gap-2 px-6 py-2.5 bg-white/90 backdrop-blur-sm border-white/50 text-slate-800 hover:bg-white">
              <FiMessageSquare /> Message
            </button>
            <button className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition shadow-lg">
              <FiDownload />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">

          {/* Left Column */}
          <div className="space-y-8 lg:col-span-2">

            {/* About */}
            <section className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-4">About Me</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                {userProfile.summary}
              </p>
            </section>

            {/* Work Experience */}
            <section className="space-y-6">
              <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white px-2">Work Experience</h2>
              <div className="space-y-4">
                {userProfile.workExperience.map((job, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2 mb-2">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{job.jobTitle}</h3>
                      <span className="text-sm font-medium text-primary-600 bg-primary-50 dark:bg-primary-900/30 px-3 py-1 rounded-full whitespace-nowrap">
                        {job.startDate} - {job.endDate || "Present"}
                      </span>
                    </div>
                    <p className="text-lg text-slate-700 dark:text-slate-300 font-medium mb-3">{job.company}</p>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{job.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className="space-y-6">
              <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white px-2">Education</h2>
              <div className="space-y-4">
                {userProfile.education.map((edu, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2 mb-2">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{edu.degree}</h3>
                      <span className="text-sm font-medium text-slate-500 bg-slate-100 dark:bg-slate-700 dark:text-slate-300 px-3 py-1 rounded-full whitespace-nowrap">
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                    <p className="text-lg text-slate-700 dark:text-slate-300 font-medium mb-2">{edu.institution}</p>
                    {edu.description && <p className="text-slate-600 dark:text-slate-400">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section className="space-y-6">
              <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white px-2">Featured Projects</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {userProfile.projects?.map((proj, idx) => (
                  <div key={idx} className="flex flex-col bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden hover:transform hover:-translate-y-1 transition-all duration-300">
                    <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-700">
                      {proj.imageUrl ? (
                        <Image src={proj.imageUrl} alt={proj.name} fill className="object-cover" />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full text-slate-400">
                          <FiCameraOff size={32} />
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{proj.name}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-1 line-clamp-3">{proj.description}</p>
                      {proj.link && (
                        <Link href={proj.link} target="_blank" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium text-sm flex items-center gap-1 mt-auto">
                          View Project <span aria-hidden="true">&rarr;</span>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="space-y-8">

            {/* Contact Info */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-600">
                    <FiMail />
                  </div>
                  <span className="text-sm truncate">{userProfile.contact.email}</span>
                </div>
                {userProfile.contact.phone && (
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                    <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-600">
                      <FiPhone />
                    </div>
                    <span className="text-sm">{userProfile.contact.phone}</span>
                  </div>
                )}
                {userProfile.contact.website && (
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                    <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-600">
                      <FiLink />
                    </div>
                    <Link href={userProfile.contact.website} target="_blank" className="text-sm hover:text-primary-600 transition truncate">
                      Website
                    </Link>
                  </div>
                )}
                <div className="pt-2 flex gap-2">
                  {userProfile.contact.linkedin && (
                    <Link href={userProfile.contact.linkedin} target="_blank" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-[#0077b5] hover:text-white text-slate-600 dark:text-slate-400 flex items-center justify-center transition-colors">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                    </Link>
                  )}
                  {userProfile.contact.github && (
                    <Link href={userProfile.contact.github} target="_blank" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-[#333] hover:text-white text-slate-600 dark:text-slate-400 flex items-center justify-center transition-colors">
                      <span className="sr-only">GitHub</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {userProfile.skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors cursor-default">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">Certifications</h3>
              <div className="space-y-3">
                {userProfile.certifications?.map((cert, idx) => (
                  <div key={idx} className="flex flex-col p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <span className="font-semibold text-slate-900 dark:text-white text-sm">{cert.name}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">{cert.issuer} • {cert.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {userProfile.languages?.map((lang, idx) => (
                  <span key={idx} className="px-3 py-1 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-full text-sm">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
