# School Management API

## Overview
The School Management API is a Node.js application built with the Express.js framework and MySQL database. It provides a set of APIs to manage school data, allowing users to add new schools and retrieve a list of schools sorted by proximity to a specified location.

## Features
- Add new schools with details such as name, address, latitude, and longitude.
- Retrieve a list of schools sorted by proximity to a user's location.

## Project Structure
```
school-management-api
├── src
│   ├── config
│   │   └── database.js          # Database configuration and connection logic
│   ├── controllers
│   │   └── schoolController.js   # Controller for handling school-related requests
│   ├── models
│   │   └── School.js             # School model representing the schools table
│   ├── routes
│   │   └── schoolRoutes.js       # API routes for school management
│   ├── utils
│   │   └── distanceCalculator.js  # Utility for calculating geographical distance
│   ├── validators
│   │   └── schoolValidator.js     # Input validation for school data
│   └── app.js                    # Express application setup
├── tests
│   └── school.test.js            # Unit tests for the SchoolController
├── .env.example                   # Example environment variables
├── .gitignore                     # Files and directories to ignore in Git
├── package.json                   # npm configuration file
├── README.md                      # Project documentation
└── server.js                     # Entry point for starting the server
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd school-management-api
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Set up the database:
   - Create a MySQL database and configure the connection details in the `.env` file based on the `.env.example` provided.

## API Endpoints
### Add School
- **Endpoint:** `/addSchool`
- **Method:** `POST`
- **Payload:**
  ```json
  {
    "name": "School Name",
    "address": "School Address",
    "latitude": 12.345678,
    "longitude": 98.765432
  }
  ```
- **Response:**
  - Success: `201 Created`
  - Error: `400 Bad Request` (if validation fails)

### List Schools
- **Endpoint:** `/listSchools`
- **Method:** `GET`
- **Parameters:**
  - `latitude`: User's latitude
  - `longitude`: User's longitude
- **Response:**
  - Success: `200 OK` with a sorted list of schools
  - Error: `400 Bad Request` (if parameters are missing)

## Testing
Run the tests using the following command:
```
npm test
```