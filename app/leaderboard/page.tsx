"use client";

import { submissionService } from "@/lib/api/submissionService";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Medal, Trophy } from "lucide-react";
import { useState } from "react";

export default function LeaderboardPage() {
    const [type, setType] = useState("global");
    const [limit, setLimit] = useState(100);

    const { data: leaderboard, isLoading, error } = useQuery({
        queryKey: ["leaderboard", type, limit],
        queryFn: () => submissionService.getLeaderboard(type, limit),
    });

    const getMedalIcon = (position: number) => {
        switch (position) {
            case 1:
                return <Medal className="w-5 h-5 text-yellow-500" />;
            case 2:
                return <Medal className="w-5 h-5 text-gray-400" />;
            case 3:
                return <Medal className="w-5 h-5 text-orange-600" />;
            default:
                return <span className="text-gray-600 font-semibold">{position}</span>;
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Trophy className="w-8 h-8 text-yellow-500" />
                        <h1 className="text-4xl font-bold text-gray-900">Leaderboard</h1>
                    </div>
                    <p className="text-gray-600">
                        Top performers competing on the coding problems platform
                    </p>
                </div>

                {/* Filter Section */}
                <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            >
                                <option value="global">Global</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Show Top
                            </label>
                            <select
                                value={limit}
                                onChange={(e) => setLimit(Number(e.target.value))}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            >
                                <option value={10}>10</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 mb-6">
                        Error loading leaderboard
                    </div>
                )}

                {/* Leaderboard Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {leaderboard && leaderboard.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200 bg-gray-50">
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                            Rank
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                            User ID
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                            Problems Solved
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                            Submissions
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                            Acceptance Rate
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaderboard.map((entry, index) => (
                                        <tr
                                            key={index}
                                            className={`border-b border-gray-200 hover:bg-blue-50 transition-colors ${index < 3 ? "bg-blue-50" : ""
                                                }`}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {getMedalIcon(index + 1)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-medium text-gray-900">
                                                    {entry.userId}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-lg font-semibold text-green-600">
                                                    {entry.totalAccepted}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-gray-900">{entry.totalSubmissions}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-green-500"
                                                            style={{
                                                                width: `${entry.acceptanceRate}%`,
                                                            }}
                                                        />
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {entry.acceptanceRate}%
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-12 text-center">
                            <p className="text-gray-600">No leaderboard data available</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}