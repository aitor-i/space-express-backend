import { Document, WithId } from 'mongodb';
import { ipCollection, mongoClient, getPointer } from './../mongoClient';
import { IpModel } from './insertIp';

interface IpDocument extends IpModel, Document {}

export async function getIpsByIpDb(ip: string) {
    try {
        await mongoClient.connect();
        const ipPointer = getPointer(ipCollection);

        const ips = (await ipPointer.find({ ip } as Partial<IpModel>).toArray()) as WithId<IpDocument>[];
        const mappedIp = ips.map(ipDocument => {
            return { ip: ipDocument.ip, requestDate: ipDocument.requestDate } as IpModel;
        });

        await mongoClient.close();
        return mappedIp;
    } catch (err) {
        console.error(err);
        false;
    } finally {
        await mongoClient.close();
        console.log('DB closed');
    }
}
