# Task Manager

## Overview

**Task Manager** is a full-stack application designed to manage and organize tasks efficiently. This project includes both frontend and backend components, allowing users to create, view, update, and delete tasks. It also demonstrates the integration of a TypeScript frontend with a Java backend and MongoDB for data storage.

## Features

- **Task Management**: Create, view, update, and delete tasks.
- **User Interface**: Intuitive and responsive UI built with TypeScript and React.
- **Backend**: Java-based RESTful API with Spring Boot for handling requests.
- **Data Storage**: MongoDB for storing task data.

## Project Structure

The project is organized into two main directories:

- **`frontend/`**: Contains the TypeScript and React-based frontend code.
- **`backend/`**: Contains the Java-based backend code, including the RESTful API and data models.
- **`tasks.json`**: Sample JSON file for MongoDB data import.

## Getting Started

### Prerequisites

- Node.js (for frontend)
- Java (for backend)
- Maven (for backend)
- MongoDB (for database)

### Setup

#### Frontend

1. Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the frontend application:

    ```bash
    npm start
    ```

#### Backend

1. Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2. Build and run the backend application:

    ```bash
    ./mvnw spring-boot:run
    ```

### Running the Application

Once both frontend and backend are running, open your browser and navigate to `http://localhost:3000` to view the application.

<img width="1680" alt="Screenshot 2024-09-04 at 9 56 33 PM" src="https://github.com/user-attachments/assets/3f2f27dd-a60a-4fb4-a14a-8fb87d4dca90">

## Acknowledgements

- React
- Spring Boot
- MongoDB
