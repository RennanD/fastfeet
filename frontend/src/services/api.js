import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.25.10:3001',
});

export default api;
