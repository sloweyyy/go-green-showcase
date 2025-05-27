"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";

import { Header } from "@/components/header";
import StandardGrid from "@/components/galleries/standard-grid";
import MasonryLayout from "@/components/galleries/masonry-layout";
import CarouselGallery from "@/components/galleries/carousel-gallery";
import TeamSection from "@/components/team-section";
import JoinChallenge from "@/components/join-challenge";
const ImpactStats = dynamic(() => import("@/components/impact-stats"), {
	ssr: false,
});
import Testimonials from "@/components/testimonials";
import HeroBackgroundEffect from "@/components/hero-background";
import CollageGallery from "@/components/galleries/collage-gallery";
import TimelineGallery from "@/components/galleries/timeline-gallery";
import PolaroidGallery from "@/components/galleries/polaroid-gallery";

export default function Home() {
	const heroRef = useRef(null);
	const galleryRef = useRef(null);
	const isGalleryInView = useInView(galleryRef, { once: true, amount: 0.1 });

	const { scrollYProgress } = useScroll({
		target: heroRef,
		offset: ["start start", "end start"],
	});

	const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
	const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
	const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

	const scrollToGallery = () => {
		document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
	};

	const challengeDays = [
		{
			day: "Week 2",
			title: "Recycle Roundup",
			images: [
				{
					src: "/week-2/1.webp",
					caption: "Kicking off Week 2 with a big recycling effort!",
				},
				{
					src: "/week-2/2.webp",
					caption: "Sorting recyclables: teamwork in action.",
				},
				{
					src: "/week-2/3.webp",
					caption: "Everyone pitching in for a cleaner environment.",
				},
				{
					src: "/week-2/4.webp",
					caption: "Old batteries ready for recycling.",
				},
				{
					src: "/week-2/5.webp",
					caption: "Celebrating our recycling success together!",
				},
			],
		},
		{
			day: "Day 1",
			title: "Less Plastic",
			images: [
				{
					src: "/day-1/1.webp",
					caption:
						"Product Support team shows off reusable bottles together on Day 1 🌱",
				},
				{
					src: "/day-1/4.webp",
					caption: "Zero-plastic setup with digital tools and sustainable sips",
				},
				{
					src: "/day-1/3.webp",
					caption: "Tackling work with green habits at the desk",
				},
				{
					src: "/day-1/5.webp",
					caption:
						"Morning routines with reusable bottles and no plastic in sight",
				},
				{
					src: "/day-1/6.webp",
					caption: "Kicking off with sustainable alternatives and a smile",
				},
				{
					src: "/day-1/9.webp",
					caption: "Nature-backed, plastic-free vibes",
				},
				{
					src: "/day-1/7.webp",
					caption: "Refilling, reusing, and refreshing — the eco-friendly way",
				},
				{
					src: "/day-1/8.webp",
					caption: "Productivity powered by conscious, waste-free habits",
				},
				{
					src: "/day-1/10.webp",
					caption: "Green desk energy in full force",
				},
				{
					src: "/day-1/11.webp",
					caption: "Work from nature's embrace",
				},
				{
					src: "/day-1/12.webp",
					caption: "Taking calls surrounded by nature's inspiration",
				},
				{
					src: "/day-1/2.webp",
					caption: "Stylish, reusable containers replacing single-use plastics",
				},
			],
		},
		{
			day: "Day 2",
			title: "Move with Less",
			images: [
				{
					src: "/day-2/1.webp",
					caption: "Morning kickoff with XanhSM's sustainable start",
				},
				{
					src: "/day-2/2.webp",
					caption: "XanhSM's green journey begins",
				},
				{
					src: "/day-2/3.webp",
					caption: "Metro's eco-conscious ride through the city",
				},
				{
					src: "/day-2/4.webp",
					caption: "Pedaling towards a greener tomorrow",
				},
				{
					src: "/day-2/5.webp",
					caption: "Two wheels, zero emissions, pure freedom",
				},
				{
					src: "/day-2/6.webp",
					caption: "Electric Bike: Powering sustainable mobility",
				},
				{
					src: "/day-2/7.webp",
					caption: "Silent revolution on electric wheels",
				},
				{
					src: "/day-2/8.webp",
					caption: "Charging forward with clean energy",
				},
				{
					src: "/day-2/9.webp",
					caption: "Cycling through nature's embrace",
				},
				{
					src: "/day-2/10.webp",
					caption: "Eco-friendly skies: Sustainable travel to nature's embrace",
				},
			],
		},
		{
			day: "Day 3",
			title: "Lunch the Reusable Way",
			images: [
				{
					src: "/day-3/1.webp",
					caption:
						"Leading by example: Mr. Thanh Nguyen demonstrates sustainable lunch practices",
				},
				{
					src: "/day-3/2.webp",
					caption:
						"Thi Thai embraces eco-friendly dining with her reusable container",
				},
				{
					src: "/day-3/3.webp",
					caption:
						"Team members enjoying their lunch in sugarcane pulp containers",
				},
				{
					src: "/day-3/4.webp",
					caption: "Khang Dang brings lunch from home in a reusable container",
				},
				{
					src: "/day-3/5.webp",
					caption:
						"Ms. Linh Nguyen combines work and lunch in nature's embrace",
				},
				{
					src: "/day-3/6.webp",
					caption: "Team member enjoying his lunch in ceramic bowls",
				},
			],
		},
	];

	return (
		<main className="flex min-h-screen flex-col items-center">
			{/* Header */}
			<Header />

			{/* Hero Section */}
			<motion.section
				id="hero"
				ref={heroRef}
				style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
				className="relative flex flex-col items-center justify-center w-full min-h-screen px-4 py-20 text-center bg-gradient-to-b from-green-50 to-white"
			>
				<HeroBackgroundEffect />

				<div className="max-w-4xl mx-auto relative z-10">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						<h1 className="text-4xl font-bold tracking-tight text-green-800 sm:text-5xl md:text-6xl">
							Go Green 2025
						</h1>
						<p className="mt-6 text-xl text-gray-600 sm:text-2xl">
							The Product Support team is proud to participate in the
							company-wide Go Green initiative for a sustainable future
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5, duration: 0.8 }}
						className="mt-12"
					>
						<p className="text-lg text-gray-600">
							We're excited to take part in the three key challenges: reducing
							plastic use, sustainable transportation, and zero-waste lunches.
						</p>
						<p className="mt-4 text-lg text-gray-600">
							Scroll down to see our journey through photos!
						</p>
					</motion.div>

					<motion.button
						onClick={scrollToGallery}
						className="mt-12 flex items-center justify-center mx-auto"
						initial={{ y: 0 }}
						animate={{ y: [0, 10, 0] }}
						transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
					>
						<ChevronDown className="w-10 h-10 text-green-600" />
					</motion.button>
				</div>
			</motion.section>

			{/* Impact Stats Section */}
			<ImpactStats />

			{/* Gallery Section */}
			<section
				id="gallery"
				ref={galleryRef}
				className="w-full py-20 px-4 bg-white"
			>
				<div className="max-w-7xl mx-auto">
					<motion.h2
						className="text-3xl font-bold text-center text-green-800 mb-16"
						initial={{ opacity: 0, y: 20 }}
						animate={isGalleryInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.6 }}
					>
						Our Green Journey
					</motion.h2>

					<div className="space-y-24">
						{/* Split for Week 2 */}
						<div className="flex items-center my-16">
							<div className="flex-grow border-t border-gray-300"></div>
							<span className="mx-6 text-xl font-semibold text-green-700 bg-white px-4 py-2 rounded shadow-sm">
								Week 2: Recycle Roundup
							</span>
							<div className="flex-grow border-t border-gray-300"></div>
						</div>

						{/* Week 2: Polaroid gallery for Recycle Roundup */}
						<PolaroidGallery
							day={challengeDays[0].day}
							title={challengeDays[0].title}
							images={challengeDays[0].images}
						/>

						{/* Split for Week 1 */}
						<div className="flex items-center my-16">
							<div className="flex-grow border-t border-gray-300"></div>
							<span className="mx-6 text-xl font-semibold text-green-700 bg-white px-4 py-2 rounded shadow-sm">
								Week 1: Live Green, Build Habits
							</span>
							<div className="flex-grow border-t border-gray-300"></div>
						</div>

						{/* Week 1: Day 1, Day 2, Day 3 galleries */}
						<StandardGrid
							day={challengeDays[1].day}
							title={challengeDays[1].title}
							images={challengeDays[1].images}
						/>
						<MasonryLayout
							day={challengeDays[2].day}
							title={challengeDays[2].title}
							images={challengeDays[2].images}
						/>
						<CarouselGallery
							day={challengeDays[3].day}
							title={challengeDays[3].title}
							images={challengeDays[3].images}
						/>
					</div>
				</div>
			</section>

			{/* Team Members Section */}
			<TeamSection />

			{/* Join Challenge Section */}
			<JoinChallenge />

			{/* Testimonials Section */}
			<Testimonials />

			{/* Footer */}
			<footer className="w-full py-8 bg-green-50/70">
				<div className="max-w-7xl mx-auto px-4 text-center">
					<p className="text-gray-600">Product Support Team @ Katalon</p>
				</div>
			</footer>
		</main>
	);
}
