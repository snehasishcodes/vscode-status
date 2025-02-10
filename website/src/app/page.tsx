"use client";

import Navbar from "@/components/navbar";
import Content from "@/components/content";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CodeBlock, atomOneDark } from "react-code-blocks";
import { jsonCode } from "@/lib/code";

export default function Landing() {
	return (
		<>
			<Navbar />
			<Content className="h-full w-full min-h-dvh py-32 md:py-20 px-4 flex flex-col justify-center items-center gap-4">
				<div className="flex flex-col md:flex-row w-full md:p-20 gap-16 md:gap-6">
					<div className="w-full flex flex-col justify-start items-start">
						<h2 className="text-4xl md:text-7xl font-semibold leading-none">
							Export your VSCode Activity
						</h2>
						<h2 className="text-4xl md:text-7xl font-semibold leading-none">
							to a REST API
						</h2>

						<p className="my-4">Use cases: Display coding activity on your website, GitHub profile and more!</p>

						<div className="flex flex-row flex-wrap gap-4">
							<Button size="sm" asChild>
								<Link href="https://vscode.snehasish.xyz/download">
									Download Extension
								</Link>
							</Button>

							<Button size="sm" variant="outline" className="border-dashed" asChild>
								<Link href="https://github.com/snehasishcodes/vscode-status/blob/main/README.md">
									Documentation
								</Link>
							</Button>

							<Button size="sm" variant="outline" className="border-dashed" asChild>
								<Link href="https://github.com/snehasishcodes/vscode-status">
									GitHub
								</Link>
							</Button>
						</div>
					</div>

					<div className="w-full flex justify-center items-center">
						<Tabs defaultValue="json" className="w-[300px] md:w-[500px] h-full">
							<TabsList className="w-full">
								<TabsTrigger className="w-full" value="json">JSON</TabsTrigger>
								<TabsTrigger className="w-full" value="svg">SVG</TabsTrigger>
							</TabsList>
							<TabsContent className="w-full h-full" value="json">
								<CodeBlock
									text={jsonCode}
									language={"json"}
									showLineNumbers={false}
									theme={atomOneDark}
								/>
							</TabsContent>
							<TabsContent className="w-full h-full relative" value="svg">
								<Image src="/svg.png" alt="svg" fill className="object-center object-contain rounded-lg" />
							</TabsContent>
						</Tabs>
					</div>
				</div>
			</Content>
		</>
	);
}
