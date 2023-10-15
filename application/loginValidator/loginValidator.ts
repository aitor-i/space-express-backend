import { passwordHasher } from "../passwordHasher/passwordHasher";

import { UserModel } from "../../domain/models/userModel";
import { LoginViewModel } from "../../service/controllers/loginController";

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
