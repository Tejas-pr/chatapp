import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
require('dotenv').config();

const wss = new WebSocketServer({ port: 8080 })

wss.on('connection', function connection(ws, request) {
    const url = request.url;
    if(!url) {
        return;
    }
    const queryParams = new URLSearchParams(url?.split('?')[1]);
    const token = queryParams.get("token") || "";
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET environment variable is not set');
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if(!decode || !(decode as JwtPayload).userId) {
        ws.close();
        return;
    }

    ws.on('message', function message(data) {
        ws.send('pong');
    })
})