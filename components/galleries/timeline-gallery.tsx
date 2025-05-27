import React from "react";
import Image from "next/image";

interface TimelineGalleryProps {
	day: string;
	title: string;
	images: { src: string; caption: string }[];
}

const TimelineGallery: React.FC<TimelineGalleryProps> = ({
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
			<div className="relative timeline-gallery mx-auto max-w-3xl">
				{/* Timeline vertical line */}
				<div className="absolute left-1/2 top-0 h-full w-1 bg-green-300 -translate-x-1/2 z-0" />
				<ul className="space-y-16 relative z-10">
					{images.map((img, idx) => (
						<li
							key={img.src}
							className={`flex flex-col md:flex-row items-center md:items-stretch ${
								idx % 2 === 0 ? "md:flex-row-reverse" : ""
							}`}
						>
							{/* Image */}
							<div
								className={`w-full md:w-1/2 px-4 mb-4 md:mb-0 flex justify-${
									idx % 2 === 0 ? "end" : "start"
								}`}
							>
								<div className="relative w-full h-56 md:w-72 md:h-48 rounded-lg overflow-hidden shadow-lg bg-gray-100 animate-fade-in">
									<Image
										src={img.src}
										alt={img.caption}
										fill
										className="object-cover"
										sizes="(max-width: 768px) 100vw, 33vw"
									/>
								</div>
							</div>
							{/* Timeline dot */}
							<div className="hidden md:flex flex-col items-center justify-center w-0 relative">
								<span className="w-5 h-5 rounded-full bg-green-500 border-4 border-white shadow-lg z-10" />
							</div>
							{/* Caption */}
							<div className="w-full md:w-1/2 px-4 flex items-center">
								<div className="bg-white/90 rounded-lg p-4 shadow-md animate-fade-in">
									<span className="text-gray-700 text-base font-medium">
										{img.caption}
									</span>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
			<style jsx>{`
				.timeline-gallery {
					padding-left: 0.5rem;
					padding-right: 0.5rem;
				}
				@media (max-width: 768px) {
					.timeline-gallery .md\\:flex-row-reverse {
						flex-direction: column !important;
					}
				}
				@keyframes fade-in {
					from {
						opacity: 0;
						transform: translateY(30px);
					}
					to {
						opacity: 1;
						transform: none;
					}
				}
				.animate-fade-in {
					animation: fade-in 0.8s ease;
				}
			`}</style>
		</section>
	);
};

export default TimelineGallery;
