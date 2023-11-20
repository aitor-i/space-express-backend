import { usersCollection, mongoClient, getPointer } from './mongoClient';
interface UserDocument extends Document, UserModel {}

import { UserModel } from '../../domain/models/userModel';

export async function insetUser(user: UserModel) {
    try {
        await mongoClient.close();
        await mongoClient.connect();
        console.log('Connected user db');
        const userPointer = getPointer(usersCollection);

        const isUser = await userPointer.findOne({ email: user.email }).catch(err => console.log('Error finding user:', err));
        if (isUser) {
            console.error(`Email ${user.email} is taken!`);
            return { isValid: false, message: 'Email is taken!' };
        }
        await mongoClient.close();
        await mongoClient.connect();

        const dbResponse = await userPointer.insertOne(user).catch(err => console.log('Error adding user', err));
        if (!dbResponse?.acknowledged) {
            console.error('DB response: ', dbResponse);
            throw new Error('Error on user  db');
        }
        return { isValid: true, message: 'User inseted' };
    } catch (error: Error | unknown) {
        console.error('Error adding user', Error.name);
        return { isValid: false, message: 'Error adding user' };
    } finally {
        await mongoClient.close();
        console.log('user db closed');
    }
}
