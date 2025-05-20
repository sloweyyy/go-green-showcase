"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
	name: string;
	role: string;
	quote: string;
}

interface Comment {
	_id: string;
	name: string;
	division: string;
	message: string;
	createdAt: string;
}

export default function Testimonials() {
	const [comments, setComments] = useState<Comment[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Fetch comments from API
	useEffect(() => {
		async function fetchComments() {
			try {
				const response = await fetch("/api/comments");
				if (!response.ok) {
					throw new Error("Failed to fetch comments");
				}
				const data = await response.json();
				setComments(data.comments);
			} catch (err) {
				setError("Could not load comments. Please try again later.");
				console.error("Error fetching comments:", err);
			} finally {
				setIsLoading(false);
			}
		}

		fetchComments();
	}, []);

	// Default testimonials as fallback
	const defaultTestimonials: Testimonial[] = [
		{
			name: "Emma Davis",
			role: "PRODUCT",
			quote:
				"The Go Green challenge has completely changed how I think about waste. I've reduced my daily plastic use by 90% and it's become second nature now.",
		},
		{
			name: "Mike Chen",
			role: "TECHNOLOGY",
			quote:
				"Participating in the 'Move with Less' day inspired me to start biking to work twice a week. I feel healthier, and it's a great way to start the day!",
		},
		{
			name: "Priya Sharma",
			role: "MARKETING",
			quote:
				"The most valuable part of this challenge has been seeing how small changes, when adopted by a whole team, can make a significant environmental impact.",
		},
		{
			name: "James Wilson",
			role: "OPERATIONS",
			quote:
				"I was skeptical at first, but the reusable lunch challenge showed me how much waste I was creating. Now I bring my own containers everywhere!",
		},
	];

	// Combine comments from API with default testimonials
	const allTestimonials = [
		...comments.map((comment) => ({
			name: comment.name,
			role: comment.division,
			quote: comment.message,
		})),
		...(comments.length === 0 && !isLoading ? defaultTestimonials : []),
	];

	const [current, setCurrent] = useState(0);
	const [direction, setDirection] = useState(0);

	const next = () => {
		setDirection(1);
		setCurrent((current + 1) % allTestimonials.length);
	};

	const prev = () => {
		setDirection(-1);
		setCurrent((current - 1 + allTestimonials.length) % allTestimonials.length);
	};

	const variants = {
		enter: (direction: number) => ({
			x: direction > 0 ? 1000 : -1000,
			opacity: 0,
		}),
		center: {
			x: 0,
			opacity: 1,
		},
		exit: (direction: number) => ({
			x: direction < 0 ? 1000 : -1000,
			opacity: 0,
		}),
	};

	return (
		<section id="testimonials" className="py-20 bg-green-50/50">
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.1 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<h2 className="text-3xl font-bold text-green-800">Testimonials</h2>
					<p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
						Hear what our team members have to say about their Go Green 2025
						experience.
					</p>
				</motion.div>

				{isLoading ? (
					<div className="text-center py-16">
						<div className="inline-block h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
						<p className="mt-4 text-gray-600">Loading comments...</p>
					</div>
				) : error ? (
					<div className="text-center py-16">
						<p className="text-red-500">{error}</p>
					</div>
				) : allTestimonials.length > 0 ? (
					<div className="max-w-3xl mx-auto relative">
						<div className="absolute -left-8 md:-left-12 top-1/2 -translate-y-1/2 z-10">
							<button
								onClick={prev}
								className="bg-white rounded-full p-2 md:p-3 shadow-md hover:shadow-lg transition-shadow text-gray-700 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
								aria-label="Previous testimonial"
							>
								<ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
							</button>
						</div>

						<div className="relative overflow-hidden bg-white rounded-xl shadow-md min-h-[280px]">
							<AnimatePresence initial={false} custom={direction} mode="wait">
								<motion.div
									key={current}
									custom={direction}
									variants={variants}
									initial="enter"
									animate="center"
									exit="exit"
									transition={{
										x: { type: "spring", stiffness: 300, damping: 30 },
										opacity: { duration: 0.3 },
									}}
									className="absolute inset-0 flex flex-col justify-center p-6 md:p-10"
								>
									<Quote className="text-green-500 h-8 w-8 mb-4" />
									<p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
										"{allTestimonials[current].quote}"
									</p>
									<div>
										<h4 className="text-lg font-bold text-gray-900">
											{allTestimonials[current].name}
										</h4>
										<p className="text-green-600">
											{allTestimonials[current].role}
										</p>
									</div>
								</motion.div>
							</AnimatePresence>
						</div>

						<div className="absolute -right-8 md:-right-12 top-1/2 -translate-y-1/2 z-10">
							<button
								onClick={next}
								className="bg-white rounded-full p-2 md:p-3 shadow-md hover:shadow-lg transition-shadow text-gray-700 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
								aria-label="Next testimonial"
							>
								<ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
							</button>
						</div>

						<div className="mt-8 flex justify-center space-x-2">
							{allTestimonials.map((_, index) => (
								<button
									key={index}
									onClick={() => {
										setDirection(index > current ? 1 : -1);
										setCurrent(index);
									}}
									className={`w-2.5 h-2.5 rounded-full transition-all ${
										index === current
											? "bg-green-600 scale-125"
											: "bg-gray-300 hover:bg-green-400"
									}`}
									aria-label={`Go to testimonial ${index + 1}`}
								/>
							))}
						</div>
					</div>
				) : (
					<div className="text-center py-16">
						<p className="text-gray-600">
							No comments yet. Be the first to share your experience!
						</p>
					</div>
				)}
			</div>
		</section>
	);
}
