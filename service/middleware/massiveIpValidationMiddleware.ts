import { Request, Response, NextFunction } from "express";
import { ipValidation } from "./ipValidation";
import { messageGenerator } from "../messageGenerator/messageGenerator";


export async function massiveIpValidationMiddleware (req:Request, res:Response, next:NextFunction) { 
    try{ 
        const ip = req.ip

        await ipValidation(ip)
        next()

    }catch{ 
        res.status(500).json(messageGenerator("Error on validation!"))
    }
}
