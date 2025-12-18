import { searchhFlights } from "./service.js";

export const search = async (req, res, next) => {
  const { carrier, maxDuration, departureRange } = req.query;
  const request = {};
  try {
    if (!departureRange) {
      const [startDate, endDate] = departureRange
        .split("/")
        .map((dateStr) => new Date(dateStr));
      if (
        startDate.toString() === "Invalid Date" ||
        endDate.toString() === "Invalid Date"
      ) {
        throw {
          status: 400,
          message:
            "Invalid date format in departureRange. Use YYYY-MM-DD/YYYY-MM-DD",
        };
      } else {
        request.startDate = startDate;
        request.endDate = endDate;
      }

      if (carrier) request.carrier = carrier;
      if (maxDuration) request.maxDuration = Number(maxDuration);
    }
    const [startDate, endDate] = departureRange.split(",");
    const flights = await searchhFlights(request);
    res.json({
      flights,
    });
  } catch (error) {
    next(error);
  }
};
