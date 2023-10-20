import { MongoClient, MongoClientOptions, Db } from "mongodb";

import dotenv from "dotenv";

dotenv.config();

const mongoClientOptions: MongoClientOptions = {};

const mongoUri = process.env.MONGO_URI

const uri = mongoUri!;

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
