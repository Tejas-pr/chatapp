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

app.post("/signup", async (req, res) => {
    try {
        const parsedData = CreateUserSchema.safeParse(req.body);
        
        if(!parsedData.success) {
            res.status(400).json({
                message: "invalid credentials"
            })
            return;
        }

        const { name, password, email } = parsedData.data;

        const existingUser = await prismaClient.user.findFirst({
            where: {
                email
            }
        })
        
        if(existingUser) {
            res.status(400).json({
                "message": "User already exists!!!"
            })
            return;
        }

        const newUser = await prismaClient.user.create({
            data: {
                email,
                password,
                name
            }
        })

        if(newUser) {
            res.status(200).json({
                "message": "User successfully created!!"
            })
        }
    } catch (e) {
        console.log("the error is : ", e);
    }
})

app.post("/signin", async(req, res) => {
    try {
        const parsedData = SignInUserSchema.safeParse(req.body);

        if(!parsedData.success) {
            res.status(400).json({
                message: "invalid credentials"
            })
            return;
        }

        const { email, password } = parsedData.data;

        const existingUser = await prismaClient.user.findFirst({
            where: {
                email,
                password
            }
        })
        console.log("the existingUser is", existingUser);
        
        if(existingUser) {
            const token = jwt.sign({
                userId: existingUser?.id
            }, JWT_SECRET);
            
            res.status(200).json({
                "message": "Signin successfully!!",
                token
            });
        } else {
            res.status(404).json({
                "message": "User don't exists!!"
            });
        }

    } catch (e) {
        console.log("the error is : ", e);
    }
})

app.post("/room", middleware, async (req, res) => {
    try{
        const parsedData = CreateRoomSchema.safeParse(req.body);
        if(!parsedData.success) {
            res.status(400).json({
                message: "invalid credentials"
            })
            return;
        }
        // @ts-ignore
        const userId = req.userId;

        const room = await prismaClient.room.create({
            data: {
                slug: parsedData.data.name,
                adminId: userId
            }
        })

        if(room) {
            res.status(200).json({
                "message": "room created successfully!!",
                room: room.id
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

app.get("/chats/:roomId", async(req, res) => {
    const roomId = Number(req.params.roomId);
    try {
        const messages = await prismaClient.chat.findMany({
            where: {
                roomId
            },
            orderBy: {
                id: "desc"
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

app.get("/room/:slug", async(req, res) => {
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