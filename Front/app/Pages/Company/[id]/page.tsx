'use client'

import React from 'react';
import { useParams } from 'next/navigation';
import { companies } from '@/app/utils/Data';
import { Company } from '@/app/utils/Types';
import Link from 'next/link';
import { FiCameraOff } from 'react-icons/fi';
import Image from 'next/image';

const CompanyPage = () => {
  const params = useParams();
  const id = Number(params?.id);
  const company: Company | undefined = companies.find(c => c.id === id);

  if (!company) {
    return <div className="text-center p-10 text-xl">Company not found</div>;
  }

  const renderImage = (url?: string, alt?: string) => (
    url ? (
      <Image src={url} alt={alt} width={500} height={500} className="w-full h-48 object-contain rounded shadow" />
    ) : (
      <div className="w-full h-48 flex flex-col items-center justify-center bg-gray-200 rounded shadow text-gray-400">
        <FiCameraOff size={40} />
        <span className="mt-2">No Image</span>
      </div>
    )
  );

  // معلومات استاتيكية إضافية
  const staticInfo = {
    vision: "To innovate and lead in technology, creating solutions that impact the world.",
    mission: "Deliver high-quality products and services while fostering a culture of growth and inclusivity.",
    values: ["Integrity", "Innovation", "Collaboration", "Excellence"],
    size: "5000+ Employees",
    founded: "2000",
    languages: ["English", "Spanish", "French"],
    cultureDescription: "A collaborative environment encouraging innovation, learning, and personal growth.",
    projects: [
      "AI-powered platform for global solutions",
      "Cloud infrastructure scaling worldwide",
      "Next-gen social networking platform"
    ]
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-white p-8 rounded-3xl shadow-xl border">
        <div className="flex items-center gap-6">
          <Image width={500} height={500} src={company.logoUrl} alt={company.name} className="w-24 h-24 object-contain" />
          <div>
            <h1 className="text-5xl font-extrabold">{company.name}</h1>
            <p className="text-gray-600 mt-1 text-lg">{company.location}</p>
            <p className="text-gray-500 mt-1">{company.jobsCount} Open Positions</p>
            <span className="inline-block mt-3 px-4 py-1 text-sm bg-blue-100 text-blue-800 rounded-full font-medium">Top Employer</span>
          </div>
        </div>
        <div className="flex gap-4 mt-6 md:mt-0">
          <Link href={company.website} target="_blank" className="px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition font-semibold">Visit Website</Link>
          <button className="px-6 py-3 border rounded-2xl hover:bg-gray-100 transition font-semibold">Follow</button>
        </div>
      </div>

      {/* About & Static Info */}
      <section className="space-y-6 bg-gray-50 p-8 rounded-3xl shadow-lg">
        <h2 className="text-3xl font-bold border-b pb-2">About {company.name}</h2>
        <p className="text-gray-700">{company.description || "This company is a leading organization known for innovation and excellence."}</p>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div className="p-4 bg-white rounded-2xl shadow">
            <h3 className="font-semibold text-xl mb-2">Vision</h3>
            <p className="text-gray-700">{staticInfo.vision}</p>
          </div>
          <div className="p-4 bg-white rounded-2xl shadow">
            <h3 className="font-semibold text-xl mb-2">Mission</h3>
            <p className="text-gray-700">{staticInfo.mission}</p>
          </div>
        </div>

        {/* Values, Size, Founded, Languages */}
        <div className="grid md:grid-cols-4 gap-6 mt-4 text-gray-700">
          <div>
            <h4 className="font-semibold">Values</h4>
            <ul className="list-disc list-inside">
              {staticInfo.values.map((v, i) => <li key={i}>{v}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Company Size</h4>
            <p>{staticInfo.size}</p>
          </div>
          <div>
            <h4 className="font-semibold">Founded</h4>
            <p>{staticInfo.founded}</p>
          </div>
          <div>
            <h4 className="font-semibold">Languages</h4>
            <p>{staticInfo.languages.join(", ")}</p>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold border-b pb-2">Open Positions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[...Array(10)].map((_, idx) => (
            <div key={idx} className="p-6 border rounded-3xl shadow-lg hover:shadow-2xl transition bg-white">
              <h3 className="font-bold text-xl mb-2">Job Title {idx + 1}</h3>
              <p className="text-gray-500">Location: {company.location}</p>
              <p className="text-gray-500">Type: Full-time</p>
              <button className="mt-4 px-5 py-2 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition font-semibold">Apply Now</button>
            </div>
          ))}
        </div>
      </section>

      {/* Culture & Benefits */}
      <section className="space-y-6 bg-gray-50 p-8 rounded-3xl shadow-lg">
        <h2 className="text-3xl font-bold border-b pb-2">Culture & Benefits</h2>
        <p className="text-gray-700">{staticInfo.cultureDescription}</p>
        <ul className="grid md:grid-cols-2 gap-4 text-gray-700">
          <li className="flex items-center gap-2">✅ Flexible working hours</li>
          <li className="flex items-center gap-2">✅ Remote options available</li>
          <li className="flex items-center gap-2">✅ Health insurance</li>
          <li className="flex items-center gap-2">✅ Opportunities for growth and learning</li>
        </ul>
      </section>

      {/* Projects / Highlights */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold border-b pb-2">Projects & Highlights</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {staticInfo.projects.map((p, i) => (
            <div key={i} className="p-5 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition">
              <h3 className="font-semibold text-lg mb-2">{p}</h3>
              <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery / Media */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold border-b pb-2">Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array(3).fill(null).map((_, idx) => renderImage(undefined, `Gallery ${idx + 1}`))}
        </div>
      </section>

      {/* Reviews */}
      <section className="space-y-6 bg-gray-50 p-8 rounded-3xl shadow-lg">
        <h2 className="text-3xl font-bold border-b pb-2">Employee Reviews</h2>
        <div className="space-y-4">
          {[1,2,3].map(idx => (
            <div key={idx} className="border-l-4 border-blue-600 p-5 rounded-2xl bg-white shadow-sm">
              <p className="font-semibold">John Doe</p>
              <p className="text-yellow-500">★★★★★</p>
              <p className="text-gray-700 mt-1">Great place to work with amazing culture and growth opportunities.</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default CompanyPage;
