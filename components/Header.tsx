"use client"

import Link from "next/link";
import { usePathname } from "next/navigation"

export function Header() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link
                            href="/"
                            className="flex items-center gap-2 font-bold text-xl text-gray-900 hover:text-gray-700"
                        >
                            <span className="text-2xl">💻</span>
                            <span>LeetCode</span>
                        </Link>

                        <nav className="hidden md:flex items-center gap-6">
                            <Link
                                href="/problems"
                                className={`font-medium transition-colors ${isActive("/problems")
                                    ? "text-blue-600"
                                    : "text-gray-700 hover:text-gray-900"
                                    }`}
                            >
                                Problems
                            </Link>
                            <Link
                                href="/submissions"
                                className={`font-medium transition-colors ${isActive("/submissions")
                                    ? "text-blue-600"
                                    : "text-gray-700 hover:text-gray-900"
                                    }`}
                            >
                                My Submissions
                            </Link>
                            <Link
                                href="/leaderboard"
                                className={`font-medium transition-colors ${isActive("/leaderboard")
                                    ? "text-blue-600"
                                    : "text-gray-700 hover:text-gray-900"
                                    }`}
                            >
                                Leaderboard
                            </Link>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}