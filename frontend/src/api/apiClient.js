import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://pantry-chef-ai-six.vercel.app/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;