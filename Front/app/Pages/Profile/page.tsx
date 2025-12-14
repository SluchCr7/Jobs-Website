'use client'

import React from 'react';
import { userProfile } from '@/app/utils/Data';
import { FiCameraOff, FiMail, FiPhone, FiLink } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

const UserProfilePage = () => {
  const renderImage = (url?: string, alt?: string, className?: string) => (
    url ? (
      <Image
        src={url}
        alt={alt ?? "Image"} // fallback إذا لم يُعطَ alt
        width={500}
        height={500}
        className={className}
      />
    ) : (
      <div className={`flex items-center justify-center bg-gray-200 text-gray-400 ${className}`}>
        <FiCameraOff size={50} />
      </div>
    )
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-16">

      {/* Cover + Avatar + Basic Info */}
      <div className="relative">
        {renderImage(userProfile.coverUrl, "Cover", "w-full h-64 object-cover rounded-3xl")}
        <div className="absolute left-6 bottom-0 transform translate-y-1/2 flex items-center gap-6">
          {renderImage(userProfile.avatarUrl, userProfile.fullName, "w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover")}
          <div className="text-white drop-shadow-lg">
            <h1 className="text-4xl font-bold">{userProfile.fullName}</h1>
            <p className="text-lg">{userProfile.title}</p>
            <p className="text-md">{userProfile.location}</p>
          </div>
        </div>
        <div className="absolute right-6 bottom-4 flex gap-4">
          <button className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold">Follow</button>
          <button className="px-5 py-2 border rounded-xl hover:bg-gray-100 transition font-semibold">Message</button>
          <button className="px-5 py-2 border rounded-xl hover:bg-gray-100 transition font-semibold">Download CV</button>
        </div>
      </div>

      {/* About / Summary */}
      <section className="bg-gray-50 p-6 rounded-3xl shadow-lg space-y-4">
        <h2 className="text-3xl font-bold border-b pb-2">About</h2>
        <p className="text-gray-700">{userProfile.summary}</p>
      </section>

      {/* Contact Info */}
      <section className="bg-white p-6 rounded-3xl shadow-lg space-y-4">
        <h2 className="text-3xl font-bold border-b pb-2">Contact Info</h2>
        <div className="grid md:grid-cols-3 gap-4 text-gray-700">
          <div className="flex items-center gap-2"><FiMail /> {userProfile.contact.email}</div>
          {userProfile.contact.phone && <div className="flex items-center gap-2"><FiPhone /> {userProfile.contact.phone}</div>}
          {userProfile.contact.website && <div className="flex items-center gap-2"><FiLink /> <Link href={userProfile.contact.website} target="_blank" className="text-blue-600 underline">Website</Link></div>}
          {userProfile.contact.linkedin && <div className="flex items-center gap-2"><FiLink /> <Link href={userProfile.contact.linkedin} target="_blank" className="text-blue-600 underline">LinkedIn</Link></div>}
          {userProfile.contact.github && <div className="flex items-center gap-2"><FiLink /> <Link href={userProfile.contact.github} target="_blank" className="text-blue-600 underline">GitHub</Link></div>}
          {userProfile.contact.twitter && <div className="flex items-center gap-2"><FiLink /> <Link href={userProfile.contact.twitter} target="_blank" className="text-blue-600 underline">Twitter</Link></div>}
        </div>
      </section>

      {/* Work Experience */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold border-b pb-2">Work Experience</h2>
        <div className="space-y-4">
          {userProfile.workExperience.map((job, idx) => (
            <div key={idx} className="p-5 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition">
              <h3 className="font-bold text-xl">{job.jobTitle}</h3>
              <p className="text-gray-500">{job.company} | {job.startDate} - {job.endDate || "Present"}</p>
              <p className="text-gray-700 mt-2">{job.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold border-b pb-2">Education</h2>
        <div className="space-y-4">
          {userProfile.education.map((edu, idx) => (
            <div key={idx} className="p-5 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition">
              <h3 className="font-bold text-xl">{edu.degree}</h3>
              <p className="text-gray-500">{edu.institution} | {edu.startDate} - {edu.endDate}</p>
              {edu.description && <p className="text-gray-700 mt-2">{edu.description}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="bg-gray-50 p-6 rounded-3xl shadow-lg">
        <h2 className="text-3xl font-bold border-b pb-2">Skills</h2>
        <div className="flex flex-wrap gap-3 mt-4">
          {userProfile.skills.map((skill, idx) => (
            <span key={idx} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium">{skill.name} {skill.level && `(${skill.level})`}</span>
          ))}
        </div>
      </section>

      {/* Projects / Portfolio */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold border-b pb-2">Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {userProfile.projects?.map((proj, idx) => (
            <div key={idx} className="p-5 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition">
              {proj.imageUrl ? <Image src={proj.imageUrl} alt={proj.name} width={400} height={250} className="w-full h-48 object-cover rounded-lg mb-3"/> : <div className="w-full h-48 flex items-center justify-center bg-gray-200 rounded-lg text-gray-400 mb-3"><FiCameraOff size={40} /></div>}
              <h3 className="font-semibold text-lg">{proj.name}</h3>
              <p className="text-gray-700 mt-1">{proj.description}</p>
              {proj.link && <Link href={proj.link} target="_blank" className="text-blue-600 underline mt-2 block">View Project</Link>}
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-gray-50 p-6 rounded-3xl shadow-lg">
        <h2 className="text-3xl font-bold border-b pb-2">Certifications</h2>
        <div className="flex flex-wrap gap-4 mt-4">
          {userProfile.certifications?.map((cert, idx) => (
            <div key={idx} className="px-4 py-2 bg-white shadow rounded-xl">
              <p className="font-semibold">{cert.name}</p>
              <p className="text-gray-500">{cert.issuer} | {cert.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Languages & Interests */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold border-b pb-2">Languages & Interests</h2>
        <div className="flex flex-wrap gap-3">
          {userProfile.languages?.map((lang, idx) => <span key={idx} className="px-4 py-2 bg-green-100 text-green-800 rounded-full">{lang}</span>)}
          {userProfile.interests?.map((intr, idx) => <span key={idx} className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full">{intr}</span>)}
        </div>
      </section>

    </div>
  );
};

export default UserProfilePage;
