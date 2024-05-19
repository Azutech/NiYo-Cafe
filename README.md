# Task Management API

This project is a Task Management API built with NestJS, Mongoose, and Socket.IO for real-time updates. It allows users to create, update, retrieve, and delete tasks, with real-time notifications via WebSockets.

## Features

- User authentication using JWT
- Task creation, update, retrieval, and deletion
- Real-time notifications for task changes using WebSockets

## Requirements

- Node.js
- MongoDB

## Installation

1. Clone the repository:
    ```sh
    git clone <repository_url>
    cd <repository_directory>
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Configure environment variables:
    Create a `.env` file in the root directory and add the following variables:
    ```
    MONGO_URI=<your_mongo_uri>
    JWT_SECRET=<your_jwt_secret>
    PORT=<your_port>
    ```

4. Start the application:
    ```sh
    npm run start:dev
    ```

## Endpoints

### Authentication

- **Login**

