"use client";

import { submissionService } from "@/lib/api/submissionService";
import { formatDate } from "@/lib/utils/helper";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";

export default function SubmissionPage() {
    const [problemId, setProblemId] = useState("");

    const { data: submissions, isLoading, error } = useQuery({
        queryKey: ["submissions", problemId],
        queryFn: () =>
            problemId
                ? submissionService.getSubmissionsForProblem(problemId)
                : Promise.resolve([]),
        enabled: !!problemId,
    });

    if (!problemId) {
        return (
            <main className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            Enter a Problem ID
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Enter a problem ID to view its submissions
                        </p>
                        <input
                            type="text"
                            placeholder="Enter problem ID..."
                            value={problemId}
                            onChange={(e) => setProblemId(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                    </div>
                </div>
            </main>
        );
    }

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
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Submissions
                    </h1>
                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            placeholder="Enter problem ID..."
                            value={problemId}
                            onChange={(e) => setProblemId(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                    </div>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 mb-6">
                        Error loading submissions
                    </div>
                )}

                {submissions && submissions.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <p className="text-gray-600">No submissions found</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200 bg-gray-50">
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            User
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            Language
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            Submitted At
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {submissions?.map((submission) => (
                                        <tr
                                            key={submission.id}
                                            className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4 text-sm font-mono text-gray-600">
                                                {submission.id.substring(0, 8)}...
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {submission.userId}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                                                    {submission.language}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                {submission.status === "completed" && submission.submissionData
                                                    ? (() => {
                                                        const verdicts = Object.values(
                                                            submission.submissionData
                                                        ) as string[];
                                                        const accepted = verdicts.filter(
                                                            (v) => v === "AC"
                                                        ).length;
                                                        const total = verdicts.length;
                                                        const allAccepted = accepted === total;
                                                        return (
                                                            <span
                                                                className={`px-3 py-1 rounded-full text-xs font-medium ${allAccepted
                                                                        ? "bg-green-100 text-green-700"
                                                                        : "bg-red-100 text-red-700"
                                                                    }`}
                                                            >
                                                                {accepted}/{total} AC
                                                            </span>
                                                        );
                                                    })()
                                                    : "Pending"}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {formatDate(submission.createdAt)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}