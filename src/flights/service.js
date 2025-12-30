const flights = async () => {
  const result = await fetch(
    "https://gist.githubusercontent.com/bgdavidx/132a9e3b9c70897bc07cfa5ca25747be/raw/8dbbe1db38087fad4a8c8ade48e741d6fad8c872/gistfile1.txt"
  );

  return result.json();
};

const getDistanceBetweenAirports = async (origin, destination) => {};

const hydrateFlightWithScore = async (flights) => { 

     const  hydratedFlights =  flights.map(async (flight) => {
        const distance = await getDistanceBetweenAirports(flight.origin, flight.destination);
        const departureTime = new Date(flight.departureTime);
        const arrivalTime = new Date(flight.arrivalTime);
        const durationInHours = (arrivalTime - departureTime) / (1000 * 60 * 60);
        const carrierPreference =  flight.carrier === carrier? 0.9:1;
        const score =  (durationInHours) * (carrierPreference) + (distance );
        return {...flight, score};
     }

}

export const searchFlights = async (
  carrier,
  startDate,
  endDate,
  maxDuration
) => {
  // get allFlights
  let flights = await flights();
  if (carrier) {
    flights = flights.filter((flight) => flight.carrier === carrier);
  }

  //filte by carrier if provided
  //filter by departureRange
  //filter by maxDuration if provided
  // assign the score to each flight
  // sort by score descending
  // return the sorted flights
};
