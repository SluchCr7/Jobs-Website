// 'use client';

// import React, { useState } from "react";
// import { FaSlidersH, FaMapMarkerAlt, FaSearch, FaLaptopCode, FaBriefcase, FaTimes } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiltersProps, FiltersType } from "../utils/Types";

// export default function Filters({ setFilters }: FiltersProps) {
//   const [data, setData] = useState<FiltersType>({
//     keyword: "",
//     location: "",
//     remote: false,
//     employment: [],
//     skills: [],
//   });

//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const employmentTypes: string[] = ["Full-time", "Part-time", "Contract", "Internship"];
//   const skillList: string[] = ["React", "SEO", "Writing", "Node.js", "UI/UX", "Communication"];

//   const handleEmployment = (type: string) => {
//     setData((prev) => ({
//       ...prev,
//       employment: prev.employment.includes(type)
//         ? prev.employment.filter((t) => t !== type)
//         : [...prev.employment, type],
//     }));
//   };

//   const handleSkill = (skill: string) => {
//     setData((prev) => ({
//       ...prev,
//       skills: prev.skills.includes(skill)
//         ? prev.skills.filter((s) => s !== skill)
//         : [...prev.skills, skill],
//     }));
//   };

//   const applyFilters = () => setFilters(data);
//   const resetFilters = () => {
//     const empty: FiltersType = { keyword: "", location: "", remote: false, employment: [], skills: [] };
//     setData(empty);
//     setFilters(empty);
//   };

//   const FilterContent = () => (
//     <div className="flex flex-col gap-6 p-6 font-sans bg-white h-full w-full rounded-3xl shadow-xl">
//       {/* Header */}
//       <div className="flex items-center justify-between border-b border-gray-200 pb-4">
//         <div className="flex items-center gap-3">
//           <FaSlidersH className="w-6 h-6 text-indigo-600" />
//           <h2 className="text-2xl font-bold text-gray-900">Filter Jobs</h2>
//         </div>
//         <button
//           className="md:hidden text-gray-500 hover:text-gray-700"
//           onClick={() => setDrawerOpen(false)}
//         >
//           <FaTimes className="w-5 h-5" />
//         </button>
//       </div>

//       {/* Keyword Search */}
//       <div className="flex flex-col gap-2">
//         <label className="flex items-center gap-2 font-medium text-gray-700">
//           <FaSearch className="w-4 h-4 text-gray-400" /> Keyword
//         </label>
//         <input
//           type="text"
//           value={data.keyword}
//           onChange={(e) => setData({ ...data, keyword: e.target.value })}
//           placeholder="Job title, skill..."
//           className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition placeholder-gray-400 text-gray-800"
//         />
//       </div>

//       {/* Location */}
//       <div className="flex flex-col gap-2">
//         <label className="flex items-center gap-2 font-medium text-gray-700">
//           <FaMapMarkerAlt className="w-4 h-4 text-gray-400" /> Location
//         </label>
//         <input
//           type="text"
//           value={data.location}
//           onChange={(e) => setData({ ...data, location: e.target.value })}
//           placeholder="City or Country"
//           className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition placeholder-gray-400 text-gray-800"
//         />
//         <div className="flex items-center gap-3 mt-2">
//           <input
//             type="checkbox"
//             checked={data.remote}
//             onChange={() => setData({ ...data, remote: !data.remote })}
//             className="w-5 h-5 accent-indigo-600 rounded"
//           />
//           <span className="text-gray-700 font-medium">Remote Only</span>
//         </div>
//       </div>

//       {/* Employment Types */}
//       <div className="flex flex-col gap-2">
//         <label className="flex items-center gap-2 font-medium text-gray-700">
//           <FaBriefcase className="w-4 h-4 text-gray-400" /> Employment Type
//         </label>
//         <div className="flex flex-wrap gap-3 mt-2">
//           {employmentTypes.map((type, idx) => (
//             <button
//               key={idx}
//               onClick={() => handleEmployment(type)}
//               className={`px-4 py-2 rounded-xl border font-medium text-sm transition ${
//                 data.employment.includes(type)
//                   ? "bg-indigo-600 text-white border-indigo-600 shadow"
//                   : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-50 hover:border-indigo-200"
//               }`}
//             >
//               {type}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Skills */}
//       <div className="flex flex-col gap-2">
//         <label className="flex items-center gap-2 font-medium text-gray-700">
//           <FaLaptopCode className="w-4 h-4 text-gray-400" /> Skills
//         </label>
//         <div className="flex flex-wrap gap-3 mt-2">
//           {skillList.map((skill, idx) => (
//             <button
//               key={idx}
//               onClick={() => handleSkill(skill)}
//               className={`px-4 py-2 rounded-xl border font-medium text-sm transition ${
//                 data.skills.includes(skill)
//                   ? "bg-green-600 text-white border-green-600 shadow"
//                   : "bg-white text-gray-700 border-gray-300 hover:bg-green-50 hover:border-green-200"
//               }`}
//             >
//               {skill}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex gap-4 mt-6">
//         <button
//           onClick={applyFilters}
//           className="flex-1 bg-indigo-600 text-white py-3 rounded-2xl font-semibold shadow-lg hover:bg-indigo-700 transition transform hover:-translate-y-1"
//         >
//           Apply Filters
//         </button>
//         <button
//           onClick={resetFilters}
//           className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-2xl font-semibold hover:bg-gray-100 transition"
//         >
//           Reset
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {/* Desktop Sidebar */}
//       <div className="hidden md:flex md:w-80 flex-col sticky top-6">
//         <FilterContent />
//       </div>

