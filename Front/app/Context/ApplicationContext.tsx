"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../utils/axios";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

interface ApplicationContextType {
    myApplications: any[];
    jobApplications: any[]; // For employers viewing apps for a job
    companyApplications: any[];
    loading: boolean;
    applyToJob: (jobId: string, resume: File | null, coverLetter: string) => Promise<void>;
    fetchMyApplications: () => Promise<void>;
    fetchJobApplications: (jobId: string) => Promise<void>;
    fetchCompanyApplications: (companyId: string) => Promise<void>;
    updateApplicationStatus: (id: string, status: string) => Promise<void>;
    deleteApplication: (id: string) => Promise<void>;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const ApplicationProvider = ({ children }: { children: React.ReactNode }) => {
    const [myApplications, setMyApplications] = useState<any[]>([]);
    const [jobApplications, setJobApplications] = useState<any[]>([]);
    const [companyApplications, setCompanyApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { user } = useAuth();

    const fetchMyApplications = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const response = await API.get("/app/my-applications");
            // Check if data is array
            if (Array.isArray(response.data)) {
                setMyApplications(response.data);
            } else {
                setMyApplications([]);
            }
        } catch (err: any) {
            console.error("Failed to fetch applications", err);
        } finally {
            setLoading(false);
        }
    };

    const applyToJob = async (jobId: string, resume: File | null, coverLetter: string) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("jobId", jobId);
            if (resume) {
                formData.append("resume", resume);
            }
            if (coverLetter) {
                formData.append("coverLetter", coverLetter);
            }

            await API.post("/app/apply", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            toast.success("Applied successfully!");
            fetchMyApplications();
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to apply");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const fetchJobApplications = async (jobId: string) => {
        setLoading(true);
        try {
            const response = await API.get(`/app/job/${jobId}/applications`);
            setJobApplications(response.data);
        } catch (err: any) {
            console.error("Failed to fetch job applications", err);
            toast.error(err.response?.data?.message || "Failed to fetch applications");
        } finally {
            setLoading(false);
        }
    };

    const fetchCompanyApplications = async (companyId: string) => {
        setLoading(true);
        try {
            const response = await API.get(`/app/company/${companyId}/applications`);
            setCompanyApplications(response.data);
        } catch (err: any) {
            console.error("Failed to fetch company applications", err);
            toast.error(err.response?.data?.message || "Failed to fetch applications");
        } finally {
            setLoading(false);
        }
    };

    const updateApplicationStatus = async (id: string, status: string) => {
        setLoading(true);
        try {
            await API.put("/app/update", { id, status });
            toast.success("Status updated");
            // Optionally refresh or update local state
            setCompanyApplications(prev => prev.map(app => app._id === id ? { ...app, status } : app));
            setJobApplications(prev => prev.map(app => app._id === id ? { ...app, status } : app));
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Update failed");
        } finally {
            setLoading(false);
        }
    }

    const deleteApplication = async (id: string) => {
        setLoading(true);
        try {
            await API.delete(`/app/delete/${id}`);
            toast.success("Application deleted");
            fetchMyApplications();
        } catch (err: any) {
            toast.error("Failed to delete application");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user) {
            fetchMyApplications();
        }
    }, [user]);

    return (
        <ApplicationContext.Provider
            value={{
                myApplications,
                jobApplications,
                companyApplications,
                loading,
                applyToJob,
                fetchMyApplications,
                fetchJobApplications,
                fetchCompanyApplications,
                updateApplicationStatus,
                deleteApplication
            }}
        >
            {children}
        </ApplicationContext.Provider>
    );
};

export const useApplications = () => {
    const context = useContext(ApplicationContext);
    if (!context) {
        throw new Error("useApplications must be used within an ApplicationProvider");
    }
    return context;
};
