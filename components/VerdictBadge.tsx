import { getVerdictColor, getVerdictLabel } from "@/lib/utils/helper";

interface VerdictBadgeProps {
    verdict: string;
    className?: string;
}

export function VerdictBadge({ verdict, className = "" }: VerdictBadgeProps) {
    return (
        <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getVerdictColor(
                verdict
            )} ${className}`}
        >
            {getVerdictLabel(verdict)}
        </span>
    );
}