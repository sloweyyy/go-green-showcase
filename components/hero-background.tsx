"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

type Particle = {
	x: number;
	y: number;
	size: number;
	speedX: number;
	speedY: number;
	opacity: number;
};

export default function HeroBackgroundEffect() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const { theme, systemTheme } = useTheme();
	const [isInitialized, setIsInitialized] = useState(false);

	// Get current theme safely
	const currentTheme = theme === "system" ? systemTheme : theme;

	useEffect(() => {
		try {
			const canvas = canvasRef.current;
			if (!canvas) return;

			const ctx = canvas.getContext("2d");
			if (!ctx) return;

			// Set canvas dimensions
			const resizeCanvas = () => {
				try {
					canvas.width = window.innerWidth;
					canvas.height = window.innerHeight;
				} catch (error) {
					console.error("Error resizing canvas:", error);
				}
			};

			window.addEventListener("resize", resizeCanvas);
			resizeCanvas();
			setIsInitialized(true);

			// Particle settings - reduce count for better performance
			const particleCount = Math.min(window.innerWidth / 20, 50);
			const particles: Particle[] = [];

			// Initialize particles
			for (let i = 0; i < particleCount; i++) {
				particles.push({
					x: Math.random() * canvas.width,
					y: Math.random() * canvas.height,
					size: Math.random() * 3 + 1, // Smaller particles
					speedX: (Math.random() - 0.5) * 0.3, // Slower movement
					speedY: (Math.random() - 0.5) * 0.3,
					opacity: Math.random() * 0.3 + 0.1, // Less opacity
				});
			}

			// Animation loop
			let animationFrameId: number;
			let mouseX = 0;
			let mouseY = 0;

			const render = () => {
				try {
					ctx.clearRect(0, 0, canvas.width, canvas.height);

					// Draw particles
					particles.forEach((particle, index) => {
						// Move particle
						particle.x += particle.speedX;
						particle.y += particle.speedY;

						// Wrap around edges
						if (particle.x > canvas.width) particle.x = 0;
						else if (particle.x < 0) particle.x = canvas.width;

						if (particle.y > canvas.height) particle.y = 0;
						else if (particle.y < 0) particle.y = canvas.height;

						// Interactive effect with mouse - reduced effect
						const dx = mouseX - particle.x;
						const dy = mouseY - particle.y;
						const distance = Math.sqrt(dx * dx + dy * dy);
						const maxDistance = 100;

						if (distance < maxDistance) {
							const forceFactor = (maxDistance - distance) / maxDistance;
							particle.speedX -= dx * forceFactor * 0.005;
							particle.speedY -= dy * forceFactor * 0.005;
							particle.opacity = Math.min(particle.opacity + 0.05, 0.5);
						}

						// Limit speed
						const maxSpeed = 0.7;
						const speed = Math.sqrt(
							particle.speedX * particle.speedX +
								particle.speedY * particle.speedY
						);
						if (speed > maxSpeed) {
							particle.speedX = (particle.speedX / speed) * maxSpeed;
							particle.speedY = (particle.speedY / speed) * maxSpeed;
						}

						// Draw particle
						ctx.beginPath();
						ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
						ctx.fillStyle =
							currentTheme === "dark"
								? `rgba(76, 175, 80, ${particle.opacity})`
								: `rgba(39, 174, 96, ${particle.opacity})`;
						ctx.fill();

						// Connect particles - reduced connections
						for (let j = index + 1; j < particles.length; j += 2) {
							const otherParticle = particles[j];
							const dx = particle.x - otherParticle.x;
							const dy = particle.y - otherParticle.y;
							const distance = Math.sqrt(dx * dx + dy * dy);

							if (distance < 80) {
								ctx.beginPath();
								ctx.moveTo(particle.x, particle.y);
								ctx.lineTo(otherParticle.x, otherParticle.y);
								ctx.strokeStyle =
									currentTheme === "dark"
										? `rgba(76, 175, 80, ${0.1 * (1 - distance / 80)})`
										: `rgba(39, 174, 96, ${0.1 * (1 - distance / 80)})`;
								ctx.stroke();
							}
						}
					});

					animationFrameId = window.requestAnimationFrame(render);
				} catch (error) {
					console.error("Error in animation loop:", error);
					window.cancelAnimationFrame(animationFrameId);
				}
			};

			const handleMouseMove = (e: MouseEvent) => {
				mouseX = e.clientX;
				mouseY = e.clientY;
			};

			window.addEventListener("mousemove", handleMouseMove);
			render();

			return () => {
				window.removeEventListener("resize", resizeCanvas);
				window.removeEventListener("mousemove", handleMouseMove);
				window.cancelAnimationFrame(animationFrameId);
			};
		} catch (error) {
			console.error("Error initializing hero background:", error);
		}
	}, [currentTheme]);

	return (
		<>
			{isInitialized && (
				<canvas
					ref={canvasRef}
					className="absolute inset-0 w-full h-full pointer-events-none"
					aria-hidden="true"
				/>
			)}
		</>
	);
}
