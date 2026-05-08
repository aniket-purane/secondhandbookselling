import axios from 'axios';

// Connect to your LIVE Render backend!
const BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api' 
  : 'https://secondhandbookselling-1.onrender.com/api';

const api = axios.create({
  baseURL: BASE_URL
});

export default api;
