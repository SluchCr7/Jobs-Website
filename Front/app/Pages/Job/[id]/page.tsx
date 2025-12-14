"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaGlobe,
} from "react-icons/fa";
import { MdWork } from "react-icons/md";
import Link from "next/link";
import { useParams } from "next/navigation";
import { jobs } from "@/app/utils/Data";
import ApplyJobModal from "@/app/Components/ApplyModel";
import { JobsData } from "@/app/utils/Types";
export default function JobDetailPage() {
  const params = useParams();
  const id = Number(params?.id);
  const [showModal, setShowModal] = React.useState(false);
  const selectedJob: JobsData | undefined = jobs.find((job) => job.id === id);

  if (!selectedJob) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-center text-xl text-gray-500">
          Job not found.
        </p>
      </div>
    );
  }

  const overallText =
    selectedJob.description ||
    "This role is an exciting opportunity to join a dynamic team and make an impact.";

  const qualifications = [
    "Bachelor's degree in a related field",
    "3+ years of experience in a relevant role",
    "Strong communication skills",
    "Ability to work independently and within a team",
  ];

  const requirements = [
    "Proficiency in required technical skills",
    "Knowledge of industry best practices",
    "Familiarity with modern frameworks and tools",
    "Strong problem-solving abilities",
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      {/* HEADER SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-5"
      >
        <span className="text-gray-400 text-sm tracking-wide">
          Home / Jobs / {selectedJob.title}
        </span>

        <h1 className="text-4xl font-bold text-gray-900 leading-snug">
          {selectedJob.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 mt-2 text-gray-700 text-base">
          <Item icon={<FaBuilding />} text={selectedJob.company} color="text-blue-600" />
          <Item icon={<FaMapMarkerAlt />} text={selectedJob.location} color="text-red-500" />
          <Item icon={<FaMoneyBillWave />} text={selectedJob.salary} color="text-green-600" />
          <Item icon={<MdWork />} text={selectedJob.employmentType} color="text-yellow-600" />
          <Item icon={<FaGlobe />} text={selectedJob.remote ? "Remote" : "On-site"} color="text-purple-600" />
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-4 flex-wrap">
          <button onClick={()=> setShowModal(true)} className="px-8 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition">
            Apply Now
          </button>

          <button className="px-8 py-3 rounded-xl font-semibold border border-gray-300 text-gray-700 hover:border-gray-400 transition shadow-sm">
            Save Job
          </button>
        </div>
      </motion.div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-14">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="md:col-span-2 p-10 shadow-lg rounded-3xl border border-gray-200"
        >
          <Section title="Overview" text={overallText} />

          <SectionList title="Qualifications" items={qualifications} />

          <SectionList title="Requirements" items={requirements} />

          {/* Skills */}
          <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-900">
            Required Skills
          </h2>
          <div className="flex flex-wrap gap-3">
            {selectedJob.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-5 py-2 rounded-full text-sm font-medium border border-blue-200 text-blue-600
                hover:bg-blue-50 transition cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Details */}
          <SectionDetails selectedJob={selectedJob} />
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-8 shadow-lg rounded-3xl border border-gray-200 h-fit"
        >
          <h3 className="text-2xl font-semibold mb-4 text-gray-900">
            About the Company
          </h3>

          <p className="text-gray-600 leading-7 text-base">
            {selectedJob.company} is a leading company delivering innovative solutions and high-quality products worldwide.
          </p>

          <Link
            href="#"
            className="mt-6 inline-block text-blue-600 font-semibold hover:underline text-base"
          >
            Visit Company Website →
          </Link>

          <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-sm transition">
            Apply Now
          </button>
        </motion.div>
      </div>
      <ApplyJobModal open={showModal} onClose={() => setShowModal(false)} job={selectedJob} />
    </div>
  );
}

const Item = ({ icon, text, color }: any) => (
  <p className="flex items-center gap-2">
    <span className={`${color} text-lg`}>{icon}</span>
    <span className="text-gray-700">{text}</span>
  </p>
);

const Section = ({ title, text }: any) => (
  <>
    <h2 className="text-2xl font-semibold mb-4 text-gray-900">{title}</h2>
    <p className="text-gray-700 leading-7 text-base">{text}</p>
  </>
);

const SectionList = ({ title, items }: any) => (
  <>
    <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-900">{title}</h2>
    <ul className="list-disc list-inside text-gray-700 text-base space-y-2">
      {items.map((item: string, idx: number) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  </>
);

const SectionDetails = ({ selectedJob }: any) => (
  <>
    <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-900">Job Details</h2>
    <ul className="text-gray-700 text-base space-y-3">
      <li><strong>Employment Type:</strong> {selectedJob.employmentType}</li>
      <li><strong>Work Mode:</strong> {selectedJob.remote ? "Remote" : "On-site"}</li>
      <li><strong>Posted Date:</strong> {selectedJob.postedDate}</li>
    </ul>
  </>
);
