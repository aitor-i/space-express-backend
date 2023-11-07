import { Response, Request } from 'express';

import { findUser } from '../dataService/findUser';
import { messageGenerator } from '../messageGenerator/messageGenerator';
import { loginValidation } from '../../application/loginValidator/loginValidator';
import { generateToken } from '../../application/generateToken/generateToken';

export interface LoginViewModel {
    email: string;
    password: string;
}

export async function loginController(req: Request, res: Response) {
    try {
        const credentials = req.body as LoginViewModel;

        const user = await findUser(credentials.email);
        if (!user) {
            res.status(403).json({ message: 'Invalid username or password' });
            return;
        }
        const isUserValid = await loginValidation(credentials, user);
        if (!isUserValid) {
            res.status(403).json(messageGenerator('Invalid username or password!'));
            return;
        }

        const tokenFromUser = generateToken(credentials.email);
        

        res.status(202)
            .cookie("spaceExpress", credentials.email, { maxAge: 3600000, httpOnly: false })
            .json({
                ...messageGenerator('User logged'),
                token: tokenFromUser,
                username: user.username
            }).send();
    } catch (err: Error | unknown) {
        console.log(err);
        res.status(500).json({ message: 'Error on log in' });
    }
}
