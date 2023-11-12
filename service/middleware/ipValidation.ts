import { checkTimeDifference } from "../../application/checkTimeDifference/checkTimeDifference";
import { addIpToBlackList } from "../dataService/ipServicesDB/addIpToBlackList";
import { getIpsByIpDb } from "../dataService/ipServicesDB/getIpsByIpDb";

export async function ipValidation (ip:string){ 
    try{ 
        const ipsToValidat = await getIpsByIpDb(ip);
        if(ipsToValidat){ 
            const isIpMassivelyConnecting =  checkTimeDifference(ipsToValidat);

            if (isIpMassivelyConnecting){ 

                //const isIpAddedToBlackList = await  addIpToBlackList(ip)
            }
        }

        

    }catch(err){ 
    }

}
