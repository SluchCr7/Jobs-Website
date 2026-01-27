"use client";

import React, { useState } from "react";
import { useAuth } from "@/app/Context/AuthContext";
import { FiEdit, FiMail, FiMapPin, FiBriefcase, FiCalendar, FiShield, FiUsers, FiExternalLink } from "react-icons/fi";
import Image from "next/image";
import EditProfileModal from "@/app/Components/EditProfileModal";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserProfilePage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Redirect if not logged in
  React.useEffect(() => {
    if (!loading && !user) {
      router.push("/Pages/Login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors pb-20">
        {/* Cover Image */}
        <div className="relative h-64 md:h-80 w-full">
          <div className="w-full h-full bg-gradient-to-r from-primary-600 via-primary-700 to-primary-900"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="container-custom relative px-4 sm:px-6 lg:px-8 -mt-20">
          <div className="flex flex-col md:flex-row gap-6 items-end">
            {/* Avatar */}
            <div className="flex-shrink-0 relative">
              <div className="w-40 h-40 rounded-full border-4 border-white dark:border-slate-800 shadow-xl overflow-hidden bg-slate-200 dark:bg-slate-700">
                {user.avatar?.url && (
                  <Image
                    src={user.avatar.url}
                    alt={user.name}
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>

            {/* Header Info */}
            <div className="flex-1 pb-4 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-white drop-shadow-md mb-1">
                {user.name}
              </h1>
              <p className="text-lg text-white/90 font-medium drop-shadow-md flex items-center justify-center md:justify-start gap-2">
                <FiMail className="inline" /> {user.email}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm text-white border border-white/30">
                  <FiShield className="mr-1.5" />
                  {user.role === "employer" ? "Employer" : user.role === "admin" ? "Admin" : "Job Seeker"}
                </span>
                {user.isVerified && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500/20 backdrop-blur-sm text-white border border-green-400/30">
                    ✓ Verified
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pb-4 w-full md:w-auto justify-center md:justify-end">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="btn-primary flex items-center gap-2 px-6 py-2.5 shadow-lg"
              >
                <FiEdit /> Edit Profile
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
            {/* Left Column */}
            <div className="space-y-8 lg:col-span-2">
              {/* About */}
              <section className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-4">
                  About Me
                </h2>
                {user.bio ? (
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                    {user.bio}
                  </p>
                ) : (
                  <p className="text-slate-400 dark:text-slate-500 italic">
                    No bio added yet. Click "Edit Profile" to add one.
                  </p>
                )}
              </section>

              {/* Resume Section (for Job Seekers) */}
              {user.role === "user" && (
                <section className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                  <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-4">
                    Resume
                  </h2>
                  {user.resume ? (
                    <a
                      href={user.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-xl font-semibold hover:bg-primary-100 dark:hover:bg-primary-900/30 transition"
                    >
                      <FiCalendar />
                      View Resume
                    </a>
                  ) : (
                    <p className="text-slate-400 dark:text-slate-500 italic">
                      No resume uploaded yet.
                    </p>
                  )}
                </section>
              )}

              {/* Company & Professional Affiliation */}
              {user.company && (
                <section className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl pointer-events-none"></div>

                  <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                    <FiBriefcase className="text-primary-600" />
                    Work & Affiliations
                  </h2>

                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center p-3">
                        {user.company.logo && (
                          <Image
                            src={user.company.logo}
                            alt={user.company.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-contain"
                          />
                        )}
                        {/* // ) : (
                        //   <div className="text-3xl font-bold text-primary-600">
                        //     {user.company.name.charAt(0)}
                        //   </div>
                        // )} */}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white truncate">
                          {user.company.name}
                        </h3>
                        {/* Membership Badge */}
                        {(() => {
                          const membership = user.company.members?.find((m: any) =>
                            (typeof m.user === 'string' ? m.user : m.user?._id) === user._id
                          );
                          const roleName = membership?.role || (user.role === 'employer' ? 'Owner' : 'Member');
                          return (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800">
                              {roleName}
                            </span>
                          );
                        })()}
                      </div>

                      <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-slate-500 dark:text-slate-400">
                        {user.company.industry && (
                          <span className="flex items-center gap-1.5">
                            <FiBriefcase className="w-3.5 h-3.5 text-slate-400" />
                            {user.company.industry}
                          </span>
                        )}
                        {user.company.location && (
                          <span className="flex items-center gap-1.5">
                            <FiMapPin className="w-3.5 h-3.5 text-slate-400" />
                            {user.company.location}
                          </span>
                        )}
                        {user.company.website && (
                          <a
                            href={user.company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-primary-600 dark:text-primary-400 hover:underline font-medium"
                          >
                            <FiExternalLink className="w-3.5 h-3.5" />
                            Website
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="w-full md:w-auto mt-2 md:mt-0 flex gap-2">
                      {(() => {
                        const membership = user.company.members?.find((m: any) =>
                          (typeof m.user === 'string' ? m.user : m.user?._id) === user._id
                        );
                        const isPrivileged = user.role === 'admin' || membership?.role === 'owner' || membership?.role === 'admin' || (typeof user.company.owner === 'string' ? user.company.owner === user._id : user.company.owner?._id === user._id);

                        return isPrivileged && (
                          <Link
                            href={`/Pages/Company/${user.company._id || user.company.id}`}
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-bold hover:bg-primary-700 transition w-full shadow-lg shadow-primary-500/20"
                          >
                            <FiEdit className="w-4 h-4" /> Manage
                          </Link>
                        );
                      })()}
                      <Link
                        href={`/Pages/Company/${user.company._id || user.company.id}`}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition w-full shadow-sm"
                      >
                        Visit Page
                      </Link>
                    </div>
                  </div>
                </section>
              )}
            </div>

            {/* Right Column (Sidebar) */}
            <div className="space-y-8">
              {/* Account Details */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">
                  Account Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                    <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-600 flex-shrink-0">
                      <FiMail />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Email</p>
                      <p className="text-sm font-medium truncate">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                    <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-600 flex-shrink-0">
                      <FiBriefcase />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Role</p>
                      <p className="text-sm font-medium capitalize">{user.role}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                    <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-600 flex-shrink-0">
                      <FiCalendar />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Member Since</p>
                      <p className="text-sm font-medium">
                        {new Date(user.createdAt || Date.now()).toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-6 rounded-2xl shadow-lg text-white">
                <h3 className="text-lg font-bold mb-4">Profile Completion</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Profile Info</span>
                      <span className="font-bold">
                        {user.bio && user.avatar?.url ? "100%" : user.bio || user.avatar?.url ? "50%" : "0%"}
                      </span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="bg-white rounded-full h-2 transition-all"
                        style={{
                          width:
                            user.bio && user.avatar?.url ? "100%" : user.bio || user.avatar?.url ? "50%" : "0%",
                        }}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-white/80 mt-4">
                    {user.bio && user.avatar?.url
                      ? "Your profile is complete! 🎉"
                      : "Complete your profile to stand out!"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
    </>
  );
};

export default UserProfilePage;
