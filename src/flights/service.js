export const searchhFlights = async (
  request = {
    carrier,
    maxDuration,
    startDate,
    endDate,
  }
) => {
  let flights = await fetchFlights();
  if (flights && flights.length > 0) {
    flights = filterFlights(flights, request);
  }

  flights = getDistanceBetweenAirports(flights);

  return flights;
};

const fetchFlights = async () => {
  const result = await fetch(
    "https://gist.githubusercontent.com/bgdavidx/132a9e3b9c70897bc07cfa5ca25747be/raw/8dbbe1db38087fad4a8c8ade48e741d6fad8c872/gistfile1.txt"
  );
  const data = await result.json();
  return data;
};

const filterFlights = (flights, request) => {
  return flights.filter((flight) => {
    let valid = false;

    if (flight.carrier === request.carrier || !request.carrier) {
      valid = true;
    }

    if (request.maxDuration && flight.duration > request.maxDuration) {
      valid = false;
    }

    const departureDate = new Date(flight.departureTime);
    const arrivalDate = new Date(flight.arrivalTime);
    if (
      request.startDate &&
      request.endDate &&
      departureDate >= request.startDate &&
      arrivalDate <= request.endDate
    ) {
      valid = valid && true;
    }

    return valid;
  });
};

const getDistanceBetweenAirports = (code1, code2) => {};
