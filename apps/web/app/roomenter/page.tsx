"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

type Room = {
  id: number;
  slug: string;
  createdAt: string;
  adminId: string;
};

export default function RoomEnter() {
  const navigate = useRouter();
  const [roomId, SetRoomId] = useState("");
  const [createRoom, SetCreateRoom] = useState("");
  const [token, SetToken] = useState("");
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [loaded, setLoaded] = useState(false);

  const getRooms = async (authToken: string) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/allrooms`, {
        headers: {
          Authorization: `${authToken}`,
        },
      });

      if (response.data && response.data.rooms) {
        setAvailableRooms(response.data.rooms);
      } else {
        alert("Failed to get the rooms");
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
      alert("Error fetching rooms");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("chat-app-token");
    if (token) {
      SetToken(token);
      getRooms(token);
    } else {
      alert("please log in!!!");
      navigate.push(`/signin`);
    }
    setLoaded(true);
  }, []);

  if (!loaded) {
    return null;
  }

  const navigateToSlug = (room: any) => {
    console.log(room.slug);
    if (!room) {
      alert("there is no room, please create new room!!!");
    }
    const slug = room.slug;
    navigate.push(`/room/${slug}?token=${token}`);
  };

  const onClickButton = () => {
    navigate.push(`/room/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white">
      {/* Top Section - Join/Create Room */}
      <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] p-8">
        <div className="max-w-4xl mx-auto">
          {/* Input Fields */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
            <div className="flex flex-col">
              <label className="text-sm text-gray-300 mb-2">Join Room</label>
              <input
                className="border rounded-lg px-4 py-3 text-white focus:outline-none w-80 disabled:cursor-not-allowed"
                type="text"
                placeholder="Enter room name..."
                value={roomId}
                onChange={(e) => {
                  SetRoomId(e.target.value);
                }}
                disabled={!!createRoom}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-300 mb-2">Create Room</label>
              <input
                className="border rounded-lg px-4 py-3 text-white focus:outline-none w-80 disabled:cursor-not-allowed"
                type="text"
                placeholder="Room name..."
                value={createRoom}
                onChange={(e) => {
                  SetCreateRoom(e.target.value);
                }}
                disabled={!!roomId}
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="flex items-center justify-center">
            <button
              disabled={!roomId && !createRoom}
              onClick={onClickButton}
              className={`bg-gradient-to-r from-[#ff6b6b] to-[#4ecdc4] hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${
                !roomId && !createRoom ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {!(roomId || createRoom) ? "Create/Join Room" : null}
              {roomId ? "Join Room" : ""}
              {createRoom ? "Create Room" : ""}
            </button>
          </div>
        </div>
      </div>

      {/* Available Rooms Section */}
      <div className="max-w-4xl mx-auto p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Available Rooms:
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search rooms..."
              className="w-full border rounded-lg px-4 py-3 pl-10 text-white focus:outline-none focus:ring-2 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableRooms.map((room) => (
            <div
              key={room.id}
              onClick={() => navigateToSlug(room)}
              className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:bg-gray-750 transition-colors duration-200 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium">{room.slug}</h3>
                <div className="text-blue-400 text-sm font-medium">Join →</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
