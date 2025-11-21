import { Code2, TrendingUp, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Master Coding
              <span className="text-blue-600"> One Problem at a Time</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Practice with hundreds of coding problems, improve your problem-solving skills, and prepare for technical interviews.
            </p>
            <div className="flex gap-4">
              <Link
                href="/problems"
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Practicing
              </Link>
              <Link
                href="/leaderboard"
                className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                View Leaderboard
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
              <Code2 size={200} className="text-blue-600 opacity-50" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose LeetCode?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Code2 className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Multiple Languages
              </h3>
              <p className="text-gray-600">
                Support for Python, C++, and more. Write code in your favorite language.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Zap className="w-12 h-12 text-yellow-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Instant Feedback
              </h3>
              <p className="text-gray-600">
                Get immediate results with real test cases and detailed feedback on your submissions.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <TrendingUp className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Track Progress
              </h3>
              <p className="text-gray-600">
                Monitor your performance and climb the leaderboard as you solve more problems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Ready to Start?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of developers improving their coding skills
        </p>
        <Link
          href="/problems"
          className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Explore Problems
        </Link>
      </section>
    </main>
  );
}
