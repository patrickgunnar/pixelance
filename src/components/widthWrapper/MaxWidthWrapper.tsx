import { cn } from "@/lib/utils";

interface MaxWidthWrapperProps {
    children: React.ReactNode;
    className?: string;
}

export default function MaxWidthWrapper({
    children,
    className,
}: MaxWidthWrapperProps) {
    return (
        <div
            className={cn(
                "px-2.5 md:px-20 max-w-screen-xl mx-auto w-full",
                className
            )}
        >
            {children}
        </div>
    );
}
