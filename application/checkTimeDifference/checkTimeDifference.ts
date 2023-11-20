import { IpModel } from "../../service/dataService/ipServicesDB/insertIp";

export function checkTimeDifference(ipModels: IpModel[]): boolean {
  const sequenceLength = 5;
  const maxTimeDifferenceMinutes = 0.2;

  for (let i = 0; i <= ipModels.length - sequenceLength; i++) {
    let isConsecutiveSequence = true;

    for (let j = 1; j < sequenceLength; j++) {
      const currentModel = ipModels[i + j - 1];
      const nextModel = ipModels[i + j];

      const timeDifference = (nextModel.requestDate.getTime() - currentModel.requestDate.getTime()) / (1000 * 60);

      if (timeDifference > maxTimeDifferenceMinutes) {
        isConsecutiveSequence = false;
        break;
      }
    }

    if (isConsecutiveSequence) {
      return false;
    }
  }

  return true;
}
