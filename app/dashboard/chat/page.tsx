"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getGraphQLClient } from "@/lib/nhost";
import { GET_USER_MATCHES } from "@/lib/queries";
import Image from "next/image";

interface MatchUser {
  name: string;
  photo_url: string;
}

interface Match {
  id: string;
  user1_id: string;
  user2_id: string;
  created_at: string;
  user1: MatchUser;
  user2: MatchUser;
}

interface MatchesResponse {
  matches: Match[];
}

export default function Chat() {
  const { user } = useAuth();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchMatches = async () => {
      try {
        const response = await getGraphQLClient().request(GET_USER_MATCHES, {
          user_id: user.id
        }) as MatchesResponse;
        setMatches(response.matches);
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, [user]);

  if (!user) return <div className="text-white">Please log in to view your chats.</div>;
  if (loading) return <div className="text-white">Loading matches...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-4 text-blue-500">Cofindr Chat</h1>
      {matches.length === 0 ? (
        <p className="mb-6 text-lg">No matches yet. Start swiping to connect!</p>
      ) : (
        <ul className="w-full max-w-md space-y-4">
          {matches.map((match) => {
            const otherUser = match.user1_id === user?.id ? match.user2 : match.user1;
            return (
              <li key={match.id} className="bg-white/10 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={otherUser.photo_url || "/default-avatar.png"}
                      alt={otherUser.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="font-bold text-blue-300">{otherUser.name}</span>
                </div>
                <Link 
                  href={`/dashboard/chat/${match.id}`} 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Open Chat
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
