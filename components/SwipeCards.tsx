'use client';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getGraphQLClient } from '@/lib/nhost';
import { GET_PROFILES, CHECK_MATCH } from '@/lib/queries';
import { SWIPE_MUTATION } from '@/lib/mutations';

interface Profile {
  id: string;
  name: string;
  bio: string;
  skills: string[];
  photoURL: string;
  interests: string[];
  expertise: string;
  location: string;
  availability: string;
}

interface ProfileFromDB {
  id: string;
  name: string;
  bio: string;
  skills: string[];
  photo_url: string;
  interests: string[];
  expertise: string;
  location: string;
  availability: string;
}

interface ProfilesResponse {
  profiles: ProfileFromDB[];
}

interface MatchResponse {
  matches: Array<{ id: string }>;
}

export default function SwipeCards() {
  const router = useRouter();
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [swipedAll, setSwipedAll] = useState(false);

  useEffect(() => {
    const fetchProfiles = async () => {
      if (!user) return;

      try {
        setLoading(true);
        
        const response = await getGraphQLClient().request(GET_PROFILES, {
          current_user_id: user.id, // Changed from uid to id
          limit: 10
        }) as ProfilesResponse;
        
        const formattedProfiles = response.profiles.map((profile: ProfileFromDB) => ({
          ...profile,
          photoURL: profile.photo_url || '/default-avatar.png',
        }));
        
        setProfiles(formattedProfiles);
        setSwipedAll(formattedProfiles.length === 0);
        setError(null);
      } catch (err) {
        console.error('Error fetching profiles:', err);
        setError('Failed to load profiles. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [user]);

  const swiped = async (direction: string, targetUserId: string) => {
    const currentUser = user;
    if (!currentUser) return;

    try {
      // Record the swipe
      await getGraphQLClient().request(SWIPE_MUTATION, {
        swiper_id: currentUser.id, // Changed from uid to id
        swiped_id: targetUserId,
        direction: direction
      });

      // Check for match if swiped right
      if (direction === 'right') {
        const response = await getGraphQLClient().request(CHECK_MATCH, {
          user1_id: targetUserId,
          user2_id: currentUser.id // Changed from uid to id
        }) as MatchResponse;

        if (response.matches.length > 0) {
          alert('🎉 It\'s a match!');
        }
      }
    } catch (err) {
      console.error('Error recording swipe:', err);
      setError('Failed to record swipe. Please try again.');
    }
  };

  const outOfFrame = () => {
    // Optionally handle card leaving the screen
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-pulse text-white">Loading potential matches...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="bg-red-500/10 text-red-500 p-4 rounded-lg">{error}</div>
      </div>
    );
  }

  if (swipedAll) {
    return (
      <div className="flex flex-col justify-center items-center h-full text-center">
        <div className="text-2xl font-bold text-white mb-4">No More Profiles</div>
        <p className="text-gray-400 mb-6">
          You've seen all available co-founders for now. Check back later for new matches!
        </p>
        <button
          onClick={() => router.push('/dashboard')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="relative h-[calc(100vh-10rem)] max-w-lg mx-auto">
      <div className="absolute inset-0">
        {profiles.map((profile, index) => (
          <TinderCard
            key={profile.id}
            onSwipe={(dir) => swiped(dir, profile.id)}
            preventSwipe={['up', 'down']}
            className={index !== currentIndex ? 'hidden' : ''}
          >
            <div className="absolute inset-0">
              <div className="relative h-full bg-gradient-to-b from-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                
                <Image
                  src={profile.photoURL}
                  alt={profile.name}
                  fill
                  className="object-cover"
                  priority
                />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {profile.name}
                  </h2>
                  
                  <p className="text-gray-200 mb-4">{profile.bio}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-400">🎯</span>
                      <span className="text-gray-200">{profile.expertise}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-blue-400">📍</span>
                      <span className="text-gray-200">{profile.location}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-30">
        <button
          onClick={() => swiped('left', profiles[currentIndex].id)}
          className="w-16 h-16 flex items-center justify-center rounded-full bg-red-500/20 text-red-500 text-2xl border-2 border-red-500 hover:bg-red-500 hover:text-white transition-colors"
        >
          ✕
        </button>
        <button
          onClick={() => swiped('right', profiles[currentIndex].id)}
          className="w-16 h-16 flex items-center justify-center rounded-full bg-green-500/20 text-green-500 text-2xl border-2 border-green-500 hover:bg-green-500 hover:text-white transition-colors"
        >
          ✓
        </button>
      </div>
    </div>
  );
}
