import { Document, WithId } from 'mongodb';

import { usersCollection, mongoClient, getPointer } from './mongoClient';
import { UserModel } from '../../domain/models/userModel';

interface UserDocument extends Document, UserModel {}

export async function deleteUser(email: string) {
    try {
        await mongoClient.connect();
        const userPointer = getPointer(usersCollection);

        const userDocument: WithId<UserDocument> | null = await userPointer.findOne({ email: email });
        console.log(userDocument);
        if (!userDocument) throw new Error('Invalid username');
        else if (userDocument) {
            await userPointer.deleteOne({ _id: userDocument._id });
        }
    } catch (error: Error | unknown) {
        if (error) {
            console.log(error);
            throw new Error('Error on db for user delete');
        }
    } finally {
        await mongoClient.close();
    }
}
