"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getGraphQLClient } from "@/lib/nhost";
import { Card } from "@/components/Card";

const GET_STARTUP_PROFILE = `
  query GetStartupProfile($user_id: uuid!) {
    startups(where: { user_id: { _eq: $user_id } }) {
      id
      name
      description
      industry
      stage
      funding
      website
      pitch
    }
  }
`;

const UPSERT_STARTUP_PROFILE = `
  mutation UpsertStartupProfile(
    $user_id: uuid!,
    $name: String!,
    $description: String!,
    $industry: String!,
    $stage: String!,
    $funding: String!,
    $website: String!,
    $pitch: String!
  ) {
    insert_startups_one(
      object: {
        user_id: $user_id,
        name: $name,
        description: $description,
        industry: $industry,
        stage: $stage,
        funding: $funding,
        website: $website,
        pitch: $pitch
      },
      on_conflict: {
        constraint: startups_user_id_key,
        update_columns: [name, description, industry, stage, funding, website, pitch]
      }
    ) {
      id
    }
  }
`;

interface StartupProfile {
  name: string;
  description: string;
  industry: string;
  stage: string;
  funding: string;
  website: string;
  pitch: string;
}

const initialProfile: StartupProfile = {
  name: "",
  description: "",
  industry: "",
  stage: "",
  funding: "",
  website: "",
  pitch: "",
};

export default function StartupProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<StartupProfile>(initialProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchStartupProfile = async () => {
      if (!user) return;
      try {
        const response = await getGraphQLClient().request(GET_STARTUP_PROFILE, {
          user_id: user.id
        });
        
        if (response.startups && response.startups[0]) {
          setProfile(response.startups[0]);
        }
      } catch (error) {
        console.error("Error fetching startup profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStartupProfile();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    try {
      await getGraphQLClient().request(UPSERT_STARTUP_PROFILE, {
        ...profile,
        user_id: user.id
      });
      alert("Startup profile saved successfully!");
    } catch (error) {
      console.error("Error saving startup profile:", error);
      alert("Failed to save startup profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">My Startup</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Startup Name
              </label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full p-2 rounded bg-black/40 border border-blue-900/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={profile.description}
                onChange={handleChange}
                rows={3}
                className="w-full p-2 rounded bg-black/40 border border-blue-900/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Industry
              </label>
              <select
                name="industry"
                value={profile.industry}
                onChange={handleChange}
                className="w-full p-2 rounded bg-black/40 border border-blue-900/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Industry</option>
                <option value="tech">Technology</option>
                <option value="health">Healthcare</option>
                <option value="finance">Fintech</option>
                <option value="education">Education</option>
                <option value="ecommerce">E-commerce</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Stage
              </label>
              <select
                name="stage"
                value={profile.stage}
                onChange={handleChange}
                className="w-full p-2 rounded bg-black/40 border border-blue-900/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Stage</option>
                <option value="idea">Idea Stage</option>
                <option value="mvp">MVP</option>
                <option value="early">Early Traction</option>
                <option value="growth">Growth</option>
                <option value="scaling">Scaling</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Current Funding
              </label>
              <select
                name="funding"
                value={profile.funding}
                onChange={handleChange}
                className="w-full p-2 rounded bg-black/40 border border-blue-900/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Funding Status</option>
                <option value="bootstrap">Bootstrapped</option>
                <option value="seed">Seed Funded</option>
                <option value="seriesA">Series A</option>
                <option value="seriesB">Series B+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={profile.website}
                onChange={handleChange}
                className="w-full p-2 rounded bg-black/40 border border-blue-900/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Elevator Pitch
              </label>
              <textarea
                name="pitch"
                value={profile.pitch}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 rounded bg-black/40 border border-blue-900/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="What makes your startup unique?"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={saving}
              className={`w-full py-3 rounded-xl font-bold text-white transition-all ${
                saving
                  ? "bg-blue-700/50 cursor-not-allowed"
                  : "bg-blue-700 hover:bg-blue-800"
              }`}
            >
              {saving ? "Saving..." : "Save Startup Profile"}
            </button>
          </div>
        </Card>
      </form>
    </div>
  );
}
