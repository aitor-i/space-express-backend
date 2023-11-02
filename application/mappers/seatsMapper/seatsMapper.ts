import { WithId } from 'mongodb';
import { SeatModel } from '../../../domain/models/seatModel';

export interface SeatsDocument extends SeatModel, Document {}

export function seatsMapper(seats: WithId<SeatsDocument>[]) {
    const seatsViewModel = seats.map(seat => {
        const { _id, userId,  ...seatVM } = seat;
        return seatVM;
    });
    return seatsViewModel;
}
