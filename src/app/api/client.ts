import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://170.64.216.95:4050/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
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