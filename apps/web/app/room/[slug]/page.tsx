import axious from "axios"
import { BACKEND_URL } from "../../config";
import { ChatRoom } from "../../components/ChatRoom";
async function getRoomId(slug: string) {
    const response = await axious.get(`${BACKEND_URL}/room/${slug}`);
    console.log("the responme is ", response.data);
    console.log("the responme is ", response.data.slugValue.id);
    return response.data.slugValue.id;
}

export default async function ChatRoom1({ params } : { params: { slug: string } }){
    const slug = params.slug;
    const roomId = await getRoomId(slug);

    return <div>
        <ChatRoom id={roomId}></ChatRoom>
    </div>
}