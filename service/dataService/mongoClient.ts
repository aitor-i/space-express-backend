import { MongoClient, MongoClientOptions, Db } from "mongodb";
import {} from "dotenv/config";

const mongoClientOptions: MongoClientOptions = {};

const username = process.env.MONGO_ROOT_USERNAME;
const password = process.env.MONGO_ROOT_PASSWORD;

console.log("DB username:", username);

const uri = `mongodb://${username}:${password}@localhost:27017`;

export const mongoClient: MongoClient = new MongoClient(
  uri,
  mongoClientOptions,
);

export const dbName = "auth-db";

export const usersCollection = "users";
export const invitationsCollection = "invitations";
export type Collections = typeof usersCollection | typeof invitationsCollection;

export function getPointer(collection: Collections) {
  const database: Db = mongoClient.db(dbName);
  return database.collection(collection);
}
