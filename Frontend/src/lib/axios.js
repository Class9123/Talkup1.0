import axios from 'axios';

const axio = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL:import.meta.env.VITE_API_SERVER ,
});

export default axio;