//       {/* Mobile Drawer */}
//       <div className="md:hidden">
//         <button
//           onClick={() => setDrawerOpen(true)}
//           className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold shadow hover:bg-indigo-700 transition fixed bottom-6 right-6 z-50 flex items-center gap-2"
//         >
//           <FaSlidersH /> Filters
//         </button>

//         <AnimatePresence>
//           {drawerOpen && (
//             <motion.div
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ duration: 0.3 }}
//               className="fixed inset-0 bg-white z-50 shadow-lg overflow-y-auto"
//             >
//               <FilterContent />
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </>
//   );
// }
'use client';
import React, { useState } from "react";
import { FiltersProps, FiltersType } from "@/app/utils/Types";
import { FaSlidersH, FaSearch, FaMapMarkerAlt, FaBriefcase, FaLaptopCode, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Filters({ setFilters }: FiltersProps) {
  const [data, setData] = useState<FiltersType>({
    keyword: "",
    location: "",
    remote: false,
    employment: [],
    skills: [],
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  const employmentTypes: string[] = ["Full-time", "Part-time", "Contract", "Internship"];
  const skillList: string[] = ["React", "SEO", "Writing", "Node.js", "UI/UX", "Communication"];

  const handleEmployment = (type: string) => {
    setData(prev => ({
      ...prev,
      employment: prev.employment.includes(type)
        ? prev.employment.filter(t => t !== type)
        : [...prev.employment, type],
    }));
  };

  const handleSkill = (skill: string) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const applyFilters = () => setFilters(data);
  const resetFilters = () => {
    const empty: FiltersType = { keyword: "", location: "", remote: false, employment: [], skills: [] };
    setData(empty);
    setFilters(empty);
  };

  const FilterContent = () => (
    <div className="flex flex-col gap-6 p-6 bg-white h-full w-full rounded-3xl shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div className="flex items-center gap-3">
          <FaSlidersH className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-900">Filter Jobs</h2>
        </div>
        <button className="md:hidden text-gray-500 hover:text-gray-700" onClick={() => setDrawerOpen(false)}>
          <FaTimes className="w-5 h-5" />
        </button>
      </div>

      {/* Keyword */}
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 font-medium text-gray-700">
          <FaSearch className="w-4 h-4 text-gray-400" /> Keyword
        </label>
        <input
          type="text"
          value={data.keyword}
          onChange={e => setData({ ...data, keyword: e.target.value })}
          placeholder="Job title, skill..."
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>

      {/* Location */}
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 font-medium text-gray-700">
          <FaMapMarkerAlt className="w-4 h-4 text-gray-400" /> Location
        </label>
        <input
          type="text"
          value={data.location}
          onChange={e => setData({ ...data, location: e.target.value })}
          placeholder="City or Country"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 transition"
        />
        <div className="flex items-center gap-3 mt-2">
          <input
            type="checkbox"
            checked={data.remote}
            onChange={() => setData({ ...data, remote: !data.remote })}
            className="w-5 h-5 accent-indigo-600 rounded"
          />
          <span className="text-gray-700 font-medium">Remote Only</span>
        </div>
      </div>

      {/* Employment */}
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 font-medium text-gray-700">
          <FaBriefcase className="w-4 h-4 text-gray-400" /> Employment Type
        </label>
        <div className="flex flex-wrap gap-3 mt-2">
          {employmentTypes.map((type, idx) => (
            <button
              key={idx}
              onClick={() => handleEmployment(type)}
              className={`px-4 py-2 rounded-xl border font-medium text-sm transition ${
                data.employment.includes(type)
                  ? "bg-indigo-600 text-white border-indigo-600 shadow"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-50"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 font-medium text-gray-700">
          <FaLaptopCode className="w-4 h-4 text-gray-400" /> Skills
        </label>
        <div className="flex flex-wrap gap-3 mt-2">
          {skillList.map((skill, idx) => (
            <button
              key={idx}
              onClick={() => handleSkill(skill)}
              className={`px-4 py-2 rounded-xl border font-medium text-sm transition ${
                data.skills.includes(skill)
                  ? "bg-green-600 text-white border-green-600 shadow"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-green-50"
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6">
        <button onClick={applyFilters} className="flex-1 bg-indigo-600 text-white py-3 rounded-2xl font-semibold hover:bg-indigo-700 transition">
          Apply
        </button>
        <button onClick={resetFilters} className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-2xl font-semibold hover:bg-gray-100 transition">
          Reset
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-80 flex-col sticky top-6">
        <FilterContent />
      </div>

      {/* Mobile Drawer */}
      <div className="md:hidden">
        <button
          onClick={() => setDrawerOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold shadow fixed bottom-6 right-6 z-50 flex items-center gap-2"
        >
          <FaSlidersH /> Filters
        </button>

        <AnimatePresence>
          {drawerOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-white z-50 shadow-lg overflow-y-auto"
            >
              <FilterContent />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
