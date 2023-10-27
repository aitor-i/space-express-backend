import { Request, Response, NextFunction } from "express";
import { isTokenExpired } from "../../application/isTokenExpired/isTokenExpired";
import { messageGenerator } from "../messageGenerator/messageGenerator";

export function authMiddleware (req:Request, res:Response, next:NextFunction){ 
    
    try{ 

    const token = req.get("token")

    if(!token) { 
        res.status(403).json({message:"Token not found!!"})
        return
    }

    const isExpired = isTokenExpired(token.toString());
    if (isExpired) {
        res
            .status(403)
            .json({ ...messageGenerator("Token has spired"), isValid: !isExpired });
        return;
    }

    next();

    }catch(err:Error|unknown){ 
        console.error(err)
        res.status(500).json(messageGenerator("Error an authentification"))
    }
}
