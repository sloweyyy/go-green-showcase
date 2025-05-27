import React from "react";
import Image from "next/image";

interface CollageGalleryProps {
	day: string;
	title: string;
	images: { src: string; caption: string }[];
}

const CollageGallery: React.FC<CollageGalleryProps> = ({
	day,
	title,
	images,
}) => {
	return (
		<section className="w-full mb-12">
			<div className="mb-8 text-center">
				<h3 className="text-2xl font-bold text-green-800">
					{day}: {title}
				</h3>
			</div>
			<div className="relative grid grid-cols-6 grid-rows-3 gap-4 collage-gallery">
				{images.slice(0, 5).map((img, idx) => (
					<div
						key={img.src}
						className={`relative overflow-hidden rounded-lg shadow-lg group collage-item collage-item-${idx}`}
					>
						<Image
							src={img.src}
							alt={img.caption}
							fill
							className="object-cover transition-transform duration-300 group-hover:scale-105"
							sizes="(max-width: 768px) 100vw, 33vw"
						/>
						<div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
							<span className="text-white text-sm font-medium drop-shadow-lg">
								{img.caption}
							</span>
						</div>
					</div>
				))}
			</div>
			<style jsx>{`
				.collage-gallery {
					min-height: 400px;
				}
				.collage-item-0 {
					grid-column: 1 / span 3;
					grid-row: 1 / span 2;
					z-index: 2;
				}
				.collage-item-1 {
					grid-column: 4 / span 3;
					grid-row: 1 / span 1;
					z-index: 1;
				}
				.collage-item-2 {
					grid-column: 4 / span 2;
					grid-row: 2 / span 2;
					z-index: 3;
				}
				.collage-item-3 {
					grid-column: 1 / span 2;
					grid-row: 3 / span 1;
					z-index: 1;
				}
				.collage-item-4 {
					grid-column: 3 / span 2;
					grid-row: 3 / span 1;
					z-index: 2;
				}
				@media (max-width: 900px) {
					.collage-gallery {
						grid-template-columns: repeat(2, 1fr);
						grid-template-rows: repeat(5, 120px);
					}
					.collage-item-0 {
						grid-column: 1 / span 2;
						grid-row: 1 / span 2;
					}
					.collage-item-1 {
						grid-column: 1 / span 1;
						grid-row: 3 / span 1;
					}
					.collage-item-2 {
						grid-column: 2 / span 1;
						grid-row: 3 / span 2;
					}
					.collage-item-3 {
						grid-column: 1 / span 1;
						grid-row: 4 / span 1;
					}
					.collage-item-4 {
						grid-column: 2 / span 1;
						grid-row: 5 / span 1;
					}
				}
			`}</style>
		</section>
	);
};

export default CollageGallery;
