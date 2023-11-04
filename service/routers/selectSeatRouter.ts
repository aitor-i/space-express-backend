import { Router, Response, Request } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { getSeatsController } from '../controllers/selectSeat/getSeatsController';
import { selectSeatController } from '../controllers/selectSeat/selectSeatController';
import { validateTokenWithEmailMiddleware } from '../middleware/validateTokenWithEmailMiddleware';
import { validateUserExistsMiddleware } from '../middleware/validateUserExistsMiddleware';
import {  getReservedSeatsByEmailController } from '../controllers/selectSeat/getReservedSeatsByEmail';

export const selectSeatRouter = Router();

selectSeatRouter.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Select seat service is up running' });
});
selectSeatRouter.use(authMiddleware);
selectSeatRouter.get('/getSeats', getSeatsController);
selectSeatRouter.use(validateTokenWithEmailMiddleware);
selectSeatRouter.post('/reserveSeat', selectSeatController);
selectSeatRouter.use(validateUserExistsMiddleware)
selectSeatRouter.get("/reservedSeatsByEmail", getReservedSeatsByEmailController)
