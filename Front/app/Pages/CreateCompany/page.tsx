"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/Context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import API from "@/app/utils/axios";
import { motion } from "framer-motion";
import { Building2, Globe, MapPin, Users, Calendar, Upload, Briefcase } from "lucide-react";

export default function CreateCompanyPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        industry: "",
        description: "",
        website: "",
        location: "",
        size: "",
        foundedYear: "",
    });

    const [logoFile, setLogoFile] = useState<File | null>(null);

    // Redirect if not employer or already has company
    useEffect(() => {
        if (!authLoading) {
            if (!user) {
                router.push("/Pages/Login");
            } else if (user.role !== "employer") {
                toast.error("Only employers can create companies");
                router.push("/");
            } else if (user.company) {
                toast.info("You already have a company");
                router.push("/");
            }
        }
    }, [user, authLoading, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setLogoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.industry) {
            toast.error("Please fill in all required fields");
            return;
        }

        setLoading(true);

        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("industry", formData.industry);
            if (formData.description) data.append("description", formData.description);
            if (formData.website) data.append("website", formData.website);
            if (formData.location) data.append("location", formData.location);
            if (formData.size) data.append("size", formData.size);
            if (formData.foundedYear) data.append("foundedYear", formData.foundedYear);
            if (logoFile) data.append("logo", logoFile);

            const response = await API.post("/company", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            toast.success("Company created successfully!");

            // Update user in localStorage with company
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                parsedUser.company = response.data.company;
                localStorage.setItem("user", JSON.stringify(parsedUser));
            }

            // Redirect to jobs or dashboard
            router.push("/Pages/Jobs");
            window.location.reload(); // Reload to update context
        } catch (error: any) {
            console.error("Create company error:", error);
            toast.error(error.response?.data?.message || "Failed to create company");
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600 dark:text-slate-400">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-24 px-4 md:px-8 transition-colors font-sans">
            <div className="container-custom max-w-4xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Building2 className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-4">
                        Create Your Company
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Set up your company profile to start posting jobs and finding great talent.
                    </p>
                </motion.div>

                {/* Form */}
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    onSubmit={handleSubmit}
                    className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 p-8 md:p-10"
                >

                    {/* Logo Upload */}
                    <div className="mb-8">
                        <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">
                            Company Logo
                        </label>
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 rounded-2xl bg-slate-100 dark:bg-slate-700 border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center overflow-hidden">
                                {logoPreview ? (
                                    <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
                                ) : (
                                    <Upload className="w-8 h-8 text-slate-400" />
                                )}
                            </div>
                            <div>
                                <input
                                    type="file"
                                    id="logo"
                                    accept="image/*"
                                    onChange={handleLogoChange}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="logo"
                                    className="px-6 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-xl font-semibold cursor-pointer transition inline-block"
                                >
                                    Choose Logo
                                </label>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                                    PNG, JPG up to 5MB
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Company Name */}
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                            Company Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Acme Corporation"
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Industry */}
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                            Industry <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                name="industry"
                                value={formData.industry}
                                onChange={handleChange}
                                required
                                placeholder="Technology, Finance, Healthcare..."
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Tell us about your company..."
                            className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition dark:text-white resize-none"
                        />
                    </div>

                    {/* Website */}
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                            Website
                        </label>
                        <div className="relative">
                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="url"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                placeholder="https://yourcompany.com"
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                            Location
                        </label>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="San Francisco, CA"
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Size & Founded Year */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                                Company Size
                            </label>
                            <div className="relative">
                                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <select
                                    name="size"
                                    value={formData.size}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition dark:text-white appearance-none cursor-pointer"
                                >
                                    <option value="">Select size</option>
                                    <option value="1-10">1-10 employees</option>
                                    <option value="11-50">11-50 employees</option>
                                    <option value="51-200">51-200 employees</option>
                                    <option value="201-500">201-500 employees</option>
                                    <option value="500+">500+ employees</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                                Founded Year
                            </label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="number"
                                    name="foundedYear"
                                    value={formData.foundedYear}
                                    onChange={handleChange}
                                    placeholder="2020"
                                    min="1800"
                                    max={new Date().getFullYear()}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition dark:text-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-400 text-white rounded-xl font-bold text-lg shadow-lg shadow-primary-500/25 transition-all active:scale-[0.99] flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Creating Company...
                            </>
                        ) : (
                            <>
                                <Building2 className="w-5 h-5" />
                                Create Company
                            </>
                        )}
                    </button>
                </motion.form>
            </div>
        </div>
    );
}
