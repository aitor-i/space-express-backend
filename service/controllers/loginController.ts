import { Response, Request } from "express";

import { findUser } from "../dataService/findUser";
import { UserModel } from "../../domain/models/userModel";
import { passwordHasher } from "../../application/passwordHasher/passwordHasher";

interface LoginViewModel {
  email: string;
  password: string;
}

export async function loginValidation(
  credentials: LoginViewModel,
  userFromDb: UserModel,
) {
  const hashPassword = await passwordHasher(credentials.password);

  if (hashPassword !== userFromDb.password) {
    console.log("Invalid Password!");
    return false;
  }

  return true;
}

export function messageGenerator(message: string) {
  interface ResponseMessage {
    message: string;
  }
  return { message } as ResponseMessage;
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
  } catch (err: Error | unknown) {
    console.log(err);
    res.status(500).json({ message: "Error on log in" });
  }
}
