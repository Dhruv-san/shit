"use client";
import { useState } from "react";

const saved = [
	{ id: 1, name: "Ishaan", skill: "AR Developer", image: "/avatars/4.png" },
	{ id: 2, name: "Kriti", skill: "Finance Lead", image: "/avatars/5.png" },
];

export default function Saved() {
	const [profiles] = useState(saved);

	return (
		<div className="bg-black text-white min-h-screen p-4">
			<h1 className="text-2xl font-bold mb-4">Saved Profiles</h1>
			<div className="grid gap-4 md:grid-cols-2">
				{profiles.map((p) => (
					<div key={p.id} className="bg-gray-800 p-4 rounded shadow">
						<img
							src={p.image}
							className="w-full h-48 object-cover rounded"
						/>
						<h2 className="text-xl font-bold mt-2">{p.name}</h2>
						<p className="text-gray-400">{p.skill}</p>
					</div>
				))}
			</div>
		</div>
	);
}
