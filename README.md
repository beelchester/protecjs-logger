# Protecjs Logger Microservice

This repository contains a Express.js server to logs generated by ProtecJS to InfluxDB, intended to be used as part of the Protecjs logging infrastructure.

Checkout [ProtecJS](https://github.com/beelchester/protecjs) for more information.

## Features

- Logs security events to an InfluxDB instance
- Includes CORS support for specified origins
- Dockerized setup for easy deployment
- Health endpoint for basic server status checks

## Endpoints

- **POST /api/log**: Receives log data and writes it to InfluxDB.
- **GET /health**: Returns `200 OK` to indicate the server is running.

## Setup

### Prerequisites

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/) (for development only, not required to run in Docker)

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
ORIGIN=<your-client-origin>
INFLUXDB_TOKEN=<your-influxdb-token>
INFLUXDB_ORG=<your-influxdb-org>
INFLUXDB_BUCKET=<your-influxdb-bucket>
INFLUXDB_URL=<your-influxdb-url>
```
Docker Instructions

1.	Build the Docker image:
```bash
    docker build -t protecjs-logger .
```

2.	Run the Docker container:
```bash
    docker run -p 3000:3000 --env-file .env protecjs-logger
```

This starts the server on port 3000.
