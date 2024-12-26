# Event Management Platform

A NestJS-based REST API for managing events with TypeScript support and Swagger documentation.

## Features

- Create, read, update, and delete events
- Filter events by organizer, city, and date range
- Input validation using class-validator
- API documentation with Swagger
- TypeScript support
- CORS enabled

## Tech Stack

### Backend

- NestJS
- TypeScript

### Frontend

- Nextjs
- React
- TypeScript

## Data Structures

### Event

```typescript
{
  id: string // Unique identifier
  eventName: string // Name of the event
  eventDate: Date // Date of the event
  organizer: string // Organizer's name
  email: string // Organizer's email
  phone: string // Contact phone number
  location: {
    // Event location
    street: string
    city: string
    state: string
    zip: string
  }
  createdAt: Date // Creation timestamp
  updatedAt: Date // Last update timestamp
}
```

## Installation

To access frontend visit this url:- https://north-ladder-challenge.vercel.app/

```bash
# Clone repository
git https://github.com/sayyam1994/north-ladder-challenge.git
cd north-ladder-challenge/server

# Install dependencies
npm install
```

## Running the App

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## API Documentation

### 1. Create Event

- **Method**: POST
- **Endpoint**: `/events`
- **Description**: Creates a new event
- **Request Body**:

```json
{
  "eventName": "Startup Summit 2024",
  "eventDate": "2024-12-31T10:00:00.000Z",
  "organizer": "Sayyam Mehra",
  "email": "sayyam.mehra@example.com",
  "phone": "+91-9876543210",
  "location": {
    "street": "MG Road",
    "city": "Bengaluru",
    "state": "Karnataka",
    "zip": "560001"
  },
  "createdAt": "2024-12-26T16:34:57.850Z",
  "updatedAt": "2024-12-26T16:34:57.850Z"
}
```

### 2. Get All Events

- **Method**: GET
- **Endpoint**: `/events`
- **Query Parameters**:
  - `organizer` (optional): Filter by organizer name
  - `city` (optional): Filter by city
  - `fromDate` (optional): Filter events after this date
  - `toDate` (optional): Filter events before this date
- **Example Request**:

```bash
GET /events?city=San Francisco&fromDate=2024-01-01
```

### 3. Get Event by ID

- **Method**: GET
- **Endpoint**: `/events/:id`
- **Example Request**:

```bash
GET /events/550e8400-e29b-41d4-a716-446655440000
```

### 4. Update Event

- **Method**: PUT
- **Endpoint**: `/events/:id`
- **Description**: Updates an existing event. All fields are optional.
- **Example Request**:

```bash
PUT /events/550e8400-e29b-41d4-a716-446655440000
```

```json
{
  "eventName": "Updated Tech Conference 2024",
  "location": {
    "city": "Los Angeles"
  }
}
```

### 5. Delete Event

- **Method**: DELETE
- **Endpoint**: `/events/:id`
- **Example Request**:

```bash
DELETE /events/550e8400-e29b-41d4-a716-446655440000
```

## API Documentation

Access Swagger documentation at `/api` when running the application.
