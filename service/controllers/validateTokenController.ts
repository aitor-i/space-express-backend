import { Request, Response } from "express";
import { isTokenExpired } from "../../application/isTokenExpired/isTokenExpired";
import { messageGenerator } from "../messageGenerator/messageGenerator";


export function validateTokenController (req:Request, res:Response){ 
    try{ 
        const {token: tokenToValidate}= req.body;

        if(!req.body.token) { 
            res.status(403).json(messageGenerator("No token found"))
            return
        }

        const isExpired = isTokenExpired(tokenToValidate);
        if(isExpired){
            
        res.status(403).json({...messageGenerator("Token has spired"), isValid:!isExpired})
            return
        }
        res.status(200).json({...messageGenerator("The token is still valid!"), isValid: !isExpired})
    }catch(err:Error|unknown){ 
    console.error(err)
    res.status(500).json(messageGenerator("Error velidating token!"))

    }


}
