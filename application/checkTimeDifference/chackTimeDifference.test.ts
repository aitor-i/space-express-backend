import { describe, it, expect } from 'vitest';
import { checkTimeDifference } from './checkTimeDifference';

describe('checkTimeDifference', () => {
    it('should return true for an empty list', () => {
        const result = checkTimeDifference([]);
        expect(result).toBe(true);
    });

    it('should return true for a list with no consecutive sequence', () => {
        const ipModels = [
            { ip: '192.168.1.1', requestDate: new Date('2023-11-20T12:00:00') },
            { ip: '192.168.1.1', requestDate: new Date('2023-11-20T12:05:00') },
            { ip: '192.168.1.1', requestDate: new Date('2023-11-20T12:10:00') },
            { ip: '192.168.1.1', requestDate: new Date('2023-11-20T12:15:00') },
            { ip: '192.168.1.1', requestDate: new Date('2023-11-20T12:20:00') }
        ];
        const result = checkTimeDifference(ipModels);
        expect(result).toBe(true);
    });

    it('should return false for a list with a consecutive sequence of 5 with time difference less than one minute', () => {
        const ipModels = [
            { ip: '192.168.1.1', requestDate: new Date('2023-11-20T12:00:00') },
            { ip: '192.168.1.1', requestDate: new Date('2023-11-20T12:00:01') },
            { ip: '192.168.1.1', requestDate: new Date('2023-11-20T12:00:10') },
            { ip: '192.168.1.1', requestDate: new Date('2023-11-20T12:00:05') },
            { ip: '192.168.1.1', requestDate: new Date('2023-11-20T12:00:04') }
        ];
        const result = checkTimeDifference(ipModels);
        expect(result).toBe(false);
    });

    it('should return true for a list with a consecutive sequence of 5 with time difference more than one minute', () => {
        const ipModels = [
            { ip: '192.168.1.1', requestDate: new Date('2023-11-20T12:00:00') },
            { ip: '192.168.1.1', requestDate: new Date('2023-11-20T12:00:30') },
            { ip: '192.168.1.1', requestDate: new Date('2023-11-20T12:00:45') },
            { ip: '192.168.1.1', requestDate: new Date('2023-11-20T12:00:59') },
            { ip: '192.168.1.1', requestDate: new Date('2023-11-20T12:01:00') }
        ];
        const result = checkTimeDifference(ipModels);
        expect(result).toBe(true);
    });
});
