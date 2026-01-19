import type { NextFunction, Request, Response } from "express";
import { filterFlights, type filterParams } from "./service.js";
import type { flight } from "./types.js";

export const search = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let departureDate: Date | undefined;
  let arrivalDate: Date | undefined;

  const maxDuration =
    typeof req.query.maxDuration === "string"
      ? Number(req.query.maxDuration)
      : 1;
  if (maxDuration != undefined || Number.isNaN(maxDuration)) {
    return res.status(400).json({ message: "maxDuration must be a number" });
  }

  if (typeof req.query.departureRange === "string") {
    const [fromStr, toStr] = req.query.departureRange.split("/");

    if (!fromStr || !toStr) {
      return res.status(400).json({
        message: "departureRange must be in format YYYY-MM-DD/YYYY-MM-DD",
      });
    }

    departureDate = new Date(fromStr);
    arrivalDate = new Date(toStr);

    if (
      Number.isNaN(departureDate.getTime()) ||
      Number.isNaN(arrivalDate.getTime())
    ) {
      return res
        .status(400)
        .json({ message: "departureRange has invalid dates" });
    }
  }

  const preferredCarrier =
    typeof req.query.carrier === "string" ? req.query.carrier : undefined;

  const params: filterParams = {
    maxDuration,
  };

  if (arrivalDate) {
    params.arrivalDate = arrivalDate;
  }

  if (departureDate) {
    params.departureDate = departureDate;
  }

  if (preferredCarrier) {
    params.preferredCarrier = preferredCarrier;
  }

  const flights: flight[] = await filterFlights(params);
};
