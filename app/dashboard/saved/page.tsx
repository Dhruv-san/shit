"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getGraphQLClient } from "@/lib/nhost";
import { Card } from "@/components/Card";
import Image from "next/image";

const GET_SAVED_PROFILES = `
  query GetSavedProfiles($user_id: uuid!) {
    swipes(
      where: {
        swiper_id: { _eq: $user_id },
        direction: { _eq: "right" }
      }
    ) {
      swiped_user {
        id
        name
        bio
        skills
        photo_url
      }
    }
  }
`;

interface SavedProfile {
  id: string;
  name: string;
  bio: string;
  skills: string[];
  photo_url: string;
}

interface SavedProfilesResponse {
  swipes: Array<{
    swiped_user: SavedProfile;
  }>;
}

export default function SavedProfilesPage() {
  const { user } = useAuth();
  const [savedProfiles, setSavedProfiles] = useState<SavedProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedProfiles = async () => {
      if (!user) return;
      try {
        const response = await getGraphQLClient().request(GET_SAVED_PROFILES, {
          user_id: user.id
        }) as SavedProfilesResponse;
        
        setSavedProfiles(response.swipes.map(swipe => swipe.swiped_user));
      } catch (error) {
        console.error("Error fetching saved profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProfiles();
  }, [user]);

  if (loading) {
    return <div className="text-white text-center">Loading saved profiles...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-6">Saved Profiles</h1>
      
      {savedProfiles.length === 0 ? (
        <Card>
          <p className="text-center text-gray-300">
            No saved profiles yet. Start swiping to save potential co-founders!
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedProfiles.map((profile) => (
            <Card key={profile.id} className="flex flex-col items-center">
              <Image
                src={profile.photo_url || "/default-avatar.png"}
                alt={profile.name}
                width={96}
                height={96}
                className="rounded-full mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{profile.name}</h3>
              <p className="text-gray-300 text-center mb-4">{profile.bio}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-900/30 rounded-full text-sm text-blue-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
