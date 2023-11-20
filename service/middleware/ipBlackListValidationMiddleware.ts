import { Request, Response, NextFunction } from 'express';
import { findIpInBlackList } from '../dataService/ipServicesDB/fidIpInBlackListDb';
import { messageGenerator } from '../messageGenerator/messageGenerator';

export async function ipBlackListValidationMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const ip = req.ip;

        const isIpOnBlackList = await findIpInBlackList(ip);

        if (isIpOnBlackList) {
            res.status(400).json(messageGenerator('your ip is on a black list!'));
            return;
        } else {
            next();
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(messageGenerator('errror validating ip!'));
    }
}
