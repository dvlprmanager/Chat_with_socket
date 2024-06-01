Chat Application with Socket.io, Node.js, Mongoose, and React.js


Introduction
This project is a real-time chat application built using Socket.io for real-time communication, Node.js and Express for the backend, Mongoose for database interactions with MongoDB, and React.js for the frontend. The application allows users to register, login, and participate in chat rooms.

Features
User authentication (registration and login)
Real-time messaging
Multiple chat rooms
Display of active users
Persisted chat history
Technologies Used
Frontend: React.js, Tailwind CSS
Backend: Node.js, Express
Database: MongoDB, Mongoose
Real-time Communication: Socket.io
Installation

Prerequisites
Node.js and npm
MongoDB

Backend Setup
Clone the repository:
https://github.com/dvlprmanager/Chat_with_socket.git
cd chat-app/backend

Install dependencies:
npm install

Create a .env file in the backend directory and add the following environment variables:

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

Start the backend server:

npm run dev

Frontend Setup
Navigate to the frontend directory:
cd ../frontend

Install dependencies:
npm install

Start the frontend development server:
npm run dev
