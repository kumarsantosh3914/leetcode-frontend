import axios, { AxiosInstance } from "axios";
import { ApiResponse, Category, Company, PaginatedResponse, Problem } from "./types";

const baseURL = process.env.NEXT_PUBLIC_PROBLEM_SERVICE_URL;

const apiClient: AxiosInstance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

export const problemService = {
    // Health check
    ping: async () =>  {
        try {
            const response = await apiClient.get<ApiResponse<{ message: string }>> (
                "/ping"
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get all problems with filters
    getProblems: async (params?: {
        q?: string;
        difficulty?: string;
        tags?: string[];
        companies?: string[];
        isPremium?: boolean;
        sort?: string;
        limit?: number;
        after?: string;
    }) => {
        try {
            const response = await apiClient.get<PaginatedResponse<Problem>>(
                "/problems",
                {params}
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get problem by ID
    getProblemById: async (id: string) => {
        try {
            const response = await apiClient.get<ApiResponse<Problem>>(
                `/problems/${id}`
            );

            return response.data.data;
        } catch (error) {
            throw error;
        }
    },

    // Get problem by slug
    getProblemBySlug: async (slug: string) => {
        try {
            const response = await apiClient.get<ApiResponse<Problem>>(
                `/problem/slug/${slug}`
            );

            return response.data.data;
        } catch (error) {
            throw error;
        }
    },

    // Get random problem
    getRandomProblem: async () => {
        try {
            const response = await apiClient.get<ApiResponse<Problem>>(
                "/problems/random"
            );

            return response.data.data;
        } catch (error) {
            throw error;
        }
    },

    // Get total problem count
    getProblemCount: async () => {
        try {
            const response = await apiClient.get<ApiResponse<Problem>>(
                "/problem/count"
            );

            return response.data.data || 0;
        } catch (error) {
            throw error;
        }
    },

    // Get problem statistics
    getProblemStats: async (id: string) => {
        try {
            const response = await apiClient.get<
              ApiResponse<{
                totalSubmissions: number;
                totalAccepted: number;
                acceptanceRate: number;
              }>
            >(
                `/problems/${id}/stats`
            );

            return response.data.data;
        } catch (error) {
            throw error;
        }
    },

    // Get test cases
    getTestCases: async (id: string) => {
        try {
            const response = await apiClient.get<ApiResponse<any>>(
                `/problems/${id}.testcases`
            );

            return response.data.data;
        } catch (error) {
            throw error;
        }
    },

    // Get all categories
    getCategories: async () => {
        try {
        const response = await apiClient.get<ApiResponse<Category[]>>(
            "/categories"
        );
        return response.data.data || [];
        } catch (error) {
        console.error("Get categories error:", error);
        throw error;
        }
    },

    // Get all companies
    getCompanies: async () => {
        try {
        const response = await apiClient.get<ApiResponse<Company[]>>(
            "/companies"
        );
        return response.data.data || [];
        } catch (error) {
        console.error("Get companies error:", error);
        throw error;
        }
    },
}