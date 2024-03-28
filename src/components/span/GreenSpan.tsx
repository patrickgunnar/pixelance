import { cn } from "@/lib/utils";

interface GreenSpanProps {
    children: React.ReactNode;
    className?: string;
}

export default function GreenSpan({ children, className }: GreenSpanProps) {
    return (
        <span className={cn("text-green-500 font-medium", className)}>
            {children}
        </span>
    );
}
