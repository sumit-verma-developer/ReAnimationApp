// src/api/apiClient.js
import axios from 'axios';

const developementUrl = 'https://dummyjson.com';
// const productionUrl = 'https://dummyjson.com';

const apiClient = axios.create({
  baseURL: developementUrl,
  timeout: 10000,
});

apiClient.interceptors.response.use(
  res => res,
  err => {
    console.log('API Error:', err?.response?.data || err.message);
    return Promise.reject(err);
  },
);

export default apiClient;
