"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getGraphQLClient } from "@/lib/nhost";
import { GET_CHAT_MESSAGES, SEND_MESSAGE_MUTATION } from "@/lib/queries";

interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
  sender: {
    name: string;
    photo_url: string;
  };
}

interface ChatMessagesResponse {
  messages: Message[];
}

export default function ChatRoom() {
  const { user } = useAuth();
  const params = useParams();
  const chatId =
    typeof params?.chatId === "string"
      ? params.chatId
      : Array.isArray(params?.chatId)
      ? params.chatId[0]
      : "";
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!chatId) return;

      try {
        const response = (await getGraphQLClient().request(GET_CHAT_MESSAGES, {
          chat_id: chatId,
        })) as ChatMessagesResponse;
        setMessages(response.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
    // Set up real-time subscription here later
  }, [chatId]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !user) return;

    try {
      const response = await getGraphQLClient().request(SEND_MESSAGE_MUTATION, {
        chat_id: chatId,
        sender_id: user.id,
        content: newMessage,
      });

      // Optimistically update UI
      setMessages((prev) => [
        ...prev,
        {
          id: response.insert_messages_one.id,
          content: newMessage.trim(),
          sender_id: user.id,
          created_at: new Date().toISOString(),
          sender: {
            name: user.displayName || "",
            photo_url: user.avatarUrl || "",
          },
        },
      ]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full text-white">
        Loading messages...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen p-6">
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 rounded-lg max-w-[80%] ${
              msg.sender_id === user?.id
                ? "bg-blue-600 text-white ml-auto"
                : "bg-gray-700 text-white mr-auto"
            }`}
          >
            <p className="text-sm text-gray-300 mb-1">
              {msg.sender.name || "Anonymous"}
            </p>
            <p>{msg.content}</p>
            <p className="text-xs text-gray-400 mt-1">
              {new Date(msg.created_at).toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
}
