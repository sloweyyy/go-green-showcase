"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Droplets, Leaf, Recycle, Truck } from "lucide-react";

interface StatProps {
	icon: React.ReactNode;
	value: number;
	label: string;
	suffix: string;
	delay: number;
}

function Stat({ icon, value, label, suffix, delay }: StatProps) {
	const [count, setCount] = useState(0);
	const controls = useAnimation();
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });

	useEffect(() => {
		if (isInView) {
			// Animate the counter
			let startTimestamp: number;
			const step = (timestamp: number) => {
				if (!startTimestamp) startTimestamp = timestamp;
				const progress = Math.min((timestamp - startTimestamp) / 2000, 1);
				setCount(Math.floor(progress * value));

				if (progress < 1) {
					window.requestAnimationFrame(step);
				}
			};

			// Delay the animation start based on the delay prop
			setTimeout(() => {
				window.requestAnimationFrame(step);
				controls.start({
					scale: [0.5, 1.1, 1],
					opacity: [0, 1],
					transition: {
						duration: 0.5,
						ease: "easeOut",
					},
				});
			}, delay);
		}
	}, [isInView, value, controls, delay]);

	return (
		<motion.div
			ref={ref}
			className="relative"
			initial={{ opacity: 0, scale: 0.5 }}
			animate={controls}
		>
			<div className="relative bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:-translate-y-1">
				<div className="bg-green-100 p-3 rounded-full inline-block mb-4">
					{icon}
				</div>
				<h3 className="text-4xl font-bold text-gray-800">
					{count}
					{suffix}
				</h3>
				<p className="text-gray-600 mt-2">{label}</p>
			</div>
		</motion.div>
	);
}

export default function ImpactStats() {
	return (
		<section className="py-20 bg-green-50/50">
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.1 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<h2 className="text-3xl font-bold text-green-800">Our Impact</h2>
					<p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
						Together, our small actions as part of the Go Green initiative are
						making a difference. Here's how our team's participation is
						contributing to a greener future.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					<Stat
						icon={<Recycle className="h-6 w-6 text-green-600" />}
						value={30}
						label="Plastic items saved"
						suffix=""
						delay={0}
					/>
					<Stat
						icon={<Truck className="h-6 w-6 text-green-600" />}
						value={50}
						label="CO2 kg reduced"
						suffix="kg"
						delay={250}
					/>
					<Stat
						icon={<Droplets className="h-6 w-6 text-green-600" />}
						value={30}
						label="Liters of water saved"
						suffix="L"
						delay={500}
					/>
					<Stat
						icon={<Leaf className="h-6 w-6 text-green-600" />}
						value={100}
						label="Team participation rate"
						suffix="%"
						delay={750}
					/>
				</div>

				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true, amount: 0.1 }}
					transition={{ duration: 0.6, delay: 0.5 }}
					className="mt-16 text-center"
				>
					<p className="text-gray-500 italic">
						Data collected from May 2025 to current date
					</p>
				</motion.div>
			</div>
		</section>
	);
}
