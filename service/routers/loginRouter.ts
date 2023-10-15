import { Router, Response, Request } from "express";
import { registerController } from "../controllers/registerController";
import { loginController } from "../controllers/loginController";

export const loginRouter = Router();

loginRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Service running" });
});

  loginRouter.post("/register", registerController);
loginRouter.post("/login", loginController);
