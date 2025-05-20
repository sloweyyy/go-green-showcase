"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin } from "lucide-react";

interface TeamMember {
	name: string;
	aka?: string;
	image: string;
}

export default function TeamSection() {
	const teamMembers: TeamMember[] = [
		{
			name: "Thanh Nguyen",
			aka: "Mr. Thanh Nguyen",
			image: "/team-members/thanh-nguyen.jpg",
		},
		{
			name: "Linh Nguyen",
			aka: "Goretti",
			image: "/team-members/linh-nguyen.jpg",
		},
		{
			name: "Loan Tran",
			aka: "Vicky",
			image: "/team-members/loan-tran.jpg",
		},
		{
			name: "Vi Kim",
			aka: "Liam",
			image: "/team-members/vi-kim.jpg",
		},
		{
			name: "Khang Dang",
			aka: "Oliver",
			image: "/team-members/khang-dang.jpg",
		},
		{
			name: "Thi Thai",
			aka: "Caryln",
			image: "/team-members/thi-thai.jpg",
		},
		{
			name: "Quan Trinh",
			aka: "Chris",
			image: "/team-members/quan-trinh.jpg",
		},
		{
			name: "Thanh Nguyen Phuong",
			aka: "Eve",
			image: "/team-members/thanh-nguyen-phuong.jpg",
		},
		{
			name: "Bhavyansh Ameta",
			aka: "Bhavyansh",
			image: "/team-members/bhavyansh-ameta.jpg",
		},
		{
			name: "Jordan Bartley",
			aka: "Jordan",
			image: "/team-members/jordan-bartley.jpg",
		},
		{
			name: "Mohammed Jabir",
			aka: "Jabir",
			image: "/team-members/mohammed-jabir.jpg",
		},
		{
			name: "Quoc Le",
			aka: "Max",
			image: "/team-members/quoc-le.jpg",
		},
		{
			name: "Phuc Truong",
			aka: "Slowey",
			image: "/team-members/phuc-truong.jpg",
		},
		{
			name: "Chi Nguyen",
			aka: "Julia",
			image: "/team-members/chi-nguyen.jpg",
		},
	];

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.15,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 50, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				type: "spring",
				stiffness: 100,
				damping: 20,
			},
		},
	};

	return (
		<section id="team" className="py-20 bg-green-50/50">
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.1 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<h2 className="text-3xl font-bold text-green-800">Our Team</h2>
					<p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
						Meet the dedicated members of our Product Support team who are
						driving the Go Green 2025 campaign.
					</p>
				</motion.div>

				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.1 }}
				>
					{teamMembers.map((member, index) => (
						<motion.div
							key={index}
							className="bg-white rounded-xl shadow-sm overflow-hidden"
							variants={itemVariants}
							whileHover={{ y: -10, transition: { duration: 0.3 } }}
						>
							<div className="relative h-64 w-full bg-green-100/50">
								<Image
									src={member.image}
									alt={member.name}
									fill
									className="object-cover"
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
								<div className="absolute bottom-0 left-0 p-4 w-full">
									<div>
										<h3 className="text-xl font-bold text-white">
											{member.name}
										</h3>
										{member.aka && (
											<p className="text-green-300">{member.aka}</p>
										)}
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
