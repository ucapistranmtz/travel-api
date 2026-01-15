import { airports } from "../airports/service.js";
import * as turf from "@turf/turf";

let airportData = null;
let flightsCache = null;
const distanceCache = new Map();
(async () => {
  airportData = await airports();
  flightsCache = await flights();
})();

const flights = async () => {
  const result = await fetch(
    "https://gist.githubusercontent.com/bgdavidx/132a9e3b9c70897bc07cfa5ca25747be/raw/8dbbe1db38087fad4a8c8ade48e741d6fad8c872/gistfile1.txt"
  );

  return result.json();
};

const getDistanceBetweenAirports = async (origin, destination) => {
  const key = `${origin}-${destination}`;
  if (distanceCache.has(key)) {
    return distanceCache.get(key);
  }
  const originData = airportData[origin];
  const destinationData = airportData[destination];
  if (!originData || !destinationData) {
    console.log(`Missing data for ${origin} or ${destination}`);
    return Infinity;
  }
  const from = turf.point([originData.lon, originData.lat]);
  const to = turf.point([destinationData.lon, destinationData.lat]);
  const options = { units: "miles" };
  const distance = turf.distance(from, to, options);

  distanceCache.set(key, distance);
  return distance;
};

const hydrateFlights = async (flights, carrier) => {
  const hydratedFlights = flights.map(async (flight) => {
    const distance = await getDistanceBetweenAirports(
      flight.origin,
      flight.destination
    );
    const departureTime = new Date(flight.departureTime);
    const arrivalTime = new Date(flight.arrivalTime);
    const durationInHours = (arrivalTime - departureTime) / (1000 * 60 * 60);
    const carrierPreference = flight.carrier === carrier ? 0.9 : 1;
    const score = durationInHours * carrierPreference + distance;
    return { ...flight, score, durationInHours };
  });

  return Promise.all(hydratedFlights);
};

export const searchFlights = async (
  carrier,
  startDate,
  endDate,
  maxDuration
) => {
  // get allFlights
  let flights = structuredClone(flightsCache);
  flights = await hydrateFlights(flights, carrier);

  flights = flights.filter((flight) => {
    const departureTime = new Date(flight.departureTime);
    const arrivalTime = new Date(flight.arrivalTime);
    const durationInHours = (arrivalTime - departureTime) / (1000 * 60 * 60);

    if (departureTime < startDate || departureTime > endDate) {
      return false;
    }
    if (carrier && flight.carrier !== carrier) {
      return false;
    }

    if (maxDuration && durationInHours > Number(maxDuration)) {
      return false;
    }

    return true;
  });

  return flights.sort((a, b) => a.score - b.score);
};
