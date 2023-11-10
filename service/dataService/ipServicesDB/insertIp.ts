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

        await mongoClient.close()
        return dbResponse.acknowledged;

    
    }catch(err){

        console.error(err)
        false
    }finally{ 
        setTimeout(()=>{ 
            mongoClient.close()
            console.log("Db closed!")
        }, 3000)
    }

}
