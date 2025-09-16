import { ChatRoomClient } from "./ChatRoomClient";
import { getRoomChats } from "action/room";
import { redirect } from "next/navigation";

export async function ChatRoom({ id, slug }: {
    id: number,
    slug?: string
}) {
    const response = await getRoomChats(id);
    if(response?.error) {
        redirect("/roomenter");
    }
    console.log("the messages:::::::::::", response?.messages);
    console.log("the id :::::::::::", id);
    return <ChatRoomClient id={id} messages={response?.messages} currentUserId={id} slug={slug}/>
}