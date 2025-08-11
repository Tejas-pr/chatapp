import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket() {
    const [loading, setLoading] = useState<boolean>(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        // add token
        // first store the token in local
        const ws = new WebSocket(WS_URL);
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