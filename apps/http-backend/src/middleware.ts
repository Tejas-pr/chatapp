import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
require('dotenv').config();

export function middleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["authorization"] ?? "";
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET environment variable is not set');
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if(decode) {
        // @ts-ignore - fix this
        req.userId = decode.userId;
        next();
    } else {
        res.status(403).json({
            "message": "Unauthorized!!!!"
        })
    }
}