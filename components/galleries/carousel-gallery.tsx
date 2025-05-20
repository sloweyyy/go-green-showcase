"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ImageModal from "./image-modal";

type GalleryImage = {
	src: string;
	caption: string;
};

interface CarouselGalleryProps {
	images: GalleryImage[];
	title: string;
	day: string;
}

export default function CarouselGallery({
	images,
	title,
	day,
}: CarouselGalleryProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [direction, setDirection] = useState(0);
	const [autoPlay, setAutoPlay] = useState(true);
	const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

	// Auto rotate images
	useEffect(() => {
		if (!autoPlay) return;

		const interval = setInterval(() => {
			setDirection(1);
			setCurrentIndex((prev) => (prev + 1) % images.length);
		}, 5000);

		return () => clearInterval(interval);
	}, [autoPlay, images.length]);

	// Pause autoplay on hover
	const pauseAutoPlay = () => setAutoPlay(false);
	const resumeAutoPlay = () => setAutoPlay(true);

	const handleNext = () => {
		setAutoPlay(false);
		setDirection(1);
		setCurrentIndex((prev) => (prev + 1) % images.length);
	};

	const handlePrevious = () => {
		setAutoPlay(false);
		setDirection(-1);
		setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
	};

	const handleDotClick = (index: number) => {
		setAutoPlay(false);
		setDirection(index > currentIndex ? 1 : -1);
		setCurrentIndex(index);
	};

	const slideVariants = {
		enter: (direction: number) => ({
			x: direction > 0 ? 1000 : -1000,
			opacity: 0,
		}),
		center: {
			x: 0,
			opacity: 1,
		},
		exit: (direction: number) => ({
			x: direction > 0 ? -1000 : 1000,
			opacity: 0,
		}),
	};

	return (
		<div className="space-y-8">
			<motion.div
				className="text-center"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.1 }}
				transition={{ duration: 0.6 }}
			>
				<span className="inline-block px-4 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-medium mb-2">
					{day}
				</span>
				<h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
					{title}
				</h3>
			</motion.div>

			<div
				className="relative aspect-[16/9] w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl"
				onMouseEnter={pauseAutoPlay}
				onMouseLeave={resumeAutoPlay}
			>
				{/* Carousel */}
				<div className="relative w-full h-full">
					<AnimatePresence initial={false} custom={direction}>
						<motion.div
							key={currentIndex}
							className="absolute inset-0"
							custom={direction}
							variants={slideVariants}
							initial="enter"
							animate="center"
							exit="exit"
							transition={{
								x: { type: "spring", stiffness: 300, damping: 30 },
								opacity: { duration: 0.2 },
							}}
						>
							<div
								className="relative w-full h-full cursor-pointer"
								onClick={() => setSelectedImage(images[currentIndex])}
							>
								<Image
									src={images[currentIndex].src || "/placeholder.svg"}
									alt=""
									fill
									className="object-cover"
									sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 1200px"
									priority
									placeholder="blur"
									blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJXP+j84QAAAABJRU5ErkJggg=="
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
								<div className="absolute bottom-0 left-0 w-full p-6 text-white">
									<h4 className="text-xl md:text-2xl font-bold mb-2">
										{images[currentIndex].caption}
									</h4>
								</div>
							</div>
						</motion.div>
					</AnimatePresence>

					{/* Navigation arrows */}
					<button
						onClick={handlePrevious}
						className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 transition-colors rounded-full p-2 text-white z-10"
						aria-label="Previous slide"
					>
						<ChevronLeft size={24} />
					</button>
					<button
						onClick={handleNext}
						className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 transition-colors rounded-full p-2 text-white z-10"
						aria-label="Next slide"
					>
						<ChevronRight size={24} />
					</button>
				</div>

				{/* Pagination dots */}
				<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2 z-10">
					{images.map((_, index) => (
						<button
							key={index}
							onClick={() => handleDotClick(index)}
							className={`w-2.5 h-2.5 rounded-full transition-all ${
								index === currentIndex
									? "bg-white scale-125"
									: "bg-white/50 hover:bg-white/80"
							}`}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div>
			</div>

			{selectedImage && (
				<ImageModal
					image={selectedImage}
					onClose={() => setSelectedImage(null)}
				/>
			)}
		</div>
	);
}
