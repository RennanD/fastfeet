import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.25.17:3001',
});

export default api;
