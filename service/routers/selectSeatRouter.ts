import { Router, Response, Request } from "express";
import { authMiddleware } from "../middleware/authMiddleware";

export const selectSeatRouter = Router();

selectSeatRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Select seat service is up running" });
});
selectSeatRouter.use(authMiddleware);
selectSeatRouter.get("/td", (req:Request, res:Response)=>{ 
    try{
       res.status(200).send({})
    
    }catch(err:Error|unknown){ 
        console.error(err)
        res.status(500).json({message:"error"})
    }
})
