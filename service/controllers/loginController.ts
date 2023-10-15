import { Response, Request } from "express";

import { findUser } from "../dataService/findUser";
import { UserModel } from "../../domain/models/userModel";
import { messageGenerator } from "../messageGenerator/messageGenerator";
import { loginValidation } from "../../application/loginValidator/loginValidator";

import Token from "../../domain/token/token";

export interface LoginViewModel {
  email: string;
  password: string;
}

export async function loginController(req: Request, res: Response) {
  try {
    const credentials = req.body as LoginViewModel;

    const user = await findUser(credentials.email);
    if (!user) {
      res.status(403).json({ message: "Invalid username or password" });
      return;
    }
    const isUserValid = await loginValidation(credentials, user);
    if (!isUserValid) {
      res.status(403).json(messageGenerator("Invalid username or password!"));
      return;
    }

    const token = new Token();
    token.generateToken(credentials.email);
    const tokenFromUser = token.getToken();


    res.status(202).json({...messageGenerator("User loged"), token:tokenFromUser})
  } catch (err: Error | unknown) {
    console.log(err);
    res.status(500).json({ message: "Error on log in" });
  }
}
