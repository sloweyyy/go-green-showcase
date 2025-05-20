"use client";

import { useState, useEffect } from "react";
import { Leaf } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
	const [scrolled, setScrolled] = useState(false);
	const [activeSection, setActiveSection] = useState("hero");

	// Handle scroll events
	useEffect(() => {
		const handleScroll = () => {
			const position = window.scrollY;
			setScrolled(position > 100);

			// Determine active section based on scroll position
			const sections = ["hero", "gallery", "team", "join", "testimonials"];
			for (const section of sections) {
				const element = document.getElementById(section);
				if (element) {
					const rect = element.getBoundingClientRect();
					if (rect.top <= 100 && rect.bottom >= 100) {
						setActiveSection(section);
						break;
					}
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navItems = [
		{ id: "hero", label: "Home" },
		{ id: "gallery", label: "Challenges" },
		{ id: "team", label: "Team" },
		{ id: "join", label: "Join Us" },
		{ id: "testimonials", label: "Testimonials" },
	];

	const scrollToSection = (id: string) => {
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<AnimatePresence>
			{scrolled && (
				<motion.header
					initial={{ y: -100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: -100, opacity: 0 }}
					transition={{ duration: 0.3 }}
					className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
				>
					<div className="container mx-auto px-4 flex items-center justify-between h-16">
						<div className="flex items-center space-x-2">
							<Leaf className="h-5 w-5 text-green-600" />
							<span className="font-semibold text-foreground">
								Go Green 2025
							</span>
						</div>

						<nav className="hidden md:flex items-center space-x-8">
							{navItems.map((item) => (
								<button
									key={item.id}
									onClick={() => scrollToSection(item.id)}
									className={`text-sm font-medium transition-colors hover:text-green-600 ${
										activeSection === item.id
											? "text-green-600"
											: "text-muted-foreground"
									}`}
								>
									{item.label}
									{activeSection === item.id && (
										<motion.div
											layoutId="activeIndicator"
											className="h-1 bg-green-600 rounded-full mt-1"
											transition={{
												type: "spring",
												stiffness: 300,
												damping: 30,
											}}
										/>
									)}
								</button>
							))}
						</nav>
					</div>
				</motion.header>
			)}
		</AnimatePresence>
	);
}
