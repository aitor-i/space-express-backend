import { Response, Request } from "express";

import { messageGenerator } from '../../messageGenerator/messageGenerator';
import { getUserIdFromEmail } from "../../dataService/seatsDb/getUserIdFromEmail";
import { SelectSeatDbProps, selectSeatDb } from "../../dataService/seatsDb/selectSeatDb";

interface SelectSeat { 
    userEmail:string,
    flightId:string,
    seatNumber:number
}

export async function selectSeatController(req:Request, res:Response){ 
    try{ 

    const {flightId, seatNumber, userEmail} = req.body as SelectSeat

    const userId = await getUserIdFromEmail(userEmail)
        if(userId === null) { 

            res.status(403).json(messageGenerator(`Not user found for email: ${userEmail}`))
            return
        }

        const selectSeatProps: SelectSeatDbProps = { userId, seatNumber,  flightId}
        const isSuccessful = await selectSeatDb(selectSeatProps);
        if(!isSuccessful){ 
            res.status(500).json(messageGenerator("Error selecting seat!"))
            return
        }

        res.status(202).json({...messageGenerator(`Seat ${seatNumber}, selected!`), isSuccess:isSuccessful})

    }catch(err){ 
        console.error(err)
        res.status(500).json(messageGenerator("Error on message selection"))

    }

}
