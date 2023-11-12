import { IpModel } from "../../service/dataService/ipServicesDB/insertIp";

export function checkTimeDifference(models: IpModel[]): boolean {
  const thresholdInMinutes = 1;
  const maxModelsWithinThreshold = 5;
  if(models.length< 5) return false

  for (let i = 0; i < models.length; i++) {
    let count = 1; // Start count at 1 for the current model
    const currentModel = models[i];

    for (let j = i + 1; j < models.length; j++) {
      const compareModel = models[j];

      // Calculate the time difference in minutes
      const timeDifference = Math.abs(
        (currentModel.requestDate.getTime() - compareModel.requestDate.getTime()) / (1000 * 60)
      );

      // Check if the time difference is within the threshold
      if (timeDifference <= thresholdInMinutes) {
        count++;

        // Check if the count exceeds the maximum allowed models within the threshold
        if (count > maxModelsWithinThreshold) {
          return false;
        }
      }
    }
  }

  return true;
}




