import { io } from 'socket.io-client';

const socket = io('http://localhost:8967'); // Replace with your server URL

socket.on('connect', () => {
  console.log('Connected to WebSocket server');
});

socket.on('taskCreated', (task) => {
  console.log('New task created:', task);
});

socket.on('taskUpdated', (task) => {
  // Handle task update event
});

socket.on('taskDeleted', ({ id }) => {
  // Handle task deletion event
});
