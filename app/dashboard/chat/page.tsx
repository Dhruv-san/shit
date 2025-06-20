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
    <div className="flex h-[calc(100vh-5rem)] flex-col overflow-hidden bg-[#F8EDED] text-[#173B45]">
      <div className="flex items-center border-b border-[#FF8225] px-6 py-4 bg-[#F8EDED]">
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 rounded-full bg-[#FF8225] text-white flex items-center justify-center font-bold">
            JD
          </div>
          <div>
            <h2 className="font-semibold text-[#173B45]">John Doe</h2>
            <p className="text-sm text-[#FF8225]">Online</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <div className="flex items-center space-x-2 text-[#FF8225]">
              <div className="h-2 w-2 animate-bounce rounded-full bg-[#FF8225]"></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-[#FF8225]" style={{ animationDelay: '0.2s' }}></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-[#FF8225]" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                    msg.sender === "You"
                      ? "bg-[#FF8225] text-white"
                      : "bg-white text-[#173B45] border border-[#FF8225]/30"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="mt-1 text-xs opacity-75">
                    {msg.sender} • {new Date(msg.created_at).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-[#FF8225] bg-[#F8EDED] p-4">
        <div className="flex items-center space-x-2 rounded-lg border border-[#FF8225]/30 bg-white p-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 bg-transparent px-2 py-1 focus:outline-none text-[#173B45]"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="rounded-lg bg-[#FF8225] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#B43F3F] disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
