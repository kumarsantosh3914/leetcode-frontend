"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { CodeEditor } from "@/components/CodeEditor";
import { DifficultyBadge } from "@/components/DifficultyBadge";
import { VerdictBadge } from "@/components/VerdictBadge";
import { useSubmissionStore } from "@/lib/store/submissionStore";
import { Loader2, Send } from "lucide-react";
import { problemService } from "@/lib/api/problemService";
import { submissionService } from "@/lib/api/submissionService";

export default function ProblemDetailPage() {
  const params = useParams();
  const problemId = params.id as string;

  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [userId, setUserId] = useState("user_" + Math.random().toString(36).substr(2, 9));
  const [submitting, setSubmitting] = useState(false);
  const [testResults, setTestResults] = useState<Record<string, string> | null>(null);
  const [pollInterval, setPollInterval] = useState<number | false>(false);

  const { setCurrentSubmission, currentSubmission } = useSubmissionStore();

  // Fetch problem details
  const { data: problem, isLoading: problemLoading, error: problemError } = useQuery({
    queryKey: ["problem", problemId],
    queryFn: () => problemService.getProblemById(problemId),
  });

  // Initialize code with template
  useEffect(() => {
    if (problem?.codeTemplates) {
      const template = problem.codeTemplates.find(
        (t) => t.language === language
      );
      if (template) {
        setCode(template.defaultCode || template.template || "");
      }
    }
  }, [problem, language]);

  // Poll for submission status
  useEffect(() => {
    if (!pollInterval || !currentSubmission) return;

    const timer = setInterval(async () => {
      try {
        const updated = await submissionService.getSubmissionById(
          currentSubmission.id
        );
        if (updated && updated.status === "completed") {
          setTestResults(updated.submissionData || {});
          setCurrentSubmission(updated);
          setPollInterval(false);
        }
      } catch (error) {
        console.error("Poll error:", error);
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [pollInterval, currentSubmission, setCurrentSubmission]);

  // Submit code mutation
  const submitMutation = useMutation({
    mutationFn: async () => {
      const submission = await submissionService.createSubmission({
        userId,
        problemId,
        code,
        language: language as "cpp" | "python",
      });
      setCurrentSubmission(submission);
      setSubmitting(false);
      setPollInterval(2000); // Start polling
      return submission;
    },
    onError: (error) => {
      console.error("Submission error:", error);
      setSubmitting(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      alert("Please write some code");
      return;
    }
    setSubmitting(true);
    await submitMutation.mutateAsync();
  };

  if (problemLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (problemError || !problem) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600">
          <p className="text-lg font-semibold">Error loading problem</p>
          <p className="text-sm">Please check if the problem exists</p>
        </div>
      </div>
    );
  }

  const stats = {
    submissions: problem.totalSubmissions || 0,
    accepted: problem.totalAccepted || 0,
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        {/* Problem Panel */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 border-r border-gray-200">
            {/* Problem Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {problem.title}
                  </h1>
                  <p className="text-gray-600 mt-2">
                    Problem #{problem.problemNumber}
                  </p>
                </div>
                <DifficultyBadge difficulty={problem.difficulty} />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-xs text-gray-600">Acceptance</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {Math.round(
                      (stats.accepted / stats.submissions) * 100
                    ) || 0}
                    %
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Submissions</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {stats.submissions}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Accepted</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {stats.accepted}
                  </p>
                </div>
              </div>
            </div>

            {/* Problem Description */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Description
              </h2>
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {problem.description}
                </p>
              </div>
            </div>

            {/* Constraints */}
            {problem.constraints.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Constraints
                </h2>
                <ul className="list-disc list-inside space-y-2">
                  {problem.constraints.map((constraint, idx) => (
                    <li key={idx} className="text-gray-700">
                      {constraint}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Test Cases */}
            {problem.testcases.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Examples
                </h2>
                <div className="space-y-4">
                  {problem.testcases.slice(0, 2).map((tc, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-mono bg-white p-2 rounded mb-2 border border-gray-200">
                        Input: {tc.input}
                      </p>
                      <p className="text-sm font-mono bg-white p-2 rounded border border-gray-200">
                        Output: {tc.output}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Editor Panel */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
          <div className="border-b border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="python">Python</option>
                <option value="cpp">C++</option>
              </select>
            </div>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit
                </>
              )}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <CodeEditor
              language={language}
              code={code}
              onChange={setCode}
              height="500px"
            />
          </div>

          {/* Test Results */}
          {testResults && (
            <div className="border-t border-gray-200 p-4 bg-gray-50 max-h-40 overflow-y-auto">
              <h3 className="font-semibold text-gray-900 mb-3">Test Results</h3>
              <div className="space-y-2">
                {Object.entries(testResults).map(([idx, verdict]) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Test Case {parseInt(idx) + 1}
                    </span>
                    <VerdictBadge verdict={verdict} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentSubmission?.status === "pending" && (
            <div className="border-t border-gray-200 p-4 bg-blue-50 flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
              <span className="text-sm text-blue-700">Evaluating...</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
