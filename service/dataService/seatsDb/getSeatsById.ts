import { ObjectId } from "mongodb";
import { seatsCollection, mongoClient, getPointer } from "./../mongoClient";

interface SeatModel { 
    flightId: string,
    free: boolean,
    seatNumber: number,
    userId: ObjectId | undefined,
    reservationDate: Date | null,
}

export async function getSeatsById(fligthId:string){ 
    try{ 
        await mongoClient.connect();
        const seatsPointer = getPointer(seatsCollection);

        const seats = await seatsPointer.find({flightId:fligthId} as Partial<SeatModel>).toArray()
        console.log("Seats: ", seats);

        if(seats.length === 0){ 
            const seatsList = [] as SeatModel[]    
            for (let i = 1; i <= 20; i++) {

                const seat: SeatModel = {flightId: fligthId, free:true, seatNumber:i, userId:undefined, reservationDate:null}
                seatsList.push(seat)
            }
            const dbResponse = await seatsPointer.insertMany(seatsList)
            console.log(dbResponse.insertedIds)

           return seatsList;
        }
    return seats;

    }catch(err:Error|unknown){ 
        console.error(err)
        return []
    } finally{ 
    
        mongoClient.close()
        console.log("Db closed!!")
    }
}
