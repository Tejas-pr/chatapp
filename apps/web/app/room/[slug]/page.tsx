'use client'

import axios from "axios";
import { redirect } from "next/navigation";
import { BACKEND_URL } from "../../config";
import { ChatRoom } from "../../components/ChatRoom";
import { useSearchParams } from 'next/navigation'

type RoomResponse = {
  slugValue: { id: string } | null;
};

async function getRoomId(slug: string | undefined) {
  if (!slug) return null;
  try {
    const response = await axios.get<RoomResponse>(`${BACKEND_URL}/room/${slug}`);
    return response.data.slugValue?.id ?? null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export default async function ChatRoom1() {
  const searchParams = useSearchParams()
  const slug = searchParams?.get("slug") ?? undefined;
  const roomId = await getRoomId(slug);

  if (!roomId) {
    redirect("/roomenter");
  }

  return <ChatRoom id={roomId} slug={slug} />;
}
