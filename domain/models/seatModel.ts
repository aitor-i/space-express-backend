import { ObjectId } from "mongodb";

export interface SeatModel {
  flightId: string;
  free: boolean;
  seatNumber: number;
  userId: ObjectId| undefined;
  reservationDate: Date | null;
}
