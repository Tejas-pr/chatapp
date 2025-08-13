

"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BACKEND_URL } from "../config";

export default function RoomEnter() {
  const navigate = useRouter();
  const [roomId, SetRoomId] = useState("");

  const getRooms = async () => {
    const response = await axios.get(`${BACKEND_URL}/allrooms`);
    if(response.data) {
      const rooms = response.data.rooms;
      console.log("the rooms", rooms);
      return rooms;
    } else {
      alert("failed to get the rooms");
    }
  }

  return (
    <div>
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
      <div>
          
      </div>
    </div>
  );
}
