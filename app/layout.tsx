import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Go Green 2025 - Product Support Team",
	description:
		"Showcasing our team's participation in the Go Green 2025 campaign",
	generator: "Slowey",
	icons: {
		icon: "/favicon.svg",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="scroll-smooth">
			<body className={inter.className}>
				{/* Google Tag Manager - Load as early as possible */}
				<Script
					id="google-tag-manager"
					strategy="beforeInteractive"
					dangerouslySetInnerHTML={{
						__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W35QZTNV');`,
					}}
				/>

				{/* Google Tag Manager (noscript) - Immediately after opening body tag */}
				<noscript>
					<iframe
						src="https://www.googletagmanager.com/ns.html?id=GTM-W35QZTNV"
						height="0"
						width="0"
						style={{ display: "none", visibility: "hidden" }}
					/>
				</noscript>

				{children}
			</body>
		</html>
	);
}
