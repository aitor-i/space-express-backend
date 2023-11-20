import { Router, Response, Request } from 'express';
import { registerController } from '../controllers/registerController';
import { loginController } from '../controllers/loginController';
import { validateTokenController } from '../controllers/validateTokenController';
import { changePasswordController } from '../controllers/changePasswordController';
import { ipRegistrationMiddleware } from '../middleware/ipRegistretionMiddleware';
import { massiveIpValidationMiddleware } from '../middleware/massiveIpValidationMiddleware';

export const loginRouter = Router();

loginRouter.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Service running' });
});

loginRouter.post('/validate-token', validateTokenController);
loginRouter.use(ipRegistrationMiddleware);
loginRouter.use(massiveIpValidationMiddleware);
loginRouter.post('/register', registerController);
loginRouter.post('/login', loginController);
loginRouter.post('/change-password', changePasswordController);
