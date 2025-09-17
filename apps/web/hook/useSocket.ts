import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket() {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    setSocket(ws);

    ws.onopen = () => setLoading(false);
    ws.onclose = () => setLoading(true);

    return () => ws.close();
  }, []);

  return { socket, loading };
}
