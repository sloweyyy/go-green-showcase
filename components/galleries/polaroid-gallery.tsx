import React from "react";
import Image from "next/image";

interface PolaroidGalleryProps {
	day: string;
	title: string;
	images: { src: string; caption: string }[];
}

// Helper to generate a random rotation for each image
const rotations = [
	"-rotate-6",
	"rotate-3",
	"-rotate-3",
	"rotate-2",
	"-rotate-2",
	"rotate-1",
	"-rotate-1",
];

const PolaroidGallery: React.FC<PolaroidGalleryProps> = ({
	day,
	title,
	images,
}) => {
	return (
		<section className="w-full mb-12">
			<div className="flex flex-wrap justify-center gap-8 polaroid-gallery">
				{images.map((img, idx) => (
					<div
						key={img.src}
						className={`bg-white rounded-lg shadow-xl p-2 pb-6 flex flex-col items-center polaroid ${
							rotations[idx % rotations.length]
						} transition-transform duration-300 hover:scale-105`}
						style={{ width: 220 }}
					>
						<div className="relative w-[200px] h-[200px] mb-3 overflow-hidden rounded">
							<Image
								src={img.src}
								alt={img.caption}
								fill
								className="object-cover"
								sizes="200px"
							/>
						</div>
						<span className="mt-2 text-base text-gray-700 font-medium polaroid-caption">
							{img.caption}
						</span>
					</div>
				))}
			</div>
			<style jsx>{`
				.polaroid-gallery {
					min-height: 250px;
				}
				.polaroid {
					box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18),
						0 1.5px 4px rgba(0, 0, 0, 0.12);
					border: 2px solid #fff;
				}
				.polaroid-caption {
					font-family: "Patrick Hand", cursive, sans-serif;
					font-size: 1.05rem;
				}
				@media (max-width: 600px) {
					.polaroid {
						width: 140px !important;
					}
					.polaroid-gallery {
						gap: 1rem;
					}
				}
			`}</style>
			{/* Google Fonts for easy-to-read handwritten style */}
			<link
				href="https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap"
				rel="stylesheet"
			/>
		</section>
	);
};

export default PolaroidGallery;
