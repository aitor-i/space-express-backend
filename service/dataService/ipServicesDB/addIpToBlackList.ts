import { ipBlackListCollection, mongoClient, getPointer } from './../mongoClient';

export async function addIpToBlackList(ip: String) {
    try {
        console.log('adding ip to black list');
        await mongoClient.connect();
        console.log('connected');
        const blackListPointer = getPointer(ipBlackListCollection);

        const ipToInsert = { ip: ip };
        const dbResponse = await blackListPointer.insertOne(ipToInsert);

        console.log('is ip added to vblack list', dbResponse.acknowledged);

        return dbResponse.acknowledged;
    } catch (err) {
        console.error(err);
        false;
    } finally {
        await mongoClient.close();
    }
}
