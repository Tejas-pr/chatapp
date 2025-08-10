import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/secret";

export function middleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["authorization"] ?? "";
    const decode = jwt.verify(token, JWT_SECRET);
    console.log("the decode=================", decode)

    if(decode) {
        // @ts-ignore - fix this
        req.userId = decode;
        next();
    } else {
        res.status(403).json({
            "message": "Unauthorized!!!!"
        })
    }
}