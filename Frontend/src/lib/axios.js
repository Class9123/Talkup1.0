import axios from 'axios';

let url;
if (import.meta.env.MODE === 'development') {
  url = import.meta.env.VITE_DEVELOPMENT_API_SERVER
  console.log('Axios development environment');
} else if (import.meta.env.MODE === 'production') {
  url = import.meta.env.VITE_PRODUCTION_API_SERVER
  console.log('axios production environment');
}
const axio = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL:url ,
});

export default axio;
