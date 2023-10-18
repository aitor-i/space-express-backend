import { Request, Response } from "express";
import { passwordHasher } from "../../application/passwordHasher/passwordHasher";
import { insetUser } from "../dataService/insertUser";
import { messageGenerator } from "../messageGenerator/messageGenerator";
import { generateToken } from "../../application/generateToken/generateToken";

interface RegisterViewModel {
  username: string;
  password: string;
  email: string;
}

export async function registerController(req: Request, res: Response) {
  try {
    const { username, password, email } = req.body as RegisterViewModel;

    const hashedPassword = await passwordHasher(password);

    const dbResponse = await insetUser({ username, password: hashedPassword, email });

    if(!dbResponse.isValid) { 
        
    console.log(dbResponse)
        res.status(418).json({...messageGenerator(dbResponse.message), username})
            return
        } 

    const token = generateToken(email);

    res.status(202).json({...messageGenerator(`User ${username} register!`), token, username});
  } catch {
    res.status(500).json({ message: "Error on sign in!" });
  }
}
