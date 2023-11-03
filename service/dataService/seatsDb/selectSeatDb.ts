import { ObjectId, WithId } from 'mongodb';
import { getPointer, mongoClient, seatsCollection } from '../mongoClient';
import { SeatModel } from '../../../domain/models/seatModel';
import { SeatsDocument } from '../../../application/mappers/seatsMapper/seatsMapper';

export interface SelectSeatDbProps {
    userId: ObjectId;
    flightId: string;
    seatNumber: number;
}

export async function selectSeatDb(props: SelectSeatDbProps) {
    try {
        const { userId, flightId, seatNumber } = props;
        await mongoClient.connect();
        const seatsPointer = getPointer(seatsCollection);

        const seatToSelect = (await seatsPointer.findOne({ seatNumber: seatNumber, flightId: flightId } as SeatModel)) as WithId<SeatsDocument>;

        if (!seatToSelect.free) return false;
        if (!seatToSelect) {
            throw new Error('No seat found');
        } else {
            await mongoClient.connect();
            const dbResponseOnUpdate = await seatsPointer.updateOne(
                { _id: seatToSelect._id },
                { $set: { userId: userId, free: false, reservationDate: new Date() } as Partial<SeatModel> }
            );
            return dbResponseOnUpdate.acknowledged;
        }
    } catch (err: Error | unknown) {
        console.error(err);
        return false;
    } finally {
        setTimeout(() => {
            mongoClient.close();
            console.log('Db closed');
        }, 6000);
    }
}
