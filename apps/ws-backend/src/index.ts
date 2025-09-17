import { WebSocket, WebSocketServer } from "ws";
import { prismaClient } from "@repo/db";
import { getSessionFromRequest } from "./session";
import { Queue } from "bullmq";
import { redisConnection } from "@repo/backend-common/secret";

const wss = new WebSocketServer({ port: 8080 });
const chatQueue = new Queue("chat-queue", {
  connection: redisConnection
})

interface User {
  ws: WebSocket;
  rooms: string[];
  userId: string;
}

const users: User[] = [];

wss.on("connection", async (ws, request) => {
  const session = await getSessionFromRequest(request);
  const userId = session?.user.id;
  console.log("userId", typeof(userId))
  console.log("userId", userId)

  if (!userId) {
    console.log("Close!!!!!");
    ws.close();
    return;
  }

  // Remove old entry if user reconnects
  const existingIndex = users.findIndex(u => u.userId === userId);
  if (existingIndex !== -1) {
    users.splice(existingIndex, 1);
  }

  const user: User = { userId, ws, rooms: [] };
  users.push(user);

  ws.on("close", () => {
    const idx = users.findIndex(u => u.ws === ws);
    if (idx !== -1) {
      users.splice(idx, 1);
    }
  });

  ws.on("message", async data => {
    const parsedData = JSON.parse(data.toString());
    console.log("the parsed data is :::::::::", parsedData);
    console.log("the parsed data is :::::::::", parsedData.type);

    if (parsedData.type === "join_room") {
      const roomId = String(parsedData.roomId);
      if (!user.rooms.includes(roomId)) {
        user.rooms.push(roomId);
      }
      console.log("User joined room:", user.rooms);
    }

    if (parsedData.type === "leave_room") {
      const roomId = String(parsedData.roomId);
      user.rooms = user.rooms.filter(x => x !== roomId);
    }

    if (parsedData.type === "chat") {
      const roomId = String(parsedData.roomId);
      const message = parsedData.message;
      console.log("roomId:", roomId, "message:", message);

      await chatQueue.add("new-message", {
        roomId,
        message,
        userId
      })
      users.forEach((u) => {
        if(u.rooms.includes(roomId)) {
          u.ws.send(
            JSON.stringify({
              type: "chat",
              message,
              roomId,
              userId,
              createdAt: new Date().toISOString(),
            })
          )
        }
      })
    }
  });
});
