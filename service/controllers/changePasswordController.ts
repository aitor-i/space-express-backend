import { Request, Response } from 'express';

import { messageGenerator } from '../messageGenerator/messageGenerator';
import { findUser } from '../dataService/findUser';
import { loginValidation } from '../../application/loginValidator/loginValidator';
import { LoginViewModel } from './loginController';
import { passwordHasher } from '../../application/passwordHasher/passwordHasher';
import { updatePassword } from '../dataService/updatePassword';

interface ChangePasswordRequestBody {
    email: string;
    oldPassword: string;
    newPassword: string;
}

export async function changePasswordController(req: Request, res: Response) {
    try {
        const { email, oldPassword, newPassword } = req.body as ChangePasswordRequestBody;

        const credentials: LoginViewModel = { email, password: oldPassword };

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

        const newPasswordHashed = await passwordHasher(newPassword);
        const isChangeSuccessfull = await updatePassword(email, newPasswordHashed);

        if (!isChangeSuccessfull) {
            res.status(500).json(messageGenerator('Error changin the password'));
        }
        res.status(202).json({
            ...messageGenerator('Password changed successfully!'),
            isSuccess: true
        });
    } catch (err: Error | unknown) {
        console.error(err);
        res.status(500).json(messageGenerator('Error on password changing!'));
    }
}
