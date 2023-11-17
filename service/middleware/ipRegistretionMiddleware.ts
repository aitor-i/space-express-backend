import { Request, Response, NextFunction } from "express";
import { IpModel, insertIpDb } from "../dataService/ipServicesDB/insertIp";
import { messageGenerator } from "../messageGenerator/messageGenerator";

export async function ipRegistrationMiddleware (req:Request, res: Response, next:NextFunction){ 
    try{ 
        
        const ip = req.ip;
        const ipToSave: IpModel = {ip, requestDate: new Date()}

        const isSuccess = await insertIpDb(ipToSave);
        if (!isSuccess) { 
            res.status(500).json(messageGenerator("Validation error"))
            console.log("Error registing id!!")
            return
        }
       
        next()
    }catch(err){ 
        console.error(err)
        next()
    }

}
