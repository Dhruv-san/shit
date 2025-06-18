"use client";
import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";

const dummyProfiles = [
	{ id: 1, name: "Ayaan", skill: "AI Dev", image: "/avatars/1.png" },
	{ id: 2, name: "Meera", skill: "Product Designer", image: "/avatars/2.png" },
	{ id: 3, name: "Ravi", skill: "Blockchain Eng.", image: "/avatars/3.png" },
];

export default function Dashboard() {
	const [profiles, setProfiles] = useState([]);

	useEffect(() => {
		// Replace with real fetch
		setProfiles(dummyProfiles);
	}, []);

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-black text-white">
			<h2 className="text-3xl font-bold mb-4">Swipe to Match Co-founders</h2>
			<div className="w-full max-w-xs">
				{profiles.map((profile) => (
					<TinderCard key={profile.id} preventSwipe={["up", "down"]}>
						<div className="bg-white text-black rounded-lg p-4 shadow-md mb-4">
							<img
								src={profile.image}
								alt={profile.name}
								className="w-full h-48 object-cover rounded"
							/>
							<h3 className="text-xl mt-2 font-bold">{profile.name}</h3>
							<p className="text-gray-700">{profile.skill}</p>
						</div>
					</TinderCard>
				))}
			</div>
		</div>
	);
}
