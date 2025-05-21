import axios from 'axios';

// Environment variables with fallbacks for development
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.themoviedb.org/3/';
// Don't hardcode API keys in source code - this is a fallback for development only
export const API_KEY = import.meta.env.VITE_TMDB_API_KEY
export const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/';

// Log warning if using fallback API key in non-development environment
if (!import.meta.env.VITE_TMDB_API_KEY && import.meta.env.MODE === 'production') {
  console.warn('Warning: Using fallback API key in production environment. Set VITE_TMDB_API_KEY in your environment variables.');
}

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY
    }
});

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log errors in development
    if (import.meta.env.MODE !== 'production') {
      console.error('API Error:', error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;


