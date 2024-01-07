import { MongoClient, MongoClientOptions, Db } from 'mongodb';

import dotenv from 'dotenv';

dotenv.config();

const mongoClientOptions: MongoClientOptions = {};

const mongoUri = process.env.MONGO_URI;

const uri = mongoUri!;

export const mongoClient: MongoClient = new MongoClient(uri, mongoClientOptions);

export const dbName = 'auth-db';

export const usersCollection = 'users';
export const invitationsCollection = 'invitations';
export const seatsCollection = 'seats';
export const ipCollection = 'ip';
export const ipBlackListCollection = 'black-list';
export type Collections =
    | typeof usersCollection
    | typeof invitationsCollection
    | typeof seatsCollection
    | typeof ipCollection
    | typeof ipBlackListCollection;

export function getPointer(collection: Collections) {
    try{ 

        const database: Db = mongoClient.db(dbName);
        return database.collection(collection);
    }catch(err){ 
        console.error("Error getting pointer")
        throw new Error("Error on getting pointer")
    }
}
