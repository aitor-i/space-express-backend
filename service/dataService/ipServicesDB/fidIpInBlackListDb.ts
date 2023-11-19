import { ipBlackListCollection, mongoClient, getPointer } from './../mongoClient';
import { IpModel } from './insertIp';

export async function findIpInBlackList(ip:String){ 
    try{
        await mongoClient.connect()
        const blackListPointer = getPointer(ipBlackListCollection)

        const ipFromDb = await blackListPointer.findOne({ip:ip} as Partial<IpModel>)
        
         if(ipFromDb?._id){ 
            return true
        }

        await mongoClient.close()
        return false
    
    }catch(err){
        console.error(err)
        return false
    }finally{ 
        await mongoClient.close()
        console.log("Ip black lis db close!")
    }

}
