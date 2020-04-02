import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.25.19:3001',
});

export default api;
