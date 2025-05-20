"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import ImageModal from "./image-modal";

type GalleryImage = {
	src: string;
	caption: string;
};

interface StandardGridProps {
	images: GalleryImage[];
	title: string;
	day: string;
}

export default function StandardGrid({
	images,
	title,
	day,
}: StandardGridProps) {
	const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

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

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{images.map((image, index) => (
					<motion.div
						key={index}
						className="overflow-hidden rounded-lg shadow-md bg-white dark:bg-gray-800 group cursor-pointer"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.1 * index }}
						whileHover={{
							y: -5,
							boxShadow:
								"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
							transition: { duration: 0.2 },
						}}
						onClick={() => setSelectedImage(image)}
					>
						<div className="relative h-64 w-full overflow-hidden">
							<Image
								src={image.src || "/placeholder.svg"}
								alt=""
								fill
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
								className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
								placeholder="blur"
								blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJXP+j84QAAAABJRU5ErkJggg=="
								onError={(e) => {
									const target = e.target as HTMLImageElement;
									target.src = "/placeholder.svg";
								}}
							/>
							<div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
							<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								<motion.div
									className="bg-green-600 text-white text-sm py-1 px-3 rounded-full font-medium"
									initial={{ scale: 0.8 }}
									whileHover={{ scale: 1 }}
								>
									View
								</motion.div>
							</div>
						</div>
						<div className="p-4">
							<p className="text-sm text-gray-600 dark:text-gray-300">
								{image.caption}
							</p>
						</div>
					</motion.div>
				))}
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
