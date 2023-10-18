import { usersCollection, mongoClient, getPointer } from "./mongoClient";

import { UserModel } from "../../domain/models/userModel";

export async function insetUser(user: UserModel) {
  try {
    await mongoClient.connect();
    const userPointer = getPointer(usersCollection);

    const isUser = await userPointer.findOne({ email: user.email });
    if (isUser) {
      console.log(`Email ${user.email} is taken!`);
        return {isValid: false, message:"Email is taken!"}
    }
    const dbResponse = await userPointer.insertOne(user);
    if (!dbResponse.acknowledged) throw new Error("Error on user  db");

    return {isValid:true, message:"User inseted"};
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
