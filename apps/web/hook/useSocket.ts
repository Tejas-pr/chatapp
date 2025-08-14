import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";
import { useRouter } from "next/navigation";

export function useSocket() {
    const [loading, setLoading] = useState<boolean>(true);
    const [socket, setSocket] = useState<WebSocket>();
    const [token, SetToken] = useState("");
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("chat-app-token");
        if(token) {
            SetToken(token);
        } else {
            router.push("/signin");
        }

        const ws = new WebSocket(`${WS_URL}?token=${token}`);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }
    }, []);

    return {
        socket,
        loading
    }
}