import { usersCollection, mongoClient, getPointer } from "./mongoClient";

export interface UserModel {
  username: string;
  password: string;
  email: string;
}

export async function insetUser(user: UserModel) {
  try {
    await mongoClient.connect();
    const userPointer = getPointer(usersCollection);

    const isUser = await userPointer.findOne({ email: user.email });
    if (isUser) {
      console.log(`User ${user.username} is taken!`);
      throw new Error(`User name ${user.username} is taken!`);
    }
    const dbResponse = await userPointer.insertOne(user);
    if (!dbResponse.acknowledged) throw new Error("Error on user  db");

    return dbResponse;
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
