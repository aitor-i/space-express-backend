import { ObjectId, WithId } from "mongodb";
import { getPointer, mongoClient, seatsCollection } from "../mongoClient";
import { SeatModel } from "../../../domain/models/seatModel";
import { SeatsDocument } from "../../../application/mappers/seatsMapper/seatsMapper";

export async function selectSeatDb(userId:ObjectId, flightId:string, seatNumber:number){ 

    try {
        await mongoClient.connect();
        const seatsPointer = getPointer(seatsCollection);

        const seatToSelect = await seatsPointer.findOne({seatNumber:seatNumber, flightId:flightId} as SeatModel) as WithId<SeatsDocument>

        const dbResponseOnUpdate = await seatsPointer.updateOne({_id: seatToSelect._id}, {$set: {userId: userId, free:false, reservationDate: new Date() }  as Partial<SeatModel>})

        return dbResponseOnUpdate.acknowledged

    } catch (err: Error | unknown) {
        console.error(err);
        return false;
    } finally {
        setTimeout(()=> {
            mongoClient.close();
            console.log('Db closed!!');
        }, 3000)
    }
}
