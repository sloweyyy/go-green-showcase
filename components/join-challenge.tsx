"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MessageSquare } from "lucide-react";

export default function JoinChallenge() {
	const [formState, setFormState] = useState({
		name: "",
		division: "",
		message: "",
	});

	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const divisions = [
		"PRODUCT",
		"REVENUE",
		"MARKETING",
		"TECHNOLOGY",
		"LEGAL",
		"FINANCE",
		"OPERATIONS",
	];

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;
		setFormState((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError(null);

		try {
			const response = await fetch("/api/comments", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formState),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Something went wrong");
			}

			setIsSubmitted(true);
			setFormState({
				name: "",
				division: "",
				message: "",
			});
		} catch (error) {
			console.error("Error submitting comment:", error);
			setError(
				error instanceof Error ? error.message : "Failed to submit comment"
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section id="join" className="py-20 bg-white">
			<div className="container mx-auto px-4">
				<div className="max-w-6xl mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.6 }}
						>
							<h2 className="text-3xl font-bold text-green-800 mb-6">
								Product Support Feedback
							</h2>
							<p className="text-lg text-gray-600 mb-8">
								Share your thoughts with our product support team about our
								participation in the Go Green 2025 initiative. Your feedback
								helps us improve our involvement and better connect with other
								teams.
							</p>

							<div className="space-y-4">
								<div className="flex items-start">
									<MessageSquare className="h-6 w-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
									<p className="text-gray-700">
										Share your experiences with the initiative
									</p>
								</div>
								<div className="flex items-start">
									<MessageSquare className="h-6 w-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
									<p className="text-gray-700">
										Suggest improvements for sustainability practices
									</p>
								</div>
								<div className="flex items-start">
									<MessageSquare className="h-6 w-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
									<p className="text-gray-700">
										Help us identify challenges in implementation
									</p>
								</div>
								<div className="flex items-start">
									<MessageSquare className="h-6 w-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
									<p className="text-gray-700">
										Your comments will be shared in our testimonials section
									</p>
								</div>
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="bg-white rounded-xl shadow-lg p-6 md:p-8"
						>
							{isSubmitted ? (
								<div className="text-center py-12">
									<motion.div
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										transition={{
											type: "spring",
											stiffness: 260,
											damping: 20,
										}}
										className="flex justify-center mb-6"
									>
										<div className="bg-green-100 rounded-full p-4">
											<CheckCircle2 className="h-12 w-12 text-green-600" />
										</div>
									</motion.div>
									<h3 className="text-xl font-bold text-gray-800 mb-3">
										Thank you for your feedback!
									</h3>
									<p className="text-gray-600 mb-6">
										We appreciate your contribution to our team's participation
										in the Go Green 2025 campaign. The product support team will
										review your comment.
									</p>
									<button
										onClick={() => setIsSubmitted(false)}
										className="text-green-600 font-medium hover:underline"
									>
										Submit another comment
									</button>
								</div>
							) : (
								<>
									<h3 className="text-xl font-bold text-gray-800 mb-6">
										Share Your Feedback
									</h3>
									{error && (
										<div className="mb-6 p-3 bg-red-100 text-red-700 rounded-md">
											{error}
										</div>
									)}
									<form onSubmit={handleSubmit} className="space-y-4">
										<div>
											<label
												htmlFor="name"
												className="block text-sm font-medium text-gray-700 mb-1"
											>
												Your Name
											</label>
											<input
												type="text"
												id="name"
												name="name"
												value={formState.name}
												onChange={handleChange}
												required
												className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none bg-white text-gray-900"
											/>
										</div>

										<div>
											<label
												htmlFor="division"
												className="block text-sm font-medium text-gray-700 mb-1"
											>
												Division
											</label>
											<select
												id="division"
												name="division"
												value={formState.division}
												onChange={handleChange}
												required
												className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none bg-white text-gray-900"
											>
												<option value="" disabled>
													Select your division
												</option>
												{divisions.map((division) => (
													<option key={division} value={division}>
														{division}
													</option>
												))}
											</select>
										</div>

										<div>
											<label
												htmlFor="message"
												className="block text-sm font-medium text-gray-700 mb-1"
											>
												Your Comment
											</label>
											<textarea
												id="message"
												name="message"
												value={formState.message}
												onChange={handleChange}
												rows={4}
												required
												className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none bg-white text-gray-900"
											/>
										</div>

										<motion.button
											type="submit"
											disabled={isSubmitting}
											className="w-full flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 text-white font-medium rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
										>
											{isSubmitting ? (
												<span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
											) : null}
											{isSubmitting ? "Submitting..." : "Submit Comment"}
											{!isSubmitting && <ArrowRight className="ml-2 h-5 w-5" />}
										</motion.button>
									</form>
								</>
							)}
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}
