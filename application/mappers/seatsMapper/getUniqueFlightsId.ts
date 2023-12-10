import { WithId } from 'mongodb';
import { SeatModel } from '../../../domain/models/seatModel';

export interface SeatsDocument extends SeatModel, Document {}

export function getUniqueFlightsId(seats: WithId<SeatsDocument>[]) {
    const seatsViewModel = seats.map(seat => {
        const { flightId } = seat;
        return flightId;
    });

    const uniqueFlightIds =  new Array (new Set(seatsViewModel))
    return uniqueFlightIds;
}
