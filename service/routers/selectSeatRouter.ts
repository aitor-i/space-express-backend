import { Router, Response, Request } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { getSeatsController } from "../controllers/selectSeat/getSeatsController";

export const selectSeatRouter = Router();

selectSeatRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Select seat service is up running" });
});
selectSeatRouter.use(authMiddleware);
selectSeatRouter.get("/getSeats", getSeatsController);
