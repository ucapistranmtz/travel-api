import { searchFlights } from "./service.js";

export const search = async (req, res, next) => {
  try {
    const { carrier, departureRange, maxDuration } = req.query;
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
          "Invalid date format in departureRange. Use YYYY-MM-DDTHH:mm/YYYY-MM-DDTHH:mm",
      };
    }
    const flights = await searchFlights(
      carrier,
      startDate,
      endDate,
      maxDuration
    );
    res.json(flights);
  } catch (error) {
    next(error);
  }
};
