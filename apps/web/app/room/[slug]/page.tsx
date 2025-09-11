'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChatRoom } from "../../components/ChatRoom";
import { getRoomIdBySlug } from "action/room";

export default function ChatRoom1() {
  const searchParams = useParams();
  const router = useRouter();
  const slug = searchParams?.slug;

  const [roomId, setRoomId] = useState<string | null>(null);

  useEffect(() => {
    console.log("the slug is ======", slug);
    async function getRoomId() {
      if (!slug) {
        router.push("/roomenter");
        return;
      }
      try {
        const response = await getRoomIdBySlug(slug);
        console.log("the response in create Room", response);
        // if (response?.room?.id) {
        //   setRoomId(response);
        // } else {
        //   router.push("/roomenter");
        // }
      } catch (e) {
        console.error(e);
        // router.push("/roomenter");
      }
    }
    getRoomId();
  }, [slug, router]);

  if (!roomId) {
    return <p>Loading...</p>;
  }

  return <ChatRoom id={roomId} slug={slug} />;
}
