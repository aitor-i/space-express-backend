import { Response, Request, NextFunction } from "express";
import { messageGenerator } from "../messageGenerator/messageGenerator";
import { getUserIdFromEmail } from "../dataService/seatsDb/getUserIdFromEmail";

export async function validateUserExistsMiddleware(req:Request, res:Response, next:NextFunction){ 
    try {
        const email = req.get("email")
        
        if (!email){ 
            res.status(400).json(messageGenerator("email header is needed!"))
            return
        }

        const userId = await getUserIdFromEmail(email!)
        if(userId === null){ 
            res.status(400).json(messageGenerator(`User with email ${email} does not exist`))
            return
        }


        next();
    } catch (err: Error | unknown) {
        console.error(err);
        res.status(500).json(messageGenerator('Error an authentification'));

    }
}
