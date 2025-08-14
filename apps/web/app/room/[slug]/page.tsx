import axios from "axios";
import { BACKEND_URL } from "../../config";
import { ChatRoom } from "../../components/ChatRoom";
import { redirect } from "next/navigation";

type RoomResponse = {
  slugValue: {
    id: string;
  } | null;
};

async function getRoomId(slug: string, token: string) {
  const response = await axios.get<RoomResponse>(
    `${BACKEND_URL}/room/${slug}`,
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );

  if (!response.data.slugValue) {
    return null;
  }
  return response.data.slugValue.id;
}

export default async function ChatRoom1({
  params,
}: {
  params: { slug: string; token: string };
}) {
  const slug = params.slug;
  const token = params.token;
  const roomId = await getRoomId(slug, token);

  if (!roomId) {
    redirect("/roomenter");
  }

  return (
    <div>
      <ChatRoom id={roomId} authToken={token}/>
    </div>
  );
}
