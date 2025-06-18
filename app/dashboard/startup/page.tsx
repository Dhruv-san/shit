"use client";
import { useState } from "react";

export default function StartupFormation() {
  const [members, setMembers] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const addMember = () => {
    if (input.trim()) {
      setMembers((prev) => [...prev, input.trim()]);
      setInput("");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Form a Startup Team</h1>
      <div className="mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter cofounder name"
          className="text-black px-4 py-2 rounded mr-2"
        />
        <button onClick={addMember} className="bg-green-500 px-4 py-2 rounded hover:bg-green-600">
          Add
        </button>
      </div>
      <ul className="list-disc ml-5">
        {members.map((name, i) => (
          <li key={i}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
