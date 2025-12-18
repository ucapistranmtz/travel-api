# Travel API - Flights Service

A simple REST API for managing flight information.

## Getting Started

### Installation

```bash
npm install
```

### Running the Server

```bash
npm start
```

The server will start on port 3000 (or the PORT environment variable if set).

## API Endpoints

### List All Flights
```
GET /flights
```
Returns an array of all flights.

**Response Example:**
```json
[
  {
    "id": 1,
    "flightNumber": "AA101",
    "origin": "New York",
    "destination": "Los Angeles",
    "departureTime": "2024-01-15T08:00:00Z",
    "arrivalTime": "2024-01-15T11:30:00Z",
    "price": 250
  }
]
```

### Get a Specific Flight
```
GET /flights/:id
```
Returns a single flight by ID.

**Response Example:**
```json
{
  "id": 1,
  "flightNumber": "AA101",
  "origin": "New York",
  "destination": "Los Angeles",
  "departureTime": "2024-01-15T08:00:00Z",
  "arrivalTime": "2024-01-15T11:30:00Z",
  "price": 250
}
```

### Create a New Flight
```
POST /flights
```
Creates a new flight.

**Request Body:**
```json
{
  "flightNumber": "AA404",
  "origin": "Boston",
  "destination": "Denver",
  "departureTime": "2024-01-18T09:00:00Z",
  "arrivalTime": "2024-01-18T12:00:00Z",
  "price": 300
}
```

**Response:** Returns the created flight with an assigned ID (status 201).

### Update a Flight
```
PUT /flights/:id
```
Updates an existing flight by ID.

**Request Body:** (all fields optional)
```json
{
  "flightNumber": "AA404",
  "origin": "Boston",
  "destination": "Denver",
  "departureTime": "2024-01-18T09:00:00Z",
  "arrivalTime": "2024-01-18T12:00:00Z",
  "price": 280
}
```

**Response:** Returns the updated flight.

### Delete a Flight
```
DELETE /flights/:id
```
Deletes a flight by ID.

**Response:** Returns 204 No Content on success.

## Example Usage

### Using curl

```bash
# List all flights
curl http://localhost:3000/flights

# Get a specific flight
curl http://localhost:3000/flights/1

# Create a new flight
curl -X POST http://localhost:3000/flights \
  -H "Content-Type: application/json" \
  -d '{
    "flightNumber": "AA404",
    "origin": "Boston",
    "destination": "Denver",
    "departureTime": "2024-01-18T09:00:00Z",
    "arrivalTime": "2024-01-18T12:00:00Z",
    "price": 300
  }'

# Update a flight
curl -X PUT http://localhost:3000/flights/1 \
  -H "Content-Type: application/json" \
  -d '{"price": 280}'

# Delete a flight
curl -X DELETE http://localhost:3000/flights/1
```

## Data Model

Each flight has the following properties:

- `id` (number): Unique identifier (auto-generated)
- `flightNumber` (string): Flight number (e.g., "AA101")
- `origin` (string): Departure city
- `destination` (string): Arrival city
- `departureTime` (string): ISO 8601 formatted departure time
- `arrivalTime` (string): ISO 8601 formatted arrival time
- `price` (number): Ticket price in USD

## Notes

- Data is stored in memory and will reset when the server restarts
- The API includes basic validation and error handling
- Default sample flights are included for testing