import { usersCollection, mongoClient, getPointer } from './mongoClient';
interface UserDocument extends Document, UserModel {}

import { UserModel } from '../../domain/models/userModel';

export async function insetUser(user: UserModel) {
    try {
        await mongoClient.connect();
        const userPointer = getPointer(usersCollection);

        console.log('CONNECTED!');

        const isUser = await userPointer.findOne({ email: user.email });
        if (isUser) {
            console.error(`Email ${user.email} is taken!`);
            return { isValid: false, message: 'Email is taken!' };
        }

        const dbResponse = await userPointer.insertOne(user);
        if (!dbResponse.acknowledged) {
            console.error('DB response: ', dbResponse);
            throw new Error('Error on user  db');
        }
        return { isValid: true, message: 'User inseted' };
    } catch (error: Error | unknown) {
        console.error('Error adding user', Error);
        throw new Error('Error inserting user');
    } finally {
        setTimeout(async () => {
            await mongoClient.close();
            console.log('Db closed');
        }, 4000);
    }
}
