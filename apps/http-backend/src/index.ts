import express from "express";
import { CreateUserSchema, SignInUserSchema } from "@repo/common/types";
import { JWT_SECRET } from "@repo/backend-common/secret";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";

const app = express();

app.post("/signup", (req, res) => {
    try {
        const parsedData = CreateUserSchema.safeParse(req.body);
        if(!parsedData) {
            res.status(400).json({
                message: "invalid credentials"
            })
            return;
        }

        // const { username, password, email } = parsedData.data;
    } catch (e) {

    }
})

app.post("/signin", (req, res) => {
    try {
        const parsedData = SignInUserSchema.safeParse(req.body);

        if(!parsedData.success) {
            res.status(400).json({
                message: "invalid credentials"
            })
            return;
        }

        const { email, password } = parsedData.data;
    } catch (e) {

    }
})

app.post("/room", middleware, (req, res) => {
})

app.listen(3001);