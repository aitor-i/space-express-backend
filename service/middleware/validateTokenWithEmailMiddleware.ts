import { Response, Request, NextFunction } from 'express';
import { isTokenExpired } from '../../application/isTokenExpired/isTokenExpired';
import { messageGenerator } from '../messageGenerator/messageGenerator';
import { getEmailFromToken } from '../../application/isTokenExpired/getEmailFromToken';

export function validateTokenWithEmailMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.get('token');
        const cookies = req.cookies;
        const email = cookies.spaceExpress;
        console.log(email, cookies, email);

        if (!email) {
            res.status(400).json(messageGenerator('email header is needed!'));
            return;
        }

        if (!token) {
            res.status(403).json({ message: 'Token not found!!' });
            return;
        }

        const isExpired = isTokenExpired(token.toString());
        if (isExpired) {
            res.status(403).json({ ...messageGenerator('Token has spired'), isValid: !isExpired });
            return;
        }

        const emailFromToken = getEmailFromToken(token);
        if (email !== emailFromToken) {
            res.status(403).json({ ...messageGenerator("Email and token doesn't match"), isValid: false });
            return;
        }

        next();
    } catch (err: Error | unknown) {
        console.error(err);
        res.status(500).json(messageGenerator('Error an authentification'));
    }
}
