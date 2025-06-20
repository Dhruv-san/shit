"use client";
import { useState } from "react";

const faqs = [
	{
		q: "How does Cofindr match me with co-founders?",
		a: "Cofindr uses an advanced algorithm that considers your skills, industry, project interests, and personality traits to suggest highly compatible co-founder profiles. You can also manually browse and use the swipe feature.",
	},
	{
		q: "Is Cofindr free to use?",
		a: "Yes, Cofindr offers a robust free tier that allows you to create a profile, discover matches, and use core communication features. We may introduce premium features in the future for enhanced capabilities.",
	},
	{
		q: "What kind of information should I include in my profile?",
		a: "To maximize your chances, include detailed information about your skills, past experiences, current project ideas, what you're looking for in a co-founder (e.g., technical, marketing, operations), and any specific industries you're interested in.",
	},
	{
		q: "Can I chat with multiple potential co-founders at once?",
		a: "Absolutely! Cofindr supports both one-on-one personal chats and group chats, allowing you to connect and collaborate with multiple individuals or form a small team directly within the platform.",
	},
];

export default function LandingPage() {
	const [openFaq, setOpenFaq] = useState<number | null>(null);
	return (
		<div className="font-['Inter'] text-[#173B45] bg-[#F8EDED] min-h-screen">
			{/* Header */}
			<header className="bg-[#173B45] text-white py-4 shadow-lg">
				<div className="container mx-auto px-6 flex justify-between items-center">
					<span className="text-3xl font-extrabold text-[#FF8225] rounded-lg p-2 transition duration-200 hover:scale-105">
						Cofindr
					</span>
					<nav>
						<ul className="flex space-x-8">
							<li>
								<a
									href="#features"
									className="text-gray-200 hover:text-[#FF8225] font-medium rounded-md px-3 py-2 transition duration-200"
								>
									Features
								</a>
							</li>
							<li>
								<a
									href="#how-it-works"
									className="text-gray-200 hover:text-[#FF8225] font-medium rounded-md px-3 py-2 transition duration-200"
								>
									How it Works
								</a>
							</li>
							<li>
								<a
									href="#testimonials"
									className="text-gray-200 hover:text-[#FF8225] font-medium rounded-md px-3 py-2 transition duration-200"
								>
									Testimonials
								</a>
							</li>
							<li>
								<a
									href="#faq"
									className="text-gray-200 hover:text-[#FF8225] font-medium rounded-md px-3 py-2 transition duration-200"
								>
									FAQ
								</a>
							</li>
							<li>
								<a
									href="#cta"
									className="text-gray-200 hover:text-[#FF8225] font-medium rounded-md px-3 py-2 transition duration-200"
								>
									Get Started
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</header>

			{/* Hero Section */}
			<section className="bg-gradient-to-br from-[#B43F3F] to-[#FF8225] text-white py-24 md:py-36 text-center rounded-b-[4rem] shadow-xl overflow-hidden">
				<div className="container mx-auto px-6 max-w-5xl relative z-10">
					<h1 className="hero-title-main text-6xl sm:text-7xl md:text-8xl font-extrabold leading-tight mb-4">
						Co-fin
						<span className="text-[#173B45] drop-shadow-lg">dr</span>
					</h1>
					<p className="hero-title-sub text-2xl sm:text-3xl md:text-4xl font-light leading-tight mb-8">
						Find Your Perfect Co-founder. <br className="hidden sm:inline" />
						Build Your Dream Team.
					</p>
					<p className="hero-subtitle text-xl sm:text-2xl mb-12 opacity-95 leading-relaxed font-light">
						Cofindr is the ultimate platform designed to connect ambitious
						entrepreneurs with compatible co-founders who share their vision,
						skills, and drive. Stop searching, start building.
					</p>
					<a
						href="#cta"
						className="btn-primary text-white font-semibold py-4 px-10 rounded-full text-xl inline-block transition duration-300 ease-in-out"
						style={{
							background:
								'linear-gradient(to right, #B43F3F, #FF8225)',
							boxShadow: '0 4px 10px rgba(180, 63, 63, 0.3)',
						}}
					>
						Join Cofindr Today
					</a>
				</div>
			</section>

			{/* About Us / Our Mission Section */}
			<section
				id="about-us"
				className="py-20 md:py-32 bg-[#F8EDED] relative z-20 -mt-16 sm:-mt-24 md:-mt-32"
			>
				<div className="container mx-auto px-6 max-w-6xl text-center">
					<h2 className="text-3xl md:text-5xl font-bold mb-12 text-[#173B45]">
						Our Mission
					</h2>
					<p className="text-xl md:text-2xl leading-relaxed text-gray-700 max-w-3xl mx-auto">
						At Cofindr, we believe that every great idea deserves a strong team.
						Our mission is to empower entrepreneurs worldwide by making the
						co-founder search intelligent, efficient, and enjoyable. We're
						dedicated to fostering meaningful connections that lead to
						groundbreaking innovations and successful ventures.
					</p>
				</div>
			</section>

			{/* Features Section */}
			<section id="features" className="py-20 md:py-32 bg-[#F8EDED]">
				<div className="container mx-auto px-6 max-w-7xl">
					<h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-[#173B45]">
						Key Features That Drive Connections
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
						{/* Feature Cards */}
						<div
							className="feature-card p-10 text-center flex flex-col items-center"
							style={{
								backgroundColor: 'rgba(255,255,255,0.7)',
								border: '1px solid rgba(255,255,255,0.5)',
								backdropFilter: 'blur(8px)',
								boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
								borderRadius: '20px',
							}}
						>
							<div className="text-[#FF8225] text-6xl mb-6">💡</div>
							<h3 className="text-2xl font-bold mb-4 text-[#B43F3F]">
								Personalized Feed
							</h3>
							<p className="text-gray-700 leading-relaxed text-lg">
								Discover potential co-founders tailored to your industry, skills,
								and project needs through our intelligent matching algorithm.
							</p>
						</div>
						<div
							className="feature-card p-10 text-center flex flex-col items-center"
							style={{
								backgroundColor: 'rgba(255,255,255,0.7)',
								border: '1px solid rgba(255,255,255,0.5)',
								backdropFilter: 'blur(8px)',
								boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
								borderRadius: '20px',
							}}
						>
							<div className="text-[#FF8225] text-6xl mb-6">💬</div>
							<h3 className="text-2xl font-bold mb-4 text-[#B43F3F]">
								Seamless Personal Chat
							</h3>
							<p className="text-gray-700 leading-relaxed text-lg">
								Connect one-on-one with prospects. Discuss ideas, share insights,
								and gauge compatibility in real-time.
							</p>
						</div>
						<div
							className="feature-card p-10 text-center flex flex-col items-center"
							style={{
								backgroundColor: 'rgba(255,255,255,0.7)',
								border: '1px solid rgba(255,255,255,0.5)',
								backdropFilter: 'blur(8px)',
								boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
								borderRadius: '20px',
							}}
						>
							<div className="text-[#FF8225] text-6xl mb-6">👥</div>
							<h3 className="text-2xl font-bold mb-4 text-[#B43F3F]">
								Collaborative Group Chat
							</h3>
							<p className="text-gray-700 leading-relaxed text-lg">
								Form project groups, bring in multiple potential partners, and
								start building together from day one.
							</p>
						</div>
						<div
							className="feature-card p-10 text-center flex flex-col items-center"
							style={{
								backgroundColor: 'rgba(255,255,255,0.7)',
								border: '1px solid rgba(255,255,255,0.5)',
								backdropFilter: 'blur(8px)',
								boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
								borderRadius: '20px',
							}}
						>
							<div className="text-[#FF8225] text-6xl mb-6">➡️⬅️</div>
							<h3 className="text-2xl font-bold mb-4 text-[#B43F3F]">
								Intuitive Swipe Feature
							</h3>
							<p className="text-gray-700 leading-relaxed text-lg">
								Quickly browse profiles and express interest with a simple swipe,
								making the discovery process efficient and fun.
							</p>
						</div>
						<div
							className="feature-card p-10 text-center flex flex-col items-center"
							style={{
								backgroundColor: 'rgba(255,255,255,0.7)',
								border: '1px solid rgba(255,255,255,0.5)',
								backdropFilter: 'blur(8px)',
								boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
								borderRadius: '20px',
							}}
						>
							<div className="text-[#FF8225] text-6xl mb-6">💾</div>
							<h3 className="text-2xl font-bold mb-4 text-[#B43F3F]">
								Organize Saved Profiles
							</h3>
							<p className="text-gray-700 leading-relaxed text-lg">
								Keep track of interesting profiles. Save them for later review and
								easily revisit your top choices.
							</p>
						</div>
						<div
							className="feature-card p-10 text-center flex flex-col items-center"
							style={{
								backgroundColor: 'rgba(255,255,255,0.7)',
								border: '1px solid rgba(255,255,255,0.5)',
								backdropFilter: 'blur(8px)',
								boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
								borderRadius: '20px',
							}}
						>
							<div className="text-[#FF8225] text-6xl mb-6">🚀</div>
							<h3 className="text-2xl font-bold mb-4 text-[#B43F4F]">
								Continuously Evolving
							</h3>
							<p className="text-gray-700 leading-relaxed text-lg">
								We're constantly adding new tools and features to enhance your
								co-founder search and collaboration experience.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* How It Works Section */}
			<section id="how-it-works" className="py-20 md:py-32 bg-[#F8EDED]">
				<div className="container mx-auto px-6 max-w-6xl text-center">
					<h2 className="text-3xl md:text-5xl font-bold mb-16 text-[#173B45]">
						How Cofindr Works
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-10">
						{[1, 2, 3].map((step) => (
							<div
								key={step}
								className="how-it-works-card p-8 flex flex-col items-center"
								style={{
									backgroundColor: 'rgba(255,255,255,0.8)',
									border: '1px solid rgba(255,255,255,0.6)',
									backdropFilter: 'blur(6px)',
									boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
									borderRadius: '16px',
								}}
							>
								<div className="text-[#FF8225] text-5xl font-extrabold mb-4">
									{step}
								</div>
								<h3 className="text-xl font-bold mb-2 text-[#B43F3F]">
									{step === 1 && 'Create Your Profile'}
									{step === 2 && 'Discover Matches'}
									{step === 3 && 'Connect & Collaborate'}
								</h3>
								<p className="text-gray-700 leading-relaxed text-md">
									{step === 1 &&
										"Highlight your skills, experience, and what you're looking for in a co-founder with ease."}
									{step === 2 &&
										"Browse intelligent matches or use the intuitive swipe feature to find compatible partners quickly."}
									{step === 3 &&
										"Initiate meaningful chats, form collaborative groups, and start building your venture together seamlessly."}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section id="testimonials" className="py-20 md:py-32 bg-[#F8EDED]">
				<div className="container mx-auto px-6 max-w-6xl">
					<h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-[#173B45]">
						What Our Users Say
					</h2>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
						<div
							className="testimonial-card"
							style={{
								backgroundColor: 'rgba(255,255,255,0.7)',
								border: '1px solid rgba(255,255,255,0.5)',
								backdropFilter: 'blur(8px)',
								boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
								borderRadius: '20px',
								padding: '2.5rem',
								textAlign: 'center',
							}}
						>
							<p className="text-gray-700 text-xl italic mb-6">
								"Cofindr literally changed the trajectory of my startup. I found a
								co-founder with complementary skills and an incredible work ethic.
								The matching algorithm is spot on!"
							</p>
							<div className="font-semibold text-lg text-[#B43F3F]">
								- Alex P., Tech Entrepreneur
							</div>
						</div>
						<div
							className="testimonial-card"
							style={{
								backgroundColor: 'rgba(255,255,255,0.7)',
								border: '1px solid rgba(255,255,255,0.5)',
								backdropFilter: 'blur(8px)',
								boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
								borderRadius: '20px',
								padding: '2.5rem',
								textAlign: 'center',
							}}
						>
							<p className="text-gray-700 text-xl italic mb-6">
								"Before Cofindr, I was struggling to find someone who truly
								understood my vision. The chat features made it easy to connect
								and build a relationship before even meeting."
							</p>
							<div className="font-semibold text-lg text-[#B43F3F]">
								- Sarah L., Product Designer
							</div>
						</div>
					</div>
					<p className="text-center text-sm text-gray-500 mt-8">
						*These are example testimonials. Real testimonials will appear here
						soon!
					</p>
				</div>
			</section>

			{/* FAQ Section */}
			<section id="faq" className="py-20 md:py-32 bg-[#F8EDED]">
				<div className="container mx-auto px-6 max-w-4xl">
					<h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-[#173B45]">
						Frequently Asked Questions
					</h2>
					<div className="space-y-6">
						{faqs.map((faq, idx) => (
							<div
								key={idx}
								className={`faq-item ${openFaq === idx ? 'open' : ''}`}
								style={{
									backgroundColor: 'rgba(255,255,255,0.7)',
									border: '1px solid rgba(255,255,255,0.5)',
									backdropFilter: 'blur(8px)',
									boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
									borderRadius: '16px',
									overflow: 'hidden',
								}}
							>
								<div
									className="faq-question flex justify-between items-center cursor-pointer px-8 py-6 font-semibold text-lg text-[#B43F3F]"
									onClick={() =>
										setOpenFaq(openFaq === idx ? null : idx)
									}
								>
									<span>{faq.q}</span>
									<span
										className={`faq-icon text-2xl transition-transform duration-300 ${
											openFaq === idx ? 'transform rotate-180' : ''
										}`}
									>
										+
									</span>
								</div>
								<div
									className={`faq-answer px-8 pb-6 text-[#173B45] transition-all duration-300 ${openFaq === idx ? 'max-h-40 pt-4' : 'max-h-0 overflow-hidden'
										}`}
								>
									{faq.a}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Call to Action Section */}
			<section
				id="cta"
				className="py-20 md:py-32 bg-gradient-to-br from-[#B43F3F] to-[#FF8225] text-white text-center rounded-t-[4rem] shadow-xl overflow-hidden"
			>
				<div className="container mx-auto px-6 max-w-4xl">
					<h2 className="text-4xl md:text-5xl font-bold mb-8">
						Ready to Find Your Cofounder?
					</h2>
					<p className="text-xl sm:text-2xl mb-12 opacity-95 leading-relaxed font-light">
						Join Cofindr today and take the first step towards building a
						successful startup with the right partner. Your ideal co-founder
						awakens!
					</p>
					<a
						href="#"
						className="btn-primary text-white font-semibold py-4 px-12 rounded-full text-2xl inline-block transition duration-300 ease-in-out"
						style={{
							background:
								'linear-gradient(to right, #B43F3F, #FF8225)',
							boxShadow: '0 4px 10px rgba(180, 63, 63, 0.3)',
						}}
					>
						Get Started for Free
					</a>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-[#173B45] text-gray-300 py-10 text-center rounded-b-[2rem] shadow-inner">
				<div className="container mx-auto px-6">
					<p className="mb-4">&copy; 2025 Cofindr. All rights reserved.</p>
					<div className="flex justify-center space-x-8 text-lg">
						<a
							href="#"
							className="hover:text-[#FF8225] transition duration-200"
						>
							Privacy Policy
						</a>
						<a
							href="#"
							className="hover:text-[#FF8225] transition duration-200"
						>
							Terms of Service
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
}