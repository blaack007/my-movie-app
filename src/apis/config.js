import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.themoviedb.org/3/';
export const API_KEY = import.meta.env.VITE_TMDB_API_KEY
export const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/';

if (!import.meta.env.VITE_TMDB_API_KEY && import.meta.env.MODE === 'production') {
  console.warn('Warning: Using fallback API key in production environment. Set VITE_TMDB_API_KEY in your environment variables.');
}

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY
    }
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (import.meta.env.MODE !== 'production') {
      console.error('API Error:', error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;


