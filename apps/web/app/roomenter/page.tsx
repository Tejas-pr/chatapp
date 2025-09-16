"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogoutButton } from "@/components/ui/logout";
import { creteNewRoom, getAllRooms } from "action/room";
import { toast } from "sonner";

type Room = {
  id: number;
  slug: string;
  createdAt: Date;
  adminId: string;
};

export default function RoomEnter() {
  const navigate = useRouter();
  const [roomId, SetRoomId] = useState("");
  const [createRoom, SetCreateRoom] = useState("");
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedRooms = localStorage.getItem("availableRooms-chat-app");

    if (storedRooms) {
      try {
        const parsed = JSON.parse(storedRooms);

        if (Array.isArray(parsed) && parsed.length > 0) {
          setAvailableRooms(parsed);
          setLoaded(true);
        } else {
          toast("No rooms found in local storage. Please create or join a room.");
          getRooms().then(() => setLoaded(true));
        }
      } catch (error) {
        console.error("Failed to parse stored rooms:", error);
        getRooms().then(() => setLoaded(true));
      }
    } else {
      getRooms().then(() => setLoaded(true));
    }
  }, []);

  const getRooms = async () => {
    try {
      const response = await getAllRooms();

      if (!response) {
        toast("Unable to fetch rooms. Please try again later.");
        return;
      }

      if (response.rooms?.length === 0) {
        toast("No rooms available yet. Create a new room to start chatting.");
      }

      if (response.rooms) {
        setAvailableRooms(response.rooms);
        localStorage.setItem("availableRooms-chat-app",JSON.stringify(response.rooms));
      }
    } catch (error) {
      toast("Something went wrong while fetching rooms.");
      console.error("Error fetching rooms:", error);
    }
  };


  if (!loaded) {
    return null;
  }

  const createNewRoom = async () => {
    try {
      const response = await creteNewRoom(createRoom);
      if (response && response.room) {
        setAvailableRooms((prev) => {
          const updatedRooms = [...prev, response.room];
          localStorage.setItem("availableRooms-chat-app",JSON.stringify(updatedRooms));
          return updatedRooms;
        });
      }
    } catch (e: any) {
      console.error(e);
      if (e.response?.data?.message) {
        toast(e.response.data.message);
      } else {
        toast("Something went wrong! Please try again.");
      }
    }
  };

  const navigateToSlug = (room: any) => {
    console.log(room.slug);
    if (!room) {
      toast("there is no room, please create new room!!!");
    }
    const slug = room.slug;
    navigate.push(`/room/${slug}`);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (roomId) {
      navigate.push(`/room/${roomId}`);
    }

    if (createRoom) {
      createNewRoom();
    }
  };

  const filteredRooms = availableRooms.filter((room) => {
    if (!searchTerm) return true;
    return room.slug.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white">
      <LogoutButton />
      {/* Top Section - Join/Create Room */}
      <form
        onSubmit={onSubmit}
        className="bg-gradient-to-r from-[#667eea] to-[#764ba2] p-8"
      >
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
              className={`bg-gradient-to-r from-[#ff6b6b] to-[#4ecdc4] hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:cursor-pointer active:scale-95 active:shadow-inner hover:scale-105
              ${!roomId && !createRoom ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {!(roomId || createRoom) ? "Create/Join Room" : null}
              {roomId ? "Join Room" : ""}
              {createRoom ? "Create Room" : ""}
            </button>
          </div>
        </div>
      </form>

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
          {filteredRooms.map((room) => (
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
          {filteredRooms.length === 0 && searchTerm && (
            <div className="col-span-full text-center text-gray-400 py-6">
              No rooms found for "
              <span className="text-white">{searchTerm}</span>"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
