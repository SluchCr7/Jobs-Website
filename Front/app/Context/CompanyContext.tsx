"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import API from "../utils/axios";
import { companies as mockCompanies } from "../utils/Data";
import { Company } from "../utils/Types";
import { toast } from "sonner";

interface CompanyContextType {
    companies: any[];
    currentCompany: any | null;
    loading: boolean;
    error: string | null;
    fetchCompanies: () => Promise<void>;
    fetchCompanyById: (id: string) => Promise<void>;
    createCompany: (formData: FormData) => Promise<void>;
    updateCompany: (id: string, formData: FormData) => Promise<void>;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const CompanyProvider = ({ children }: { children: React.ReactNode }) => {
    const [companies, setCompanies] = useState<any[]>([]);
    const [currentCompany, setCurrentCompany] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCompanies = useCallback(async () => {
        setLoading(true);
        try {
            const response = await API.get("/company");
            // Backend returns array? Check controller.
            // Controller says: res.status(200).json(companies); (List of companies)
            if (Array.isArray(response.data)) {
                setCompanies(response.data);
            } else if (response.data.companies) {
                setCompanies(response.data.companies);
            }
            else {
                setCompanies([]);
            }
            setError(null);
        } catch (err: any) {
            console.error("Failed to fetch companies, using mock data", err);
            setCompanies(mockCompanies);
            setError(err.response?.data?.message || "Failed to connect");
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchCompanyById = async (id: string) => {
        setLoading(true);
        try {
            const response = await API.get(`/company/${id}`);
            setCurrentCompany(response.data);
            setError(null);
        } catch (err: any) {
            console.error("Failed to fetch company details", err);
            const mock = mockCompanies.find((c) => c.id.toString() === id);
            if (mock) setCurrentCompany(mock);
            else toast.error("Company not found");
        } finally {
            setLoading(false);
        }
    };

    const createCompany = async (formData: FormData) => {
        setLoading(true);
        try {
            await API.post("/company", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            toast.success("Company created successfully");
            fetchCompanies();
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to create company");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateCompany = async (id: string, formData: FormData) => {
        setLoading(true);
        try {
            await API.put(`/company/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            toast.success("Company updated successfully");
            fetchCompanies();
            fetchCompanyById(id);
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to update company");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, [fetchCompanies]);

    return (
        <CompanyContext.Provider
            value={{
                companies,
                currentCompany,
                loading,
                error,
                fetchCompanies,
                fetchCompanyById,
                createCompany,
                updateCompany
            }}
        >
            {children}
        </CompanyContext.Provider>
    );
};

export const useCompanies = () => {
    const context = useContext(CompanyContext);
    if (!context) {
        throw new Error("useCompanies must be used within a CompanyProvider");
    }
    return context;
};
