import { describe, it, expect} from 'vitest'
import { getSeats } from '../../../controllers/selectSeat/selectSeatController'
import {getSeatsById} from "../getSeatsById"


describe("Get seats", ()=> { 
    it("should return an array", async ()=>{ 
       const seats = await getSeatsById("1234"); 

        expect(seats.length).toBe(20);
    })

})
