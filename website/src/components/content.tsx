import { cn } from "@/lib/utils";

export default function Content({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={cn("py-16", className)}>
            {children}
        </div>
    )
}