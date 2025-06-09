"use client";
import { Card } from "@/components/Card";
import { useState } from "react";
import { getGraphQLClient } from "@/lib/nhost";
import { useAuth } from "@/context/AuthContext";

const INSERT_TEST_PROFILES = `
  mutation InsertTestProfiles($profiles: [profiles_insert_input!]!) {
    insert_profiles(objects: $profiles) {
      returning {
        id
        name
      }
    }
  }
`;

interface TestProfile {
  name: string;
  bio: string;
  skills: string[];
  photoURL: string;
  location: string;
  expertise: string;
  availability: string;
  interests?: string[];
}

const dummyProfiles: TestProfile[] = [
  {
    name: "Sarah Chen",
    bio: "Serial entrepreneur with 8+ years in AI/ML. Previously founded an AI startup acquired by Google. Looking for a business-savvy co-founder for my next venture in healthcare tech.",
    skills: ["Machine Learning", "Python", "Product Strategy", "Team Leadership"],
    photoURL: "https://source.unsplash.com/random/400x400/?professional,woman",
    location: "San Francisco, CA",
    expertise: "Technical",
    availability: "Full-time",
    interests: ["AI/ML", "Healthcare", "SaaS"],
  },
  {
    name: "David Kumar",
    bio: "Ex-McKinsey consultant specialized in fintech. MBA from Stanford. Seeking a technical co-founder to revolutionize personal finance through AI.",
    skills: ["Business Strategy", "Finance", "Market Analysis", "Growth"],
    photoURL: "https://source.unsplash.com/random/400x400/?businessman,indian",
    location: "New York, NY",
    expertise: "Business",
    availability: "Full-time",
    interests: ["Fintech", "AI", "Personal Finance"],
  },
  {
    name: "Alex Rivera",
    bio: "Full-stack developer with focus on blockchain. Built several successful DeFi protocols. Looking for a co-founder with marketing expertise.",
    skills: ["Blockchain", "Solidity", "React", "Node.js"],
    photoURL: "https://source.unsplash.com/random/400x400/?developer,man",
    location: "Miami, FL",
    expertise: "Technical",
    availability: "Full-time",
    interests: ["Blockchain", "DeFi", "Web3"],
  },
  {
    name: "Emily Taylor",
    bio: "Marketing wizard with experience scaling 3 startups from zero to million-dollar revenue. Seeking a technical co-founder for a B2B SaaS venture.",
    skills: ["Digital Marketing", "Growth Hacking", "Content Strategy", "Analytics"],
    photoURL: "https://source.unsplash.com/random/400x400/?marketing,woman",
    location: "Austin, TX",
    expertise: "Marketing",
    availability: "Full-time",
    interests: ["B2B", "SaaS", "Growth Marketing"],
  },
];

export default function PopulateProfiles() {
  const { user } = useAuth();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePopulate = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      setLoading(true);
      setStatus("Adding profiles...");
      
      const profilesWithMetadata = dummyProfiles.map(profile => ({
        name: profile.name,
        bio: profile.bio,
        skills: profile.skills,
        interests: profile.interests || [],
        photo_url: profile.photoURL,
        location: profile.location,
        expertise: profile.expertise,
        availability: profile.availability,
        user_id: user.id,
        active: true,
        created_at: new Date().toISOString(),
      }));

      const result = await getGraphQLClient().request(INSERT_TEST_PROFILES, {
        profiles: profilesWithMetadata
      });
      
      setStatus(`Successfully added ${result.insert_profiles.returning.length} profiles!`);
    } catch (error) {
      console.error("Error adding profiles:", error);
      setStatus("Error adding profiles. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <Card>
        <h1 className="text-xl font-bold mb-4">Populate Test Profiles</h1>
        <p className="text-gray-300 mb-4">
          Click the button below to add 4 dummy profiles for testing the swipe feature.
        </p>
        <button
          onClick={handlePopulate}
          disabled={loading}
          className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Adding Profiles...' : 'Add Test Profiles'}
        </button>
        {status && (
          <div className={`mt-4 text-sm ${
            status.includes('Error') ? 'text-red-400' : 'text-green-400'
          }`}>
            {status}
          </div>
        )}
      </Card>
    </div>
  );
}
