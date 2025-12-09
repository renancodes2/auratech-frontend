// src/services/api.ts ou src/utils/axiosInstance.ts

import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: baseURL,
});

export default api;