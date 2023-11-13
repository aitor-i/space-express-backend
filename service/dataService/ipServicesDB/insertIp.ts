import { ipCollection, mongoClient, getPointer } from './../mongoClient';


export interface IpModel{ 
    ip:string,
    requestDate: Date
}

export async function insertIpDb(ipModel:IpModel){ 
    try{
        await mongoClient.connect()
        
        const ipPointer = getPointer(ipCollection)

        const dbResponse = await ipPointer.insertOne(ipModel);

        return dbResponse.acknowledged;

    
    }catch(err){
        console.error(err)
        mongoClient.close()
        false
    }finally{ 
        console.log("Close db")
        await mongoClient.close()
    }

}
