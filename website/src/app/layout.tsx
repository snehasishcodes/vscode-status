import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
	title: "Next App Template",
	description: "Typescript, shadcn/ui, Framer Motion, GSAP, Next.js 15",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
	return (
		<html lang="en">
			<body className={`${inter.className} antialiased`}>
				{children}
			</body>
		</html>
	);
}
