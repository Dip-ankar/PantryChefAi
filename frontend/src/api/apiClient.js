import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://pantry-chef-ai-4sk6-git-main-dip-ankars-projects.vercel.app/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;