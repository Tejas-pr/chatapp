import express from "express";
import { CreateRoomSchema, CreateUserSchema, SignInUserSchema } from "@repo/common/types";
import { JWT_SECRET, CORS_ORIGIN_FE, PORT_BE } from "@repo/backend-common/secret";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";
import { prismaClient } from "@repo/db/client";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.listen(PORT_BE, () => {
  console.log(`Server running on ${PORT_BE}`);
});

app.post("/room", middleware, async (req, res) => {
    try{
        const parsedData = CreateRoomSchema.safeParse(req.body);
        if(!parsedData.success) {
            res.status(400).json({
                message: "invalid credentials"
            })
            return;
        }

        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const userId = req.user.id;

        const isRoom = await prismaClient.room.findFirst({
            where: {
                slug: parsedData.data.name
            }
        })

        if(isRoom) {
            res.status(400).json({
                message: "room already exists!!"
            })
            return;
        }

        const room = await prismaClient.room.create({
            data: {
                slug: parsedData.data.name,
                adminId: userId
            }
        })

        if(room) {
            res.status(200).json({
                "message": "room created successfully!!",
                room
            });
        }else {
            res.status(400).json({
                message: "fail to create a room or room already exists!!"
            })
            return;
        }
    } catch (e) {
        console.log("the error is : ", e);
    }
})

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