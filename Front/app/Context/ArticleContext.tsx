"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import API from "../utils/axios";
import { Article } from "../utils/Types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ArticleContextType {
    articles: Article[];
    loading: boolean;
    fetchArticles: () => Promise<void>;
    fetchArticleBySlug: (slug: string) => Promise<Article | null>;
    createArticle: (formData: FormData) => Promise<void>;
    updateArticle: (id: string, formData: FormData) => Promise<void>;
    deleteArticle: (id: string) => Promise<void>;
    getCompanyArticles: (companyId: string) => Promise<Article[]>;
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const ArticleProvider = ({ children }: { children: React.ReactNode }) => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const fetchArticles = useCallback(async () => {
        try {
            setLoading(true);
            const res = await API.get("/articles");
            setArticles(res.data);
        } catch (error) {
            console.error("Failed to fetch articles", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchArticleBySlug = async (slug: string): Promise<Article | null> => {
        try {
            const res = await API.get(`/articles/${slug}`);
            return res.data;
        } catch (error) {
            console.error("Failed to fetch article", error);
            return null;
        }
    };

    const createArticle = async (formData: FormData) => {
        try {
            setLoading(true);
            const res = await API.post("/articles", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setArticles((prev) => [res.data.article, ...prev]);
            toast.success("Article published successfully!");
            router.push("/Pages/Articles");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to publish article");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateArticle = async (id: string, formData: FormData) => {
        try {
            setLoading(true);
            const res = await API.put(`/articles/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setArticles((prev) =>
                prev.map((a) => (a._id === id ? res.data.article : a))
            );
            toast.success("Article updated successfully!");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update article");
        } finally {
            setLoading(false);
        }
    };

    const deleteArticle = async (id: string) => {
        try {
            await API.delete(`/articles/${id}`);
            setArticles((prev) => prev.filter((a) => a._id !== id));
            toast.success("Article deleted");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete article");
        }
    };

    const getCompanyArticles = async (companyId: string) => {
        try {
            const res = await API.get(`/articles/company/${companyId}`);
            return res.data;
        } catch (error) {
            console.error("Failed to fetch company articles", error);
            return [];
        }
    };

    useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);

    return (
        <ArticleContext.Provider
            value={{
                articles,
                loading,
                fetchArticles,
                fetchArticleBySlug,
                createArticle,
                updateArticle,
                deleteArticle,
                getCompanyArticles,
            }}
        >
            {children}
        </ArticleContext.Provider>
    );
};

export const useArticles = () => {
    const context = useContext(ArticleContext);
    if (!context) {
        throw new Error("useArticles must be used within an ArticleProvider");
    }
    return context;
};
