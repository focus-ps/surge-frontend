import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'api/proxy',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
  },
  proxy: {
    host: '170.64.216.95',
    port: 4050,
    protocol: 'http',
  }
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