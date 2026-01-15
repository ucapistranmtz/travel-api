import { parse } from "csv-parse";
import { Readable } from "stream";

export const airports = async () => {
  const res = await fetch(
    "https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat"
  );
  if (!res.ok) throw new Error("Failed to fetch airports.dat");

  const parser = parse({
    relax_quotes: true,
    relax_column_count: true,
    trim: true,
  });

  const airportMap = {};

  return new Promise((resolve, reject) => {
    Readable.fromWeb(res.body)
      .pipe(parser)
      .on("data", (row) => {
        const iata = row[4] !== "\\N" ? row[4] : null;
        const lat = Number(row[6]);
        const lon = Number(row[7]);
        if (iata) airportMap[iata] = { lat: lat, lon: lon };
      })
      .on("end", () => {
        console.log("Total airports:", Object.keys(airportMap).length);
        resolve(airportMap);
        // console.log(airports.slice(0, 3));
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};
