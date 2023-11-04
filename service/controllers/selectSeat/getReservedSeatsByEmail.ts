import { Response, Request } from "express";
import { messageGenerator } from "../../messageGenerator/messageGenerator";
import { getUserIdFromEmail } from "../../dataService/seatsDb/getUserIdFromEmail";
import { getSeatsByUserId } from "../../dataService/seatsDb/getSeatsByUserId";

export async function getReservedSeatsByEmailController(req:Request, res:Response){ 
    try{ 
        const  email = req.get("email");

        const userId = await getUserIdFromEmail(email!)


        const seats = await getSeatsByUserId(userId!);
        
        res.status(200).json({...messageGenerator(`Reserved seats for user ${email}`), seats})

    }catch(err){ 
        console.error(err)
        res.status(500).json(messageGenerator("Error on fetching reserved seats"))
    }

}
