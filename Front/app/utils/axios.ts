import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACK_URL
    ? `${process.env.NEXT_PUBLIC_BACK_URL}/api`
    : 'http://localhost:5000/api',
});

// Add a request interceptor to include the token
API.interceptors.request.use(
  (config) => {
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        if (parsedUser.token) {
          config.headers.Authorization = `Bearer ${parsedUser.token}`;
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
