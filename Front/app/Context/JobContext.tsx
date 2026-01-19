"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import API from "../utils/axios";
import { jobs as mockJobs, featuredJobs as mockFeatured } from "../utils/Data";
import { JobsData, Job } from "../utils/Types";
import { toast } from "sonner";

// Extend or use existing types. 
// Backend Job has _id. Frontend uses id (number). We will need to be careful.
// Let's use 'any' for the API response and map it or use a flexible type.

interface JobContextType {
    jobs: any[]; // Using any to accommodate both local and remote structures for now
    featuredJobs: any[];
    currentJob: any | null;
    loading: boolean;
    error: string | null;
    fetchJobs: (filters?: any) => Promise<void>;
    fetchJobById: (id: string) => Promise<void>;
    createJob: (jobData: any) => Promise<void>;
    updateJob: (id: string, jobData: any) => Promise<void>;
    deleteJob: (id: string) => Promise<void>;
    getJobsByCompany: (companyId: string) => Promise<void>;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider = ({ children }: { children: React.ReactNode }) => {
    const [jobs, setJobs] = useState<any[]>([]);
    const [featuredJobs, setFeaturedJobs] = useState<any[]>([]);
    const [currentJob, setCurrentJob] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchJobs = useCallback(async (filters: any = {}) => {
        setLoading(true);
        try {
            const query = new URLSearchParams(filters).toString();
            const response = await API.get(`/job?${query}`);
            // Backend returns { jobs, totalJobs, ... }
            if (response.data.jobs && response.data.jobs.length > 0) {
                setJobs(response.data.jobs);
                setError(null);
            } else {
                // Fallback or empty
                setJobs(response.data.jobs || []);
            }
        } catch (err: any) {
            console.error("Failed to fetch jobs, using mock data", err);
            setJobs(mockJobs); // Fallback to mock data
            setError(err.response?.data?.message || "Failed to connect to server");
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchFeaturedJobs = useCallback(async () => {
        // Logic to fetch featured jobs (e.g. top rated or specific query)
        // For now, if we fail to fetch main jobs, we naturally fail here too.
        // We can just use a subset of fetched jobs or a specific endpoint if it existed.
        // Since backend doesn't have explicit 'featured' endpoint, we might client-side filter or just use mock.
        setFeaturedJobs(mockFeatured);
    }, []);

    const fetchJobById = async (id: string) => {
        setLoading(true);
        try {
            const response = await API.get(`/job/${id}`);
            setCurrentJob(response.data);
            setError(null);
        } catch (err: any) {
            console.error("Failed to fetch job details", err);
            // Try to find in mock data if ID matches (mock IDs are numbers though)
            const mock = mockJobs.find((j) => j.id.toString() === id);
            if (mock) {
                setCurrentJob(mock);
            } else {
                setError("Job not found");
                toast.error("Job not found");
            }
        } finally {
            setLoading(false);
        }
    };

    const createJob = async (jobData: any) => {
        setLoading(true);
        try {
            await API.post("/job", jobData);
            toast.success("Job created successfully");
            fetchJobs(); // Refresh list
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to create job");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateJob = async (id: string, jobData: any) => {
        setLoading(true);
        try {
            await API.put(`/job/${id}`, jobData);
            toast.success("Job updated successfully");
            if (currentJob?._id === id) fetchJobById(id);
            fetchJobs();
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to update job");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteJob = async (id: string) => {
        setLoading(true);
        try {
            await API.delete(`/job/${id}`);
            toast.success("Job deleted successfully");
            fetchJobs();
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to delete job");
        } finally {
            setLoading(false);
        }
    };

    const getJobsByCompany = async (companyId: string) => {
        setLoading(true);
        try {
            const res = await API.get(`/job/company/${companyId}`);
            setJobs(res.data.jobs); // Or set a separate state 'companyJobs'
        } catch (err: any) {
            console.error("Failed to fetch company jobs", err);
            // Fallback?
        } finally {
            setLoading(false);
        }
    }

    // Initial fetch
    useEffect(() => {
        fetchJobs();
        fetchFeaturedJobs();
    }, [fetchJobs, fetchFeaturedJobs]);

    return (
        <JobContext.Provider
            value={{
                jobs,
                featuredJobs,
                currentJob,
                loading,
                error,
                fetchJobs,
                fetchJobById,
                createJob,
                updateJob,
                deleteJob,
                getJobsByCompany
            }}
        >
            {children}
        </JobContext.Provider>
    );
};

export const useJobs = () => {
    const context = useContext(JobContext);
    if (!context) {
        throw new Error("useJobs must be used within a JobProvider");
    }
    return context;
};
