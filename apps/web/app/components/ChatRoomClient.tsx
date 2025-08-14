"use client";
import { useEffect, useRef, useState } from "react";
import { useSocket } from "../../hook/useSocket";

type ChatMessage = {
  message: string;
  createdAt?: string;
  userId?: string;
};

export function ChatRoomClient({
  messages,
  id,
  currentUserId,
}: {
  messages: ChatMessage[];
  id: string;
  currentUserId: string;
}) {
  const { socket, loading } = useSocket();
  const [chats, setChats] = useState(messages);
  const [currentMessage, setCurrentMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!socket || loading) return;

    socket.send(
      JSON.stringify({
        type: "join_room",
        roomId: id,
      })
    );

    const handleMessage = (event: MessageEvent) => {
      const parsedData = JSON.parse(event.data);
      if (parsedData.type === "chat") {
        setChats((c) => [
          ...c,
          {
            message: parsedData.message,
            createdAt: new Date().toISOString(),
            userId: parsedData.userId,
          },
        ]);
      }
    };

    socket.addEventListener("message", handleMessage);

    return () => {
      socket.removeEventListener("message", handleMessage);
    };
  }, [socket, loading, id]);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chats.map((m, index) => {
          const isMine = m.userId === currentUserId;
          return (
            <div
              key={index}
              className={`flex flex-col max-w-[70%] ${
                isMine ? "ml-auto items-end" : "items-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl shadow-md ${
                  isMine
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                    : "bg-gray-700"
                }`}
              >
                <p className="text-base">{m.message}</p>
              </div>
              <span className="text-xs text-gray-400 mt-1">
                {m.createdAt
                  ? new Date(m.createdAt).toLocaleString()
                  : new Date().toLocaleString()}
              </span>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-700 p-4 flex items-center space-x-2 bg-gray-800">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && currentMessage.trim()) {
              socket?.send(
                JSON.stringify({
                  type: "chat",
                  roomId: id,
                  message: currentMessage,
                })
              );
              setCurrentMessage("");
            }
          }}
        />
        <button
          onClick={() => {
            if (!currentMessage.trim()) return;
            socket?.send(
              JSON.stringify({
                type: "chat",
                roomId: id,
                message: currentMessage,
              })
            );
            setCurrentMessage("");
          }}
          className="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
}
