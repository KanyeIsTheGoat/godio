import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.18:8080/api/',
});

export default api;