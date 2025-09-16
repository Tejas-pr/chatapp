import { NextFunction, Request, Response } from "express";
import { auth, fromNodeHeaders } from "@repo/auth/auth";
import { userSessionType } from "@repo/common/type/session";

declare global{
    namespace Express{
        interface Request {
            user?: userSessionType
        }
    }
}

export async function middleware(req: Request, res: Response, next: NextFunction) {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers)
    });

    if(!session) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    if(session) {
        req.user = session.user;
        next();
    } else {
        res.status(403).json({
            "message": "Unauthorized!!!!"
        })
    }
}