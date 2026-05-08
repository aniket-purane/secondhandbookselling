import axios from 'axios';

// IMPORTANT: Once you deploy your backend to Render.com, 
// replace this URL with your real Render URL!
const BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api' 
  : 'https://your-backend-name.onrender.com/api';

const api = axios.create({
  baseURL: BASE_URL
});

export default api;
