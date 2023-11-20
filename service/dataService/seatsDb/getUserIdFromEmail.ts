import { usersCollection, mongoClient, getPointer } from './../mongoClient';

import { Document, WithId } from 'mongodb';
import { UserModel } from '../../../domain/models/userModel';

interface UserDocument extends Document, UserModel {}

export async function getUserIdFromEmail(email: string) {
    try {
        await mongoClient.connect();
        const userPointer = getPointer(usersCollection);

        const userFromDb = (await userPointer.findOne({ email: email } as Partial<UserModel>)) as WithId<UserDocument>;
        if (userFromDb === null) return null;

        return userFromDb._id;
    } catch (err) {
        console.error(err);
        throw new Error('Error finding user id!');
    } finally {
        await mongoClient.close();
        console.log('Db closed!!');
    }
}
