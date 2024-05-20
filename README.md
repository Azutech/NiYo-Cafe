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

## Contributing

To contribute to the project, you can:

- Fork the repository
- Create a new branch: `git checkout -b feature-name`
- Make your changes and commit them: `git commit -m "Add feature-name"`
- Push to your branch: `git push origin feature-name`
- Create a pull request


## Hosted Link
 -The app was deployed using the [render](https://render.com). Find the link [Here](https://niyo-cafe.onrender.com)

## Endpoints

### Authentication

 **Login**

 - POST /auth/login : logs the user in

 **Registration**
 - POST /auth/register : registers the users

 **Account Activation**
 - GET /auth/activateAccount?verication_code=<verication_code>: activate the user's account

### Tasks

**Create a task**

 - POST /task/addTask 

 **Get all tasks**

 - GET /task/all

 **Get tasks for a user**

 - GET /task/userTasks

 **Get a specific task**

 - GET /task/getTask?id=<task_id>

 **Delete a task**

- DELETE /task/deleteTask?id=<task_id>

**Update a task**

- PATCH /task/updateTask?id=<task_id>

## PostMan Documentation

 Click this [link](https://documenter.getpostman.com/view/19569197/2sA3QmEupR) to get the full API Documentation 
## License
[MIT] ()
The project is licensed under the MIT license.

Copyright (c) [2023] [EmmanuelOnugha]