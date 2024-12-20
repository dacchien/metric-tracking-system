# Project Setup & Running Instructions

This project uses Docker and PostgreSQL to run the application and its associated database. Below are the steps to set up and run the project on your local environment.

## Prerequisites

Ensure you have the following installed on your machine:
- Docker
- Docker Compose

## Setting Up the Project
1. **Setup environment**
   
   Copy .env.example to .env, and replace value match to your local environment
2. **Install Packages & run application**
```
docker-compose up -d --build
```
3. **API documents**
    
    Once the containers are up and running, you can access the API documentation via Swagger at: http://localhost:8000/api-docs