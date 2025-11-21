import { cn } from "@/lib/utils/cn";
import { getDifficultyBg, getDifficultyColor } from "@/lib/utils/helper";

interface DifficultyBadgeProps {
    difficulty: string;
    className?: string;
}

export function DifficultyBadge({ difficulty, className }: DifficultyBadgeProps) {
    return (
        <span
            className={cn(
                "px-3 py-1 rounded-full text-sm font-medium",
                getDifficultyBg(difficulty),
                getDifficultyColor(difficulty),
                className
            )}
        >
            {difficulty}
        </span>
    );
}