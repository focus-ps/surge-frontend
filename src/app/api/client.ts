import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4050/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors for handling errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors (e.g., authentication, network issues)
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);