import axious from "axios"
import { BACKEND_URL } from "../../config";
import { ChatRoom } from "../../components/ChatRoom";

async function getRoomId(slug: string) {
    console.log("the slug catch is : ", slug);
    const response = await axious.get(`${BACKEND_URL}/room/${slug}`);
    console.log("the responme is ", response.data);
    console.log("the responme is ", response.data.slugValue.id);
    let id;
    if(response.data) {
        id = response.data.slugValue.id;
    }
    return id;
}

export default async function ChatRoom1({ params } : { params: { slug: string } }){
    const slug = params.slug;
    console.log("the slug catch is : ", slug);
    const roomId = await getRoomId(slug);
    if(!roomId) {
        alert("invaild entered value!!");
    }

    return <div>
        <ChatRoom id={roomId}></ChatRoom>
    </div>
}