import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
    return (
        <div className="fixed w-full h-16 flex flex-row justify-between items-center gap-6 bg-black/5 backdrop-blur-lg border-b border-dashed px-8 py-4">
            <div className="flex justify-center items-center">
                <Image
                    src="/icon.svg"
                    alt="icon"
                    height={60}
                    width={60}
                />
            </div>

            <div className="flex flex-row justify-end items-center gap-6">
                <NavbarLink href="https://github.com/snehasishcodes/vscode-status/blob/main/README.md">Documentation</NavbarLink>
                <NavbarLink href="https://github.com/snehasishcodes/vscode-status" className="hidden md:block">Source</NavbarLink>
                <NavbarButton href="https://vscode.snehasish.xyz/download">Download</NavbarButton>
            </div>
        </div>
    )
}

export function NavbarLink({ href, className, children }: { href: string, className?: string, children: React.ReactNode }) {
    return (
        <Link href={href} className={cn("text-sm font-medium text-white/75 hover:text-white cursor-pointer", className)}>
            {children}
        </Link>
    )
}

export function NavbarButton({ href, className, children }: { href: string, className?: string, children: React.ReactNode }) {
    return (
        <Button size="sm" className={cn(className)} asChild>
            <Link href={href}>
                {children}
            </Link>
        </Button>
    )
}