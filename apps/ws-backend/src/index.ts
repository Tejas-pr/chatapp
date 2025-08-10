import { WebSocket, WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/secret";
import { prismaClient } from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 });

interface User {
    ws: WebSocket,
    rooms: string[],
    userId: string
}

// ugly - 1st approch
const users: User[] = [];

function checkUSer(token: string): string | null | undefined {
  try {
    const decode = jwt.verify(token, JWT_SECRET);
    console.log("the decoded user is : ==============",decode);

    if(typeof decode == "string") {
      return null;
    }

    if(!decode || !decode.userId) {
      return null;
    }
    return decode.userId;

  } catch(e) {
    return null;
  }
}

wss.on('connection', function connection(ws, request) {
  const url = request.url;
  if(!url) {
    return;
  }
  const queryParam = new URLSearchParams(url.split("?")[1]);
  const token = queryParam.get("token") || "";
  
  const userId = checkUSer(token);
  if(!userId) {
    ws.close();
    return;
  }

  users.push({
    userId,
    ws,
    rooms: [],
  })

  ws.on('message', async function message(data) {
    const parsedData = JSON.parse(data as unknown as string);

    if(parsedData.type === 'join_room') {
      const user = users.find(x => x.ws === ws);
      user?.rooms.push(parsedData.roomId);
    }

    if(parsedData.type === 'leave_room') {
      const user = users.find(x => x.ws === ws);
      if(!user) {
        ws.send("no such user");
        return;
      }
      user.rooms = user?.rooms.filter(x => x !== parsedData.roomId);
    }

    if(parsedData.type === 'chat') {
      const roomId = parsedData.roomId;
      const message = parsedData.message;

    //   use queue to do the DB so you can reduce the delay in the websocket
      const created = await prismaClient.chat.create({
        data: {
          roomId,
          message,
          userId
        }
      })

      if(created) {
        // broadchat to everyone
        users.forEach(user => {
            if(user.rooms.includes(roomId)) {
            user.ws.send(JSON.stringify({
                type: "chat",
                message: message,
                roomId
            }))
            }
        })
      } else {
        ws.send("unable to save the message in DB");
      }
    }
    
  });
});