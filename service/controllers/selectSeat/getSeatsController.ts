import { Request, Response } from "express";

import { messageGenerator } from "../../messageGenerator/messageGenerator";
import { getSeatsById } from "../../dataService/seatsDb/getSeatsById";

export async function getSeatsController(req: Request, res: Response) {
  try {
    const flightId = req.get("id");
    if (!flightId) {
      res.status(404).json(messageGenerator("no id found"));
      return;
    }
    const seats = await getSeatsById(flightId);

    if (seats.length == 0) {
      res.status(404).json(messageGenerator("Not fligths found"));
      return;
    }

    res.json({ ...messageGenerator("Ok"), seats });
  } catch (err: Error | unknown) {
    res.status(500).json(messageGenerator("Error finding seats  "));
  }
}
