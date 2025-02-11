import "@/styles/globals.css";
import { Inter } from "next/font/google";

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

const metadataParams = {
	title: "VSCode Status",
	description: "Export your VSCode Activity to a REST API and access it anytime. Use cases: Display coding activity on your website, GitHub profile and more.",
	images: ["/icon.png"],
	icons: {
		icon: "/icon.png",
		shortcut: "/icon.png",
		apple: "/icon.png"
	},
	siteName: "vscode.snehasish.xyz",
	themeColor: "#FFFFFF",
	url: "https://vscode.snehasish.xyz",
	metabase: new URL("https://vscode.snehasish.xyz"),
	keywords: ["vscode-status", "vscode status", "coding", "coding status", "coding activity", "vscode activity", "coding vscode", "vscode", "vscode api"],
	twitter: {
		card: "summary",
		creator: "@snehasishcodes"
	},
	robots: {
		index: false,
		follow: true,
		nocache: true,
		googleBot: {
			index: true,
			follow: false,
			noimageindex: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	}
}

export const metadata = {
	title: metadataParams.title,
	description: metadataParams.description,
	metadataBase: metadataParams.metabase,
	icons: metadataParams.icons,
	openGraph: {
		title: metadataParams.title,
		description: metadataParams.description,
		url: metadataParams.url,
		siteName: metadataParams.siteName,
		images: metadataParams.images,
	},
	twitter: {
		title: metadataParams.title,
		description: metadataParams.description,
		creator: metadataParams.twitter.creator,
		card: metadataParams.twitter.card,
		images: metadataParams.images
	}
}

export const viewport = {
	themeColor: metadataParams.themeColor
}
