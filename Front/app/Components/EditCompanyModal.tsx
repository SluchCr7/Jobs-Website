"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Save, Globe, MapPin, Building2, Info, Users, Calendar } from "lucide-react";
import { useCompanies } from "../Context/CompanyContext";
import { toast } from "sonner";
import Image from "next/image";

interface EditCompanyModalProps {
    open: boolean;
    onClose: () => void;
    company: any;
}

export default function EditCompanyModal({ open, onClose, company }: EditCompanyModalProps) {
    const { updateCompany } = useCompanies();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        industry: "",
        size: "",
        foundedYear: "",
    });
    const [logo, setLogo] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string>("");

    useEffect(() => {
        if (company) {
            setFormData({
                name: company.name || "",
                description: company.description || "",
                website: company.website || "",
                location: company.location || "",
                industry: company.industry || "",
                size: company.size || "",
                foundedYear: company.foundedYear || "",
            });
            setLogoPreview(company.logo || company.logoUrl || "");
        }
    }, [company, open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setLogo(file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value.toString());
            });
            if (logo) {
                data.append("logo", logo);
            }

            await updateCompany(company._id || company.id, data);
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden border border-white/20 dark:border-slate-700/50"
                    >
                        {/* Header */}
                        <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                            <div>
                                <h2 className="text-2xl font-heading font-black text-slate-900 dark:text-white flex items-center gap-2">
                                    <Building2 className="text-primary-500" /> Edit Company Profile
                                </h2>
                                <p className="text-sm text-slate-500 font-medium">Keep your company information up to date</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            >
                                <X className="w-6 h-6 text-slate-500" />
                            </button>
                        </div>

                        {/* Content */}
                        <form onSubmit={handleSubmit} className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Logo Upload */}
                                <div className="md:col-span-2 flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl bg-slate-50/50 dark:bg-slate-900/30 hover:border-primary-500 transition-colors group relative overflow-hidden">
                                    {logoPreview ? (
                                        <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-lg border-2 border-white dark:border-slate-700">
                                            <Image src={logoPreview} alt="Preview" fill className="object-contain" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Upload className="text-white w-6 h-6" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-2xl flex items-center justify-center mb-2">
                                            <Building2 size={32} />
                                        </div>
                                    )}
                                    <p className="mt-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Company Logo</p>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleLogoChange}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                </div>

                                {/* Name */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                        <Building2 size={14} className="text-primary-500" /> Company Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-primary-500 outline-none transition-all font-medium"
                                        placeholder="e.g. Acme Corp"
                                        required
                                    />
                                </div>

                                {/* Industry */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                        <Info size={14} className="text-primary-500" /> Industry
                                    </label>
                                    <input
                                        type="text"
                                        name="industry"
                                        value={formData.industry}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-primary-500 outline-none transition-all font-medium"
                                        placeholder="e.g. Technology"
                                    />
                                </div>

                                {/* Website */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                        <Globe size={14} className="text-primary-500" /> Website URL
                                    </label>
                                    <input
                                        type="url"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-primary-500 outline-none transition-all font-medium"
                                        placeholder="https://example.com"
                                    />
                                </div>

                                {/* Location */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                        <MapPin size={14} className="text-primary-500" /> Location
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-primary-500 outline-none transition-all font-medium"
                                        placeholder="e.g. San Francisco, CA"
                                    />
                                </div>

                                {/* Size */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                        <Users size={14} className="text-primary-500" /> Company Size
                                    </label>
                                    <select
                                        name="size"
                                        value={formData.size}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-primary-500 outline-none transition-all font-medium appearance-none"
                                    >
                                        <option value="">Select size</option>
                                        <option value="1-10">1-10 members</option>
                                        <option value="11-50">11-50 members</option>
                                        <option value="51-200">51-200 members</option>
                                        <option value="201-500">201-500 members</option>
                                        <option value="500+">500+ members</option>
                                    </select>
                                </div>

                                {/* Founded Year */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                        <Calendar size={14} className="text-primary-500" /> Founded Year
                                    </label>
                                    <input
                                        type="number"
                                        name="foundedYear"
                                        value={formData.foundedYear}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-primary-500 outline-none transition-all font-medium"
                                        placeholder="e.g. 2020"
                                    />
                                </div>

                                {/* Description */}
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                        <Info size={14} className="text-primary-500" /> About the Company
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-primary-500 outline-none transition-all font-medium resize-none"
                                        placeholder="Tell candidates about your company history, culture, and mission..."
                                    />
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="mt-10 flex gap-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 py-4 px-6 rounded-2xl border border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-[2] py-4 px-6 rounded-2xl bg-primary-600 text-white font-bold hover:bg-primary-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary-500/20 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <Save size={20} /> Save Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
