import { Request, Response, Router } from "express";
import { messageGenerator } from "../messageGenerator/messageGenerator";
import { findUser } from "../dataService/findUser";
import { getUserIdFromEmail } from "../dataService/seatsDb/getUserIdFromEmail";
import { getFlightsByUserId } from "../dataService/seatsDb/getFlightsFromUserId";

export const chatRouter = Router();

chatRouter.get("/roomOptions", getRoomOptionsController)

export async  function getRoomOptionsController(req:Request, res:Response){ 
    
    try { 
        const cookie = req.cookies;
        const email = cookie.spaceExpress;

        //const user = await findUser(email)
        const userId = await getUserIdFromEmail(email);

        if(!userId) { 
            res.status(403).json(messageGenerator("Not user found!"))
            return
        }
        const flights = await getFlightsByUserId(userId);
         

        res.status(200).json({...messageGenerator("Flights"), flights})
        


    }catch{ 

        res.status(500).json(messageGenerator("Error on geting room options"))
    }

}
