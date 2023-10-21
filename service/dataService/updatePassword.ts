import { usersCollection, mongoClient, getPointer } from "./mongoClient";

import { Document, WithId } from "mongodb";
import { UserModel } from "../../domain/models/userModel";

interface UserDocument extends Document, UserModel {}

export async function updatePassword(email: string, password: string) {
  try {
    await mongoClient.connect();
    const userPointer = getPointer(usersCollection);

    const userDocument: WithId<UserDocument> | null = await userPointer.findOne(
      { email: email },
    );
    if (!userDocument) throw new Error("Invalid username or passwod");
    else if (userDocument) {
      await userPointer.updateOne(
        { _id: userDocument._id },
        { $set: { password: password } as Partial<UserDocument> },
      );
      console.log("Password changed");
      return true;
    }
  } catch (error: Error | unknown) {
    console.log(Error.toString());
    throw new Error("Error inserting user");
  } finally {
    setTimeout(async () => {
      await mongoClient.close();
      console.log("Db closed");
    }, 4000);
  }
}
