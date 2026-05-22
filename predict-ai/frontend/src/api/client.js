import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const predictTicker = async (ticker) => {
  const response = await client.post('/predict', { ticker });
  return response.data;
};

export const getMarketOverview = async () => {
  const response = await client.get('/market/overview');
  return response.data;
};

export default client;
