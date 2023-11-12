import { Request, Response, NextFunction } from "express";
import { IpModel, insertIpDb } from "../dataService/ipServicesDB/insertIp";
import { ipValidation } from "./ipValidation";

export async function ipRegistrationMiddleware (req:Request, res: Response, next:NextFunction){ 
    try{ 
        
        const ip = req.ip;
        const ipToSave: IpModel = {ip, requestDate: new Date()}

        const isInsertSuccessful = await insertIpDb(ipToSave);
       
        if(isInsertSuccessful) ipValidation(ip)
        next()
    }catch(err){ 
        console.error(err)
        next()
    }

}
