"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
	Facebook,
	Twitter,
	Linkedin,
	Instagram,
	Copy,
	Check,
} from "lucide-react";

export default function ShareProgress() {
	const [copied, setCopied] = useState(false);
	const [selectedOption, setSelectedOption] = useState<string | null>(null);

	const handleShare = (platform: string) => {
		setSelectedOption(platform);

		// Example URLs for social sharing
		const shareUrl = "https://go-green-2025.example.com";
		const shareTitle = "Join me in the Go Green 2025 Challenge! #GoGreen2025";
		const shareText =
			"I'm participating in the Go Green 2025 Challenge with my team. Together, we're making a difference one sustainable action at a time. Join us!";

		let shareLink = "";

		switch (platform) {
			case "twitter":
				shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
					shareUrl
				)}&text=${encodeURIComponent(shareTitle)}`;
				break;
			case "facebook":
				shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
					shareUrl
				)}&quote=${encodeURIComponent(shareTitle)}`;
				break;
			case "linkedin":
				shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
					shareUrl
				)}`;
				break;
			case "instagram":
				// Instagram doesn't support direct web sharing, so we'll copy the text instead
				navigator.clipboard.writeText(
					`${shareTitle}\n\n${shareText}\n\n${shareUrl}`
				);
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
				return;
			case "copy":
				navigator.clipboard.writeText(
					`${shareTitle}\n\n${shareText}\n\n${shareUrl}`
				);
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
				return;
		}

		// Open sharing dialog in a new window
		if (shareLink) {
			window.open(shareLink, "_blank", "width=600,height=400");
		}
	};

	const socialPlatforms = [
		{ id: "twitter", name: "Twitter", icon: <Twitter className="w-5 h-5" /> },
		{
			id: "facebook",
			name: "Facebook",
			icon: <Facebook className="w-5 h-5" />,
		},
		{
			id: "linkedin",
			name: "LinkedIn",
			icon: <Linkedin className="w-5 h-5" />,
		},
		{
			id: "instagram",
			name: "Instagram",
			icon: <Instagram className="w-5 h-5" />,
		},
		{
			id: "copy",
			name: "Copy Link",
			icon: copied ? (
				<Check className="w-5 h-5" />
			) : (
				<Copy className="w-5 h-5" />
			),
		},
	];

	return (
		<section className="py-16 bg-green-50 dark:bg-green-950/30">
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.1 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12"
				>
					<h2 className="text-3xl font-bold text-green-800 dark:text-green-400">
						Share Your Progress
					</h2>
					<p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
						Spread the word about our sustainability efforts and inspire others
						to join the movement.
					</p>
				</motion.div>

				<div className="max-w-3xl mx-auto">
					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
						<div className="p-6 md:p-8">
							<div className="aspect-video relative rounded-lg overflow-hidden mb-8">
								<img
									src="/placeholder.svg?height=400&width=600"
									alt="Go Green Challenge"
									className="object-cover w-full h-full"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
									<div className="p-4 text-white">
										<h3 className="text-xl font-bold">
											Go Green 2025 Challenge
										</h3>
										<p className="text-sm opacity-80">
											Join our sustainability journey
										</p>
									</div>
								</div>
							</div>

							<div className="mb-6">
								<h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
									Choose a platform to share on:
								</h4>
								<div className="flex flex-wrap gap-3 justify-center">
									{socialPlatforms.map((platform) => (
										<motion.button
											key={platform.id}
											onClick={() => handleShare(platform.id)}
											className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all ${
												selectedOption === platform.id
													? "bg-green-100 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-300"
													: "border-gray-300 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-500 text-gray-700 dark:text-gray-300"
											}`}
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
										>
											{platform.icon}
											<span>{platform.name}</span>
										</motion.button>
									))}
								</div>
							</div>

							<div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
								<p className="text-sm text-gray-500 dark:text-gray-400 text-center">
									By sharing, you're helping to spread awareness about
									sustainability and environmental conservation.
								</p>
							</div>
						</div>
					</div>

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: copied ? 1 : 0 }}
						className="mt-4 text-center text-green-600 dark:text-green-400"
					>
						<span className="flex items-center justify-center">
							<Check className="w-4 h-4 mr-2" />
							Link copied to clipboard!
						</span>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
