import { ipBlackListCollection, mongoClient, getPointer } from './../mongoClient';

export async function addIpToBlackList(ip:String){ 
    try{
        console.log("adding ip to black list")
        await mongoClient.connect()
        console.log("connected")
        const blackListPointer = getPointer(ipBlackListCollection)

        const ipToInsert = {ip:ip}
        const dbResponse = await blackListPointer.insertOne(ipToInsert);

        console.log("is ip added to vblack list", dbResponse.acknowledged)

        mongoClient.close()
        return dbResponse.acknowledged;
    
    }catch(err){

        console.error(err)
        false
    }finally{ 
        setTimeout(()=>{ 
            mongoClient.close()
            console.log("Black list Db closed!")
        }, 8000)
    }

}
