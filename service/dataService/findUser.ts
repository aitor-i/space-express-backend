import { Document, WithId } from "mongodb";
import { usersCollection, mongoClient, getPointer } from "./mongoClient";

import { UserModel } from "../../domain/models/userModel";

interface UserDocument extends Document, UserModel {}

export async function findUser(email: string) {
  try {
    await mongoClient.connect();
    const userPointer = getPointer(usersCollection);

    let user: UserModel;
    const userDocument: WithId<UserDocument> | null = await userPointer.findOne(
      { email: email },
    );
    if (!userDocument) throw new Error("Invalid username or passwod");
    else if (userDocument) {
      user = { ...userDocument };
      return user;
    }
  } catch (error: Error | unknown) {
    console.log(Error.toString());
    throw new Error(Error.toString());
  } finally {
    setTimeout(async () => {
      await mongoClient.close();
      console.log("Db closed");
    }, 4000);
  }
}
