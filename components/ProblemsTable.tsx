"use client";

import { Problem } from "@/lib/api";
import { calculateAcceptanceRate } from "@/lib/utils/helper";
import { DifficultyBadge } from "./DifficultyBadge";
import Link from "next/link";

interface ProblemsTableProps {
    problems: Problem[];
    isLoading?: boolean;
}

export function ProblemsTable({ problems, isLoading }: ProblemsTableProps) {
    if (isLoading) {
        return (
            <div className="flex justify-center py-12">
                <div className="text-gray-600">Loading problems...</div>
            </div>
        );
    }

    if (problems.length === 0) {
        return (
            <div className="flex justify-center py-12">
                <div className="text-gray-600">No problems found</div>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                            #
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                            Title
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                            Difficulty
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                            Acceptance
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                            Submissions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {problems.map((problem, idx) => (
                        <tr
                            key={problem._id}
                            className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                            <td className="px-6 py-4 text-sm text-gray-600">{idx + 1}</td>
                            <td className="px-6 py-4">
                                <Link
                                    href={`/problems/${problem._id}`}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    {problem.title}
                                </Link>
                            </td>
                            <td className="px-6 py-4">
                                <DifficultyBadge difficulty={problem.difficulty} />
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                                {calculateAcceptanceRate(
                                    problem.totalAccepted || 0,
                                    problem.totalSubmissions || 0
                                )}
                                %
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                                {problem.totalSubmissions || 0}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
