

"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RoomEnter() {
  const navigate = useRouter();
  const [roomId, SetRoomId] = useState("");

  return (
    <div className="mainContainer">
      <input
        type="text"
        placeholder="room id..."
        value={roomId}
        onChange={(e) => {
          SetRoomId(e.target.value);
        }}
      />
      <button
        onClick={() => {
          navigate.push(`/room/${roomId}`);
        }}
      >
        Join room
      </button>
    </div>
  );
}
