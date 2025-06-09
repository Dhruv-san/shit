"use client";
import { useEffect, useState } from 'react';
import { Card } from '@/components/Card';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getGraphQLClient } from "@/lib/nhost";
import Image from "next/image";

const GET_RECENT_MATCHES = `
  query GetRecentMatches($user_id: uuid!) {
    matches(
      where: {
        _or: [
          { user1_id: { _eq: $user_id } },
          { user2_id: { _eq: $user_id } }
        ]
      }
      order_by: { created_at: desc }
      limit: 3
    ) {
      id
      user1 {
        id
        name
        photo_url
        expertise
      }
      user2 {
        id
        name
        photo_url
        expertise
      }
      created_at
    }
  }
`;

interface MatchUser {
  id: string;
  name: string;
  photo_url: string;
  expertise: string;
}

interface Match {
  id: string;
  user1: MatchUser;
  user2: MatchUser;
  created_at: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [recentMatches, setRecentMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecentMatches = async () => {
      if (!user) return;
      try {
        const response = await getGraphQLClient().request(GET_RECENT_MATCHES, {
          user_id: user.id
        });
        setRecentMatches(response.matches);
      } catch (err) {
        console.error('Error fetching recent matches:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentMatches();
  }, [user]);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="animate-pulse p-6 space-y-6">
        <div className="h-8 w-64 bg-blue-900/30 rounded-lg"></div>
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-blue-900/20 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">
          Welcome{user?.displayName ? `, ${user.displayName}` : ''}
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Quick Actions */}
        <Link href="/dashboard/swipe">
          <Card className="h-full hover:scale-105 transition-transform cursor-pointer bg-gradient-to-br from-blue-900/50 to-purple-900/50">
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">Start Matching</h3>
              <p className="text-blue-200">Find potential cofounders that match your criteria</p>
            </div>
          </Card>
        </Link>

        <Link href="/dashboard/chat">
          <Card className="h-full hover:scale-105 transition-transform cursor-pointer bg-gradient-to-br from-purple-900/50 to-pink-900/50">
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">Your Chats</h3>
              <p className="text-blue-200">Continue conversations with your matches</p>
            </div>
          </Card>
        </Link>

        <Link href="/dashboard/news">
          <Card className="h-full hover:scale-105 transition-transform cursor-pointer bg-gradient-to-br from-pink-900/50 to-orange-900/50">
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">Startup News</h3>
              <p className="text-blue-200">Stay updated with the latest in tech</p>
            </div>
          </Card>
        </Link>
      </div>

      {/* Additional Sections */}
      <div className="grid gap-6 md:grid-cols-2 mt-8">
        {/* Profile Completion */}
        <Card className="bg-blue-900/20 backdrop-blur-xl">
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Complete Your Profile</h3>
            <div className="space-y-4">
              <Link 
                href="/profile"
                className="block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-center transition-colors"
              >
                Update Profile
              </Link>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <Card className="bg-blue-900/20 backdrop-blur-xl">
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Your Activity</h3>
            <div className="space-y-4">
              <Link 
                href="/dashboard/saved"
                className="block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-center transition-colors"
              >
                View Saved Profiles
              </Link>
            </div>
          </div>
        </Card>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/dashboard/swipe">
              <Card className="hover:bg-gray-900/50 transition-colors cursor-pointer">
                <h3 className="text-xl font-bold mb-2">Start Matching</h3>
                <p className="text-gray-300">Find your perfect co-founder match</p>
              </Card>
            </Link>

            <Link href="/dashboard/chat">
              <Card className="hover:bg-gray-900/50 transition-colors cursor-pointer">
                <h3 className="text-xl font-bold mb-2">Messages</h3>
                <p className="text-gray-300">Chat with your matches</p>
              </Card>
            </Link>

            <Link href="/profile">
              <Card className="hover:bg-gray-900/50 transition-colors cursor-pointer">
                <h3 className="text-xl font-bold mb-2">Complete Profile</h3>
                <p className="text-gray-300">Update your profile information</p>
              </Card>
            </Link>
          </div>

          {recentMatches.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Recent Matches</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentMatches.map((match) => {
                  const otherUser = match.user1.id === user?.id ? match.user2 : match.user1;
                  return (
                    <Link href={`/dashboard/chat/${match.id}`} key={match.id}>
                      <Card className="hover:bg-gray-900/50 transition-colors cursor-pointer">
                        <div className="flex items-center space-x-4">
                          {otherUser.photo_url ? (
                            <Image
                              src={otherUser.photo_url}
                              alt={otherUser.name}
                              width={48}
                              height={48}
                              className="rounded-full"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                              <span className="text-xl font-bold text-white">
                                {otherUser.name[0].toUpperCase()}
                              </span>
                            </div>
                          )}
                          <div>
                            <h3 className="font-bold">{otherUser.name}</h3>
                            <p className="text-sm text-gray-300">{otherUser.expertise}</p>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}