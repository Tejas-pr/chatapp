import axios from "axios";
import { BACKEND_URL } from "../config";
import { ChatRoomClient } from "./ChatRoomClient";

async function getChats(roomId: string, authToken: string) {
    const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`, {
        headers: {
            Authorization: `${authToken}`,
        }
    });
    return response.data.messages;
}
export async function ChatRoom({ id, authToken }: {
    id: string,
    authToken: string
}) {
    const messages = await getChats(id, authToken);
    return <ChatRoomClient id={id} messages={messages} currentUserId={id}></ChatRoomClient>
}