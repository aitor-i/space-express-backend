import { Request, Response } from "express";
import { passwordHasher } from "../../application/passwordHasher/passwordHasher";
import { insetUser } from "../dataService/insertUser";
import { messageGenerator } from "../messageGenerator/messageGenerator";

interface RegisterViewModel {
  username: string;
  password: string;
  email: string;
}

export async function registerController(req: Request, res: Response) {
  try {
    const { username, password, email } = req.body as RegisterViewModel;

    const hashedPassword = await passwordHasher(password);

    await insetUser({ username, password: hashedPassword, email });

    res.status(202).json(messageGenerator(`User ${username} register!`));
  } catch {
    res.status(500).json({ message: "Error on sign in!" });
  }
}
