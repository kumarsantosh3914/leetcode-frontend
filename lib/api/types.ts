export interface Problem {
    _id: string;
    problemNumber: number;
    title: string;
    slug: string;
    description: string;
    difficulty: "Easy" | "Medium" | "Hard";
    acceptanceRate?: number;
    totalSubmissions?: number;
    totalAccepted?: number;
    categoryId?: string;
    isPremium?: boolean;
    isActive?: boolean;
    tags: string[];
    constraints: string[];
    codeTemplates: CodeTemplate[];
    hints?: string[];
    editorials?: string[];
    companies: string[];
    similarProblems: string[];
    followUp: string[];
    testcases: TestCase[];
    createdAt: string;
    updatedAt: string;
}

export interface CodeTemplate {
    language: string;
    template: string;
    defaultCode?: string;
}

export interface TestCase {
    input: string;
    output: string;
}

export interface Category {
    _id: string;
    name: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Company {
    _id: string;
    name?: string;
    logoUrl?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Submission {
    id: string;
    _id?: string;
    userId: string;
    problemId: string;
    code: string;
    language: "cpp" | "python";
    status: "pending" | "completed";
    submissionData?: Record<string, "AC" | "WA" | "TLE" | "RE">;
    createdAt: string;
    updatedAt: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
}

export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    total: number;
    page: number;
    limit: number;
}

export interface LeaderboardEntry {
    userId: string;
    totalSubmissions: number;
    totalAccepted: number;
    acceptanceRate: number;
}