import { seatsCollection, mongoClient, getPointer } from './../mongoClient';

import { SeatModel } from '../../../domain/models/seatModel';
import { ObjectId, WithId } from 'mongodb';
import { SeatsDocument, seatsMapper } from '../../../application/mappers/seatsMapper/seatsMapper';

export async function getSeatsByUserId(userId: ObjectId) {
    try {
        await mongoClient.connect();
        const seatsPointer = getPointer(seatsCollection);

        const seats = (await seatsPointer.find({ userId: userId } as Partial<SeatModel>).toArray()) as WithId<SeatsDocument>[];

        return seatsMapper(seats);

    } catch (err: Error | unknown) {
        console.error(err);
        return [];

    } finally {
        await mongoClient.close()
        console.log("Close seats collection!")
    }
}
