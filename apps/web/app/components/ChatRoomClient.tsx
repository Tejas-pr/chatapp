"use client";
import { useEffect, useState } from "react";
import { useSocket } from "../../hook/useSocket";

export function ChatRoomClient({
  messages,
  id,
}: {
  messages: { message: string }[];
  id: string;
}) {
  const { socket, loading } = useSocket();
  const [chats, setChats] = useState(messages);
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    if (socket && !loading) {
      socket.send(
        JSON.stringify({
          type: "join_room",
          roomId: id,
        })
      );

      socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        console.log(parsedData);
        if (parsedData.type === "chat") {
          setChats((c) => [...c, { message: parsedData.message }]);
        }
      };
    }
  }, [socket, loading, id]);

  return (
    <div>
      {chats.map((m) => (
        <div>{m.message}</div>
      ))}
      <input type="text" placeholder="send message...." value={currentMessage} onChange={e => {
        setCurrentMessage(e.target.value);
      }}/>
      <button onClick={() => {
        socket?.send(JSON.stringify({
            type: "chat",
            roomId: id,
            message: currentMessage
        }))
        setCurrentMessage("");
      }}>Send</button>
    </div>
  );
}
