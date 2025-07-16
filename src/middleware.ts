import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "./config";
import jwt from "jsonwebtoken"

// Extend Express Request interface to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const userMiddleware=(req: Request,res: Response,next:NextFunction)=>{
    const headers = req.headers["authorization"];

    const decode = jwt.verify(headers as string, JWT_SECRET);

    if (decode && typeof decode === "object" && "id" in decode) {
        req.userId = (decode as jwt.JwtPayload).id as string;
        next();
    } else {
        res.json({
            message: "You are not logged in"
        });
    }
}