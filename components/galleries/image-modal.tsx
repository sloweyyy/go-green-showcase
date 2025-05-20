"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type GalleryImage = {
	src: string;
	caption: string;
};

interface ImageModalProps {
	image: GalleryImage | null;
	onClose: () => void;
}

export default function ImageModal({ image, onClose }: ImageModalProps) {
	if (!image) return null;

	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.2 }}
				className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
				onClick={handleBackdropClick}
			>
				<motion.div
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					exit={{ scale: 0.9, opacity: 0 }}
					transition={{ duration: 0.3 }}
					className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-lg overflow-hidden"
				>
					<div className="absolute top-4 right-4 z-10">
						<button
							onClick={onClose}
							className="bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
							aria-label="Close modal"
						>
							<X size={24} />
						</button>
					</div>

					<div className="relative aspect-auto w-full h-[80vh]">
						<Image
							src={image.src}
							alt=""
							fill
							className="object-contain"
							sizes="(max-width: 1200px) 100vw, 1200px"
							priority
						/>
					</div>

					{image.caption && (
						<div className="p-4 bg-white">
							<p className="text-lg text-gray-800">{image.caption}</p>
						</div>
					)}
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
}
