import { nhost } from './nhost';

// Types for chat messages
export interface ChatMessage {
  id: string;
  match_id: string;
  sender_id: string;
  text: string;
  timestamp: string;
}

// Fetch all messages for a match, ordered by timestamp
export async function getMessages(matchId: string): Promise<ChatMessage[]> {
  const query = `
    query GetMessages($matchId: String!) {
      messages(where: {match_id: {_eq: $matchId}}, order_by: {timestamp: asc}) {
        id
        match_id
        sender_id
        text
        timestamp
      }
    }
  `;
  const { data, error } = await nhost.graphql.request(query, { matchId });
  if (error) throw error;
  return data?.messages || [];
}

// Send a new message to a match's chat
export async function sendMessage(matchId: string, senderId: string, text: string): Promise<ChatMessage> {
  const mutation = `
    mutation SendMessage($matchId: String!, $senderId: String!, $text: String!) {
      insert_messages_one(object: { match_id: $matchId, sender_id: $senderId, text: $text }) {
        id
        match_id
        sender_id
        text
        timestamp
      }
    }
  `;
  const { data, error } = await nhost.graphql.request(mutation, { matchId, senderId, text });
  if (error) throw error;
  return data?.insert_messages_one;
}
