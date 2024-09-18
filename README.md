# Personal Task Manager

## Overview

The **Personal Task Manager** is a web application designed to help users manage their tasks efficiently. It allows users to create, update, and delete tasks, set due dates, and receive reminders for upcoming tasks. The application features a modern and responsive user interface built with React and Chakra UI, while the backend is powered by Node.js and Express. Redis is used for caching, and BullMQ handles task scheduling and reminders.

## Features

- **Task Management**: Create, update, and delete tasks with ease.
- **Due Dates**: Assign due dates to tasks and keep track of upcoming deadlines.
- **Reminders**: Receive notifications for tasks approaching their due dates.
- **Responsive UI**: A user-friendly interface that works on both desktop and mobile devices.

## Tech Stack

- **Frontend**: React, Chakra UI
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Caching**: Redis
- **Task Queue**: BullMQ

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14.x or later)
- MongoDB
- Redis

### Installation

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/your-username/personal-task-manager.git
    cd personal-task-manager
    ```

2.  **Set Up the Backend**

    Navigate to the backend directory and install the dependencies:

    ```bash
    cd backend
    npm install
    ```

    Create a .env file in the backend directory with the following environment variables:

    ```bash
    MONGODB_URI=your_mongodb_connection_string
    REDIS_URL=your_redis_connection_string
    SEND_IN_BLUE_KEY=your_send_in_blue_api_key
    ```

    <!-- BULLMQ_REDIS_URL=your_bullmq_redis_connection_string -->

    **Start the backend server:**

    ```bash
    npm start
    ```

3.  **Set Up the Frontend**
    Navigate to the frontend directory and install the dependencies:
    ```bash
    cd ../frontend
    npm install
    ```
    **Start the frontend development server:**
    ```bash
    npm start
    ```
    The frontend application will be accessible at http://localhost:3000.

### API Endpoints

**Task Management**

- **Create Task**
  - **Endpoint:** POST /tasks
  - **Request Body:** { "title": "Task title", "dueDate": "YYYY-MM-DDTHH:MM:SSZ" }
  - **Response:** 201 Created with task details.
- **Get Tasks**

  - **Endpoint:** GET /tasks
  - **Response:** 200 OK with an array of tasks.

- **Update Task**

  - **Endpoint:** PUT /tasks/:id
  - **Request Body:** { "title": "Updated task title", "dueDate": "YYYY-MM-DDTHH:MM:SSZ" }
  - **Response:** 200 OK with updated task details.

- **Delete Task**
  - **Endpoint:** DELETE /tasks/:id
  - **Response:** 204 No Content

### Reminders

The application uses BullMQ to manage reminders:

- **Scheduled Tasks**: Tasks with upcoming due dates are scheduled for reminders using BullMQ.
- **Notification**: Users receive notifications for tasks as their due date approaches.

### Deployment

**For deploying the application:**

- **Backend Deployment:** Host the backend server on platforms like Heroku, AWS, or Azure.
- **Frontend Deployment:** Deploy the frontend to Vercel, Netlify, or similar services.
  Ensure that environment variables are correctly configured in the deployment environment.

**Contributing**
Contributions are welcome! Please open an issue or submit a pull request if you have suggestions or improvements.

**License**
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Acknowledgments**

- **Chakra UI:** For providing a beautiful and accessible component library.
- **BullMQ:** For reliable task scheduling and management.
- **Redis:** For efficient caching
