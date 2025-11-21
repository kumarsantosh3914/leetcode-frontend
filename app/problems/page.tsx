"use client";

import { ProblemsTable } from "@/components/ProblemsTable";
import { problemService } from "@/lib/api/problemService";
import { useQuery } from "@tanstack/react-query";
import { Filter, Search } from "lucide-react";
import { useState } from "react";

export default function ProblemsPage() {
    const [filters, setFilters] = useState({
        q: "",
        difficulty: "",
        limit: 50,
    });

    const { data, isLoading, error } = useQuery({
        queryKey: ["problems", filters],
        queryFn: () =>
            problemService.getProblems({
                q: filters.q || undefined,
                difficulty: filters.difficulty || undefined,
                limit: filters.limit,
            }),
    });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, q: e.target.value });
    };

    const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters({ ...filters, difficulty: e.target.value });
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Problems</h1>
                    <p className="text-gray-600">
                        Practice coding problems and improve your skills
                    </p>
                </div>

                {/* Filters */}
                <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Search className="inline-block w-4 h-4 mr-2" />
                                Search Problems
                            </label>
                            <input
                                type="text"
                                placeholder="Search by title or description..."
                                value={filters.q}
                                onChange={handleSearch}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Filter className="inline-block w-4 h-4 mr-2" />
                                Difficulty
                            </label>
                            <select
                                value={filters.difficulty}
                                onChange={handleDifficultyChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            >
                                <option value="">All Difficulties</option>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Results per page
                            </label>
                            <select
                                value={filters.limit}
                                onChange={(e) =>
                                    setFilters({ ...filters, limit: Number(e.target.value) })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            >
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Problems Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <ProblemsTable problems={data?.data || []} isLoading={isLoading} />
                </div>

                {error && (
                <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    <p className="font-medium">Error loading problems</p>
                    <p className="text-sm">
                    Make sure the backend services are running and configured correctly.
                    </p>
                </div>
                )}
            </div>
        </main>
    );
}