import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:5500/api/v1',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  },
});

export default httpClient;
