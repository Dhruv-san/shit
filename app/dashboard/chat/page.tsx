"use client";
import { useEffect, useState } from "react";
import { nhost } from "@/lib/nhost";

interface Message {
  id: string;
  sender: string;
  text: string;
  created_at: string;
}

const GET_MESSAGES = `
  query GetMessages {
    messages(order_by: {created_at: asc}) {
      id
      sender
      text
      created_at
    }
  }
`;

const SEND_MESSAGE = `
  mutation SendMessage($sender: String!, $text: String!) {
    insert_messages_one(object: { sender: $sender, text: $text }) {
      id
      sender
      text
      created_at
    }
  }
`;

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch messages from Nhost/Hasura
  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      const { data, error } = await nhost.graphql.request(GET_MESSAGES);
      if (!error && data?.messages) setMessages(data.messages);
      setLoading(false);
    };
    fetchMessages();
  }, []);

  // Send message to Nhost/Hasura
  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const { data, error } = await nhost.graphql.request(SEND_MESSAGE, {
      sender: "You", // Replace with real user
      text: input,
    });
    if (!error && data?.insert_messages_one) {
      setMessages((prev) => [...prev, data.insert_messages_one]);
      setInput("");
    }
    setLoading(false);
  };

  return (
    <div className="bg-black text-white min-h-screen p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {loading && <div>Loading...</div>}
        {messages.map((msg) => (
          <div key={msg.id} className="bg-gray-800 p-2 rounded">
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-3 py-2 text-black rounded"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600" disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
}
