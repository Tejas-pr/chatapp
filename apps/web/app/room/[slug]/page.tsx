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
  const tokenn = token;
  console.log("the tpken is ", tokenn)
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
  searchParams,
}: {
  params: { slug: string };
  searchParams: { token?: string };
}) {
  const tokenValue = searchParams.token;
  if(!tokenValue) {
    redirect("/roomenter");
  }
  const slug = params.slug;
  const roomId = await getRoomId(slug, tokenValue);

  if (!roomId) {
    redirect("/roomenter");
  }

  return (
    <div>
      <ChatRoom id={roomId} authToken={tokenValue}/>
    </div>
  );
}
