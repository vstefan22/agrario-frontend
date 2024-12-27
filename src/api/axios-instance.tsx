import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const instance = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

export default instance;
