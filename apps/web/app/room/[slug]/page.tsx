import { ChatRoom } from "../../components/ChatRoom";
import { getRoomIdBySlug } from "action/room";
import { redirect } from "next/navigation";

export default async function ChatRoom1({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const response = await getRoomIdBySlug(slug);

  if (!response || response.error || !response.roomId) {
    redirect("/roomenter");
  }

  return <ChatRoom id={response.roomId} slug={slug} />;
}
