"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, CirclePlay, ZoomIn } from "lucide-react";
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
	const [visibleImages, setVisibleImages] = useState<number[]>([]);
	const thumbsContainerRef = useRef<HTMLDivElement>(null);

	// Calculate visible thumbnails
	useEffect(() => {
		const calculateVisibleThumbs = () => {
			const allIndices = Array.from({ length: images.length }, (_, i) => i);
			setVisibleImages(allIndices);
		};
		calculateVisibleThumbs();
		window.addEventListener("resize", calculateVisibleThumbs);
		return () => window.removeEventListener("resize", calculateVisibleThumbs);
	}, [images.length]);

	// Auto rotate images
	useEffect(() => {
		if (!autoPlay) return;

		const interval = setInterval(() => {
			// Save current scroll position before changing image
			const scrollPosition = window.scrollY;
			setDirection(1);
			setCurrentIndex((prev) => (prev + 1) % images.length);
			// Restore scroll position after state update
			setTimeout(() => {
				window.scrollTo(0, scrollPosition);
			}, 10);
		}, 5000);

		return () => clearInterval(interval);
	}, [autoPlay, images.length]);

	// Scroll thumbnail into view when current index changes
	useEffect(() => {
		if (thumbsContainerRef.current) {
			// Save the main page scroll position
			const pageScrollPos = window.scrollY;

			const container = thumbsContainerRef.current;
			const thumbElement = container.children[currentIndex] as HTMLElement;

			if (thumbElement) {
				// Use scrollLeft instead of scrollIntoView to prevent page jumping
				const scrollLeft =
					thumbElement.offsetLeft -
					container.clientWidth / 2 +
					thumbElement.clientWidth / 2;

				container.scrollTo({
					left: scrollLeft,
					behavior: "smooth",
				});

				// Ensure page scroll position is maintained
				window.scrollTo(0, pageScrollPos);
			}
		}
	}, [currentIndex]);

	// Pause autoplay on hover
	const pauseAutoPlay = () => setAutoPlay(false);
	const resumeAutoPlay = () => setAutoPlay(true);

	const handleNext = () => {
		// Save scroll position
		const scrollPosition = window.scrollY;
		setAutoPlay(false);
		setDirection(1);
		setCurrentIndex((prev) => (prev + 1) % images.length);
		// Restore scroll position
		setTimeout(() => window.scrollTo(0, scrollPosition), 10);
	};

	const handlePrevious = () => {
		// Save scroll position
		const scrollPosition = window.scrollY;
		setAutoPlay(false);
		setDirection(-1);
		setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
		// Restore scroll position
		setTimeout(() => window.scrollTo(0, scrollPosition), 10);
	};

	const handleThumbClick = (index: number) => {
		// Save scroll position
		const scrollPosition = window.scrollY;
		setAutoPlay(false);
		setDirection(index > currentIndex ? 1 : -1);
		setCurrentIndex(index);
		// Restore scroll position
		setTimeout(() => window.scrollTo(0, scrollPosition), 10);
	};

	const slideVariants = {
		enter: (direction: number) => ({
			x: direction > 0 ? 500 : -500,
			opacity: 0,
		}),
		center: {
			x: 0,
			opacity: 1,
		},
		exit: (direction: number) => ({
			x: direction > 0 ? -500 : 500,
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

			<div className="flex flex-col w-full max-w-5xl mx-auto gap-4">
				{/* Main Carousel - Fixed height to prevent layout shifts */}
				<div
					className="relative aspect-[16/9] w-full rounded-xl overflow-hidden shadow-xl carousel-container"
					style={{ height: "500px" }} /* Fixed height prevents layout shifts */
					onMouseEnter={pauseAutoPlay}
					onMouseLeave={resumeAutoPlay}
				>
					<div className="relative w-full h-full">
						<AnimatePresence initial={false} custom={direction}>
							<motion.div
								key={currentIndex}
								className="absolute inset-0 will-change-transform"
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
									className="relative w-full h-full cursor-pointer group"
									onClick={() => setSelectedImage(images[currentIndex])}
								>
									<Image
										src={images[currentIndex].src || "/placeholder.svg"}
										alt=""
										fill
										className="object-cover carousel-zoom"
										sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 1200px"
										priority
										placeholder="blur"
										blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJXP+j84QAAAABJRU5ErkJggg=="
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
									<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
										<div className="bg-black/30 backdrop-blur-sm p-3 rounded-full">
											<ZoomIn size={40} className="text-white" />
										</div>
									</div>
									<div className="absolute bottom-0 left-0 w-full p-6 text-white">
										<h4 className="text-xl md:text-2xl font-bold mb-2">
											{images[currentIndex].caption}
										</h4>
										<div className="flex items-center space-x-2">
											<CirclePlay className="h-5 w-5" />
											<span className="text-sm">
												Image {currentIndex + 1} of {images.length}
											</span>
										</div>
									</div>
								</div>
							</motion.div>
						</AnimatePresence>

						{/* Navigation arrows */}
						<button
							onClick={handlePrevious}
							className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 transition-colors rounded-full p-3 text-white z-10 carousel-arrow"
							aria-label="Previous slide"
						>
							<ChevronLeft size={24} />
						</button>
						<button
							onClick={handleNext}
							className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 transition-colors rounded-full p-3 text-white z-10 carousel-arrow"
							aria-label="Next slide"
						>
							<ChevronRight size={24} />
						</button>
					</div>
				</div>

				{/* Thumbnails Gallery - Horizontal Scrollable */}
				<div className="overflow-x-auto pb-4 hide-scrollbar">
					<div ref={thumbsContainerRef} className="flex gap-4 min-w-max px-1">
						{visibleImages.map((index) => (
							<motion.div
								key={index}
								className={`relative h-24 w-36 md:h-28 md:w-44 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer thumbnail-hover ${
									index === currentIndex
										? "ring-3 ring-green-500 ring-offset-2 thumbnail-active"
										: "opacity-80"
								} transition-all duration-300 ease-in-out`}
								onClick={() => handleThumbClick(index)}
								whileHover={{
									y: -3,
									opacity: 1,
									scale: 1.03,
									transition: { duration: 0.2 },
								}}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: index === currentIndex ? 1 : 0.8, y: 0 }}
								transition={{ delay: index * 0.05 }}
							>
								<Image
									src={images[index].src || "/placeholder.svg"}
									alt=""
									fill
									className={`object-cover ${
										index === currentIndex ? "carousel-zoom" : ""
									}`}
									sizes="150px"
									placeholder="blur"
									blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJXP+j84QAAAABJRU5ErkJggg=="
								/>
								{index === currentIndex && (
									<motion.div
										className="absolute inset-0 border-2 border-white pointer-events-none"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
									/>
								)}
								<div className="absolute bottom-0 left-0 right-0 p-1 bg-gradient-to-t from-black/80 to-transparent">
									<p className="text-white text-xs truncate px-1">
										{index + 1}. {images[index].caption.substring(0, 20)}
										{images[index].caption.length > 20 ? "..." : ""}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>

				{/* Mobile-only pagination dots */}
				<div className="md:hidden flex items-center justify-center space-x-2 mt-2">
					{images.map((_, index) => (
						<button
							key={index}
							onClick={() => handleThumbClick(index)}
							className={`w-2.5 h-2.5 rounded-full transition-all ${
								index === currentIndex
									? "bg-green-500 scale-125"
									: "bg-gray-300 hover:bg-green-300"
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
