const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory data store for flights
let flights = [
  {
    id: 1,
    flightNumber: 'AA101',
    origin: 'New York',
    destination: 'Los Angeles',
    departureTime: '2024-01-15T08:00:00Z',
    arrivalTime: '2024-01-15T11:30:00Z',
    price: 250
  },
  {
    id: 2,
    flightNumber: 'UA202',
    origin: 'Chicago',
    destination: 'Miami',
    departureTime: '2024-01-16T10:00:00Z',
    arrivalTime: '2024-01-16T14:00:00Z',
    price: 180
  },
  {
    id: 3,
    flightNumber: 'DL303',
    origin: 'San Francisco',
    destination: 'Seattle',
    departureTime: '2024-01-17T12:00:00Z',
    arrivalTime: '2024-01-17T14:30:00Z',
    price: 120
  }
];

let nextId = 4;

// GET /flights - List all flights
app.get('/flights', (req, res) => {
  res.json(flights);
});

// GET /flights/:id - Get a specific flight
app.get('/flights/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const flight = flights.find(f => f.id === id);
  
  if (!flight) {
    return res.status(404).json({ error: 'Flight not found' });
  }
  
  res.json(flight);
});

// POST /flights - Create a new flight
app.post('/flights', (req, res) => {
  const { flightNumber, origin, destination, departureTime, arrivalTime, price } = req.body;
  
  // Basic validation
  if (!flightNumber || !origin || !destination || !departureTime || !arrivalTime || !price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const newFlight = {
    id: nextId++,
    flightNumber,
    origin,
    destination,
    departureTime,
    arrivalTime,
    price
  };
  
  flights.push(newFlight);
  res.status(201).json(newFlight);
});

// PUT /flights/:id - Update a flight
app.put('/flights/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const flightIndex = flights.findIndex(f => f.id === id);
  
  if (flightIndex === -1) {
    return res.status(404).json({ error: 'Flight not found' });
  }
  
  const { flightNumber, origin, destination, departureTime, arrivalTime, price } = req.body;
  
  // Update flight with provided fields
  const updatedFlight = {
    ...flights[flightIndex],
    ...(flightNumber && { flightNumber }),
    ...(origin && { origin }),
    ...(destination && { destination }),
    ...(departureTime && { departureTime }),
    ...(arrivalTime && { arrivalTime }),
    ...(price && { price })
  };
  
  flights[flightIndex] = updatedFlight;
  res.json(updatedFlight);
});

// DELETE /flights/:id - Delete a flight
app.delete('/flights/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const flightIndex = flights.findIndex(f => f.id === id);
  
  if (flightIndex === -1) {
    return res.status(404).json({ error: 'Flight not found' });
  }
  
  flights.splice(flightIndex, 1);
  res.status(204).send();
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Travel API - Flights Service',
    endpoints: {
      'GET /flights': 'List all flights',
      'GET /flights/:id': 'Get a specific flight',
      'POST /flights': 'Create a new flight',
      'PUT /flights/:id': 'Update a flight',
      'DELETE /flights/:id': 'Delete a flight'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Travel API server running on port ${PORT}`);
});

module.exports = app;
