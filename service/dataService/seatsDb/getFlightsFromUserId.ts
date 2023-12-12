import { seatsCollection, mongoClient, getPointer } from './../mongoClient';

import { SeatModel } from '../../../domain/models/seatModel';
import { ObjectId, WithId } from 'mongodb';
import { SeatsDocument  } from '../../../application/mappers/seatsMapper/seatsMapper';
import { getUniqueFlightsId } from '../../../application/mappers/seatsMapper/getUniqueFlightsId';

export async function getFlightsByUserId(userId: ObjectId) {
    try {
        await mongoClient.connect();
        const seatsPointer = getPointer(seatsCollection);

        const seats = (await seatsPointer.find({ userId: userId } as Partial<SeatModel>).toArray()) as WithId<SeatsDocument>[];

        await mongoClient.close();
        return getUniqueFlightsId(seats);
    } catch (err: Error | unknown) {
        console.error("Error getting flights", err);
        return [];
    } finally {
        await mongoClient.close();
        console.log('Close seats collection!');
    }
}
