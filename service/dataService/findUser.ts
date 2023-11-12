import { Document, WithId } from 'mongodb';
import { usersCollection, mongoClient, getPointer } from './mongoClient';

import { UserModel } from '../../domain/models/userModel';

interface UserDocument extends Document, UserModel {}

export async function findUser(email: string) {
    try {
        await mongoClient.connect();
        const userPointer = getPointer(usersCollection);


        let user: UserModel;
        //console.log("mongo client", mongoClient)
        const userDocument= await userPointer.findOne({ email: email }).catch((err)=>console.error(err) ) as WithId<UserDocument> ;
        if (userDocument) {
            user = { ...userDocument };
            return user;
        }
        return null
    } catch (error: Error | unknown) {
        console.log(Error.toString());
        console.log("error on finding user")
        return null
    } finally {
        setTimeout(async () => {
            await mongoClient.close();
            console.log('Db closed');
        }, 8000);
    }
}
