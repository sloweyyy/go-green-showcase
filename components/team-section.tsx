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
				staggerChildren: 0.05,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
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
		<section id="team" className="py-16 bg-green-50/50">
			<div className="container mx-auto px-4 max-w-7xl">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.1 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12"
				>
					<h2 className="text-3xl font-bold text-green-800">Our Team</h2>
					<p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
						Meet the dedicated members of our Product Support team who are
						participating in the Go Green 2025 campaign.
					</p>
				</motion.div>

				<motion.div
					className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.1 }}
				>
					{teamMembers.map((member, index) => (
						<motion.div
							key={index}
							className="bg-white rounded-md overflow-hidden border border-gray-100"
							variants={itemVariants}
							whileHover={{ y: -3, transition: { duration: 0.2 } }}
						>
							<div className="relative h-40 w-full bg-green-100/50">
								<Image
									src={member.image}
									alt={member.name}
									fill
									className="object-cover"
									sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 14.28vw"
								/>
							</div>
							<div className="p-2 text-center">
								<h3 className="text-sm font-medium text-gray-800 truncate">
									{member.name}
								</h3>
								{member.aka && (
									<p className="text-xs text-green-600">{member.aka}</p>
								)}
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
