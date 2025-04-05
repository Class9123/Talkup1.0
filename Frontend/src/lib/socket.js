import { io } from "socket.io-client";

let url;
if (import.meta.env.MODE === 'development') {
  url = import.meta.env.VITE_DEVELOPMENT_API_SERVER
  console.log('socket development environment');
} else if (import.meta.env.MODE === 'production') {
  url = import.meta.env.VITE_PRODUCTION_API_SERVER
  console.log('socket production environment');
}
const SOCKET_SERVER_URL = url;
const socket = io(SOCKET_SERVER_URL);

export default socket;
