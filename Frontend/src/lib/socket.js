import { io } from "socket.io-client";

const SOCKET_SERVER_URL =import.meta.env.VITE_API_SERVER;
const socket = io(SOCKET_SERVER_URL);

export default socket;
