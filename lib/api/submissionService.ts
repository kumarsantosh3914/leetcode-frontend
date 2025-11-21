import axios, { AxiosInstance } from "axios";
import { ApiResponse, LeaderboardEntry, Submission } from "./types";

const baseURL = process.env.NEXT_PUBLIC_SUBMISSION_SERVICE_URL;

const apiClient: AxiosInstance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

export const submissionService = {
    // Health check
    ping: async () => {
        try {
            const response = await apiClient.get<ApiResponse<{ message: string }>>(
                "/ping"
            );
            return response.data;
        } catch (error) {
            console.error("Submission ping error:", error);
            throw error;
        }
    },

    // Create new submission
    createSubmission: async (data: {
        userId: string;
        problemId: string;
        code: string;
        language: "cpp" | "python";
    }) => {
        try {
            const response = await apiClient.post<ApiResponse<Submission>>(
                "/submissions",
                data
            );
            return response.data.data;
        } catch (error) {
            console.error("Create submission error:", error);
            throw error;
        }
    },

    // Get submission by ID
    getSubmissionById: async (id: string) => {
        try {
            const response = await apiClient.get<ApiResponse<Submission>>(
                `/submissions/${id}`
            );
            return response.data.data;
        } catch (error) {
            console.error("Get submission error:", error);
            throw error;
        }
    },

    // Get submissions for a problem
    getSubmissionsForProblem: async (problemId: string) => {
        try {
            const response = await apiClient.get<ApiResponse<Submission[]>>(
                `/submissions/problem/${problemId}`
            );
            return response.data.data || [];
        } catch (error) {
            console.error("Get problem submissions error:", error);
            throw error;
        }
    },

    // Update submission status
    updateSubmissionStatus: async (
        id: string,
        data: {
            status: "pending" | "completed";
            submissionData?: Record<string, "AC" | "WA" | "TLE" | "RE">;
        }
    ) => {
        try {
            const response = await apiClient.patch<ApiResponse<Submission>>(
                `/submissions/${id}/status`,
                data
            );
            return response.data.data;
        } catch (error) {
            console.error("Update submission status error:", error);
            throw error;
        }
    },

    // Delete submission
    deleteSubmission: async (id: string) => {
        try {
            const response = await apiClient.delete<ApiResponse<any>>(
                `/submissions/${id}`
            );
            return response.data;
        } catch (error) {
            console.error("Delete submission error:", error);
            throw error;
        }
    },

    // Get leaderboard
    getLeaderboard: async (type: string = "global", limit: number = 100) => {
        try {
            const response = await apiClient.get<ApiResponse<LeaderboardEntry[]>>(
                `/leaderboard/${type}`,
                { params: { limit } }
            );
            return response.data.data || [];
        } catch (error) {
            console.error("Get leaderboard error:", error);
            throw error;
        }
    },
}