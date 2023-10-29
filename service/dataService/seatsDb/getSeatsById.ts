import { seatsCollection, mongoClient, getPointer } from "./../mongoClient";
import { generateEmptySeatsForId } from "../../../application/generateEmptySeats/generateEmptySeats";
import { SeatModel } from "../../../domain/models/seatModel";


export async function getSeatsById(flightId: string) {
  try {
    await mongoClient.connect();
    const seatsPointer = getPointer(seatsCollection);

    const seats = await seatsPointer
      .find({ flightId: flightId } as Partial<SeatModel>)
      .toArray();
    console.log("Seats: ", seats);

    if (seats.length === 0) {
      const seatsList = generateEmptySeatsForId(flightId)
      const dbResponse = await seatsPointer.insertMany(seatsList);
      console.log(dbResponse.insertedIds);
        if(!dbResponse.acknowledged) throw new Error("Error on adding emprty seats")

      return seatsList;
    }
    return seats;
  } catch (err: Error | unknown) {
    console.error(err);
    return [];
  } finally {
    mongoClient.close();
    console.log("Db closed!!");
  }
}
