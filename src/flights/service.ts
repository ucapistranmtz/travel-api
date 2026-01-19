export interface filterParams {
  arrivalDate?: Date;
  departureDate?: Date;
  maxDuration: number;
  preferredCarrier?: string;
}
import type { flight } from "./types.js";
export const filterFlights = (params: filterParams): flight[] => {
  let result: flight[] = [];

  return result;
};

const fetchFlights = async () => {
  const url =
    "https://gist.githubusercontent.com/bgdavidx/132a9e3b9c70897bc07cfa5ca25747be/raw/8dbbe1db38087fad4a8c8ade48e741d6fad8c872/gistfile1.txt";

  return (await fetch(url)).json();
};

const mapfligts = async (flights: unknown) => {};
