import { Document, WithId } from 'mongodb';
import { usersCollection, mongoClient, getPointer } from './mongoClient';

import { UserModel } from '../../domain/models/userModel';

interface UserDocument extends Document, UserModel {}

export async function findUser(email: string) {
    try {
        await mongoClient.close()
        await mongoClient.connect();

        const userPointer = getPointer(usersCollection);

        let user: UserModel;
        const userDocument= await userPointer.findOne({ email: email }) as WithId<UserDocument> ;
        if (userDocument) {
            user = { ...userDocument };
            return user;
        }
        return null
    } catch (error: Error | unknown) {
        return null
    } finally {
        await mongoClient.close()
    }
}
