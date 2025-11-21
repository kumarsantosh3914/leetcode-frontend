export const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
        case "Easy":
            return "text-green-600";
        case "Medium":
            return "text-yellow-600";
        case "Hard":
            return "text-red-600";
        default:
            return "text-gray-600";
    }
};

export const getDifficultyBg = (difficulty: string): string => {
    switch (difficulty) {
        case "Easy":
            return "bg-green-100";
        case "Medium":
            return "bg-yellow-100";
        case "Hard":
            return "bg-red-100";
        default:
            return "bg-gray-100";
    }
};

export const getVerdictColor = (verdict: string): string => {
    switch (verdict) {
        case "AC":
            return "text-green-600";
        case "WA":
            return "text-red-600";
        case "TLE":
            return "text-orange-600";
        case "RE":
            return "text-red-600";
        default:
            return "text-gray-600";
    }
};

export const getVerdictLabel = (verdict: string): string => {
    switch (verdict) {
        case "AC":
            return "Accepted";
        case "WA":
            return "Wrong Answer";
        case "TLE":
            return "Time Limit Exceeded";
        case "RE":
            return "Runtime Error";
        default:
            return "Unknown";
    }
};

export const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export const calculateAcceptanceRate = (accepted: number, total: number): number => {
    if(total === 0) return 0;
    return Math.round((accepted / total) * 100);
}