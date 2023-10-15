import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface UsernameToken {
  username: string;
}

const SECRET_KEY = process.env.TOKEN_PASSWORD as string;

class Token {
  token: string;

  constructor() {
    this.token = "";
  }

  generateToken(username: string) {
    this.token = jwt.sign({ username }, SECRET_KEY, {
      expiresIn: "30min",
    });
  }
  getUser(token: string) {
    const tokenObject = jwt.verify(token, SECRET_KEY) as UsernameToken;
    if (!tokenObject) throw new Error("Error on get user from token");
    return tokenObject!.username!;
  }

  getToken() {
    return this.token;
  }
}

export default Token;
