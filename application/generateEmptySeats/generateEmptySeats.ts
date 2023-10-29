import { SeatModel } from "../../domain/models/seatModel";

export function generateEmptySeatsForId(flightId: string) {
  const seatsList = [] as SeatModel[];
  for (let i = 1; i <= 20; i++) {
    const seat: SeatModel = {
      flightId: flightId,
      free: true,
      seatNumber: i,
      userId: undefined,
      reservationDate: null,
    };
    seatsList.push(seat);
  }
  return seatsList;
}
