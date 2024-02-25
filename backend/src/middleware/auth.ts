import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';

// extend the Express Request type
declare global{
    namespace Express{
        interface Request{
            userId: string;
        }
    }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["auth_token"];

    if(!token){
        return res.status(401).json({message: "unauthorized"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.userId = (decoded as JwtPayload).userId;
        next();
    } catch (error){
        return res.status(401).json({message: "unauthorized"});
    }
};

export default verifyToken;