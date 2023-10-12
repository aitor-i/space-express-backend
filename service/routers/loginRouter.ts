import { Router, Response, Request } from "express";

export const loginRouter = Router();

loginRouter.get('/', (req:Request, res:Response)=>{ 
    res.status(200).json({message:"Service running"})
    
})
