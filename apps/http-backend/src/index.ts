import express from "express";
import { CreateRoomSchema } from "@repo/common/types";
import { PORT_BE } from "@repo/backend-common/secret";
import { middleware } from "./middleware";
import { prismaClient } from "@repo/db";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.listen(PORT_BE, () => {
  console.log(`Server running on ${PORT_BE}`);
});


app.get("/chats/:roomId", middleware, async(req, res) => {
    const roomId = Number(req.params.roomId);
    try {
        const messages = await prismaClient.chat.findMany({
            where: {
                roomId
            },
            orderBy: {
                id: "asc"
            },
            take: 50
        })

        res.status(200).json({
            messages
        })
    } catch(e) {
        res.status(411).json({
            error: e
        })
    }
});

app.get("/room/:slug", middleware, async(req, res) => {
    const slug = req.params.slug;
    try {
        const slugValue = await prismaClient.room.findFirst({
            where: {
                slug
            }
        })

        res.status(200).json({
            slugValue
        })
    } catch(e) {
        res.status(411).json({
            error: e
        })
    }
});

app.get("/allrooms", middleware, async(req, res) => {
    try {
        if(!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const userId = req.user?.id;
        const rooms = await prismaClient.room.findMany({
            where: {
                adminId: userId
            }
        });

        res.status(200).json({
            rooms
        })
    } catch(e) {
        res.status(411).json({
            error: e
        })
    }
});