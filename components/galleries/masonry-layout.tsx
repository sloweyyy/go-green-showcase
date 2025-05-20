"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import ImageModal from "./image-modal";

type GalleryImage = {
	src: string;
	caption: string;
};

interface MasonryLayoutProps {
	images: GalleryImage[];
	title: string;
	day: string;
}

export default function MasonryLayout({
	images,
	title,
	day,
}: MasonryLayoutProps) {
	const [imagesLoaded, setImagesLoaded] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const [columns, setColumns] = useState<GalleryImage[][]>([[], [], []]);
	const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

	// Distribute images into columns for masonry effect
	useEffect(() => {
		const arrangeItems = () => {
			// Reset columns
			const newColumns: GalleryImage[][] = [[], [], []];
			const numColumns =
				window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;

			// Distribute items among columns
			images.forEach((image, index) => {
				const columnIndex = index % numColumns;
				newColumns[columnIndex].push(image);
			});

			setColumns(newColumns.slice(0, numColumns));
			setImagesLoaded(true);
		};

		arrangeItems();
		window.addEventListener("resize", arrangeItems);

		return () => {
			window.removeEventListener("resize", arrangeItems);
		};
	}, [images]);

	// Animations
	const containerVariants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.3,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 50 },
		show: {
			opacity: 1,
			y: 0,
			transition: {
				type: "spring",
				stiffness: 100,
				damping: 15,
			},
		},
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

			<motion.div
				ref={containerRef}
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
				variants={containerVariants}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, amount: 0.1 }}
			>
				{columns.map((column, colIndex) => (
					<div key={colIndex} className="flex flex-col space-y-6">
						{column.map((image, imgIndex) => (
							<motion.div
								key={`${colIndex}-${imgIndex}`}
								className="overflow-hidden rounded-lg shadow-md bg-white dark:bg-gray-800 group cursor-pointer"
								variants={itemVariants}
								whileHover={{
									y: -5,
									boxShadow:
										"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
									transition: { duration: 0.2 },
								}}
								onClick={() => setSelectedImage(image)}
							>
								<div
									className="relative w-full"
									style={{
										// Random heights for masonry effect
										height: `${Math.floor(
											Math.random() * (400 - 240) + 240
										)}px`,
									}}
								>
									<Image
										src={image.src || "/placeholder.svg"}
										alt=""
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
										className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
										placeholder="blur"
										blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJXP+j84QAAAABJRU5ErkJggg=="
									/>
									<div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
									<div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
										<p className="text-sm font-medium">{image.caption}</p>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				))}
			</motion.div>

			{selectedImage && (
				<ImageModal
					image={selectedImage}
					onClose={() => setSelectedImage(null)}
				/>
			)}
		</div>
	);
}
