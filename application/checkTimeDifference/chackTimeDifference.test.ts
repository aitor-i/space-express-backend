import { describe, it, expect } from "vitest";
import { IpModel } from "../../service/dataService/ipServicesDB/insertIp";
import { checkTimeDifference } from "./checkTimeDifference";

describe('checkTimeDifference', () => {
  it('should return true when there are no more than 5 models within a one-minute time range', () => {
    const models: IpModel[] = [
      { ip: '127.0.0.1', requestDate: new Date('2023-11-10T12:00:00') },
      { ip: '127.0.0.2', requestDate: new Date('2023-11-10T12:01:00') },
      { ip: '127.0.0.3', requestDate: new Date('2023-11-10T12:02:00') },
      { ip: '127.0.0.4', requestDate: new Date('2023-11-10T12:03:00') },
      { ip: '127.0.0.5', requestDate: new Date('2023-11-10T12:04:00') },
      { ip: '127.0.0.6', requestDate: new Date('2023-11-10T12:05:00') },
    ];

    const result = checkTimeDifference(models);
    expect(result).toBe(true);
  });

    it("should return false if there is less than 5 models", ()=>{ 
        
    const models: IpModel[] = [
      { ip: '127.0.0.1', requestDate: new Date('2023-11-10T12:00:00') },
      { ip: '127.0.0.2', requestDate: new Date('2023-11-10T12:01:00') },
      { ip: '127.0.0.3', requestDate: new Date('2023-11-10T12:01:00') },
      { ip: '127.0.0.4', requestDate: new Date('2023-11-10T12:01:00') },
        ]

        const result = checkTimeDifference(models)
        expect(result).toBe(false)
    })

  it('should return false when there are 5 models within a one-minute time range', () => {
    const models: IpModel[] = [
      { ip: '127.0.0.1', requestDate: new Date('2023-11-10T12:00:00') },
      { ip: '127.0.0.2', requestDate: new Date('2023-11-10T12:01:00') },
      { ip: '127.0.0.3', requestDate: new Date('2023-11-10T12:01:00') },
      { ip: '127.0.0.4', requestDate: new Date('2023-11-10T12:01:00') },
      { ip: '127.0.0.5', requestDate: new Date('2023-11-10T12:01:00') },
      { ip: '127.0.0.6', requestDate: new Date('2023-11-10T12:01:00') },
      { ip: '127.0.0.7', requestDate: new Date('2023-11-10T12:01:30') }, // Within the threshold
    ];

    const result = checkTimeDifference(models);
    expect(result).toBe(false);
  });

  it('should return true when there are no more than 5 models within a one-minute time range', () => {
    const models: IpModel[] = [
      { ip: '127.0.0.1', requestDate: new Date('2023-11-10T12:00:00') },
      { ip: '127.0.0.2', requestDate: new Date('2023-11-10T12:05:00') },
      { ip: '127.0.0.3', requestDate: new Date('2023-11-10T12:10:00') },
      { ip: '127.0.0.4', requestDate: new Date('2023-11-10T12:15:00') },
      { ip: '127.0.0.5', requestDate: new Date('2023-11-10T12:20:00') },
    ];

    const result = checkTimeDifference(models);
    expect(result).toBe(true);
  });
});

