import axios from 'axios';

const DEFAULT_BASE_URL = 'https://t40dks3sjc.execute-api.eu-west-1.amazonaws.com/dev';

const baseURL = process.env.REACT_APP_API_BASE_URL || DEFAULT_BASE_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    ...(apiKey ? { 'x-api-key': apiKey } : {}),
  },
});

export async function addCustomerId(id: string) {
  const response = await api.post('/customer', { id });
  return response.data;
}

export async function checkCustomerId(id: string) {
  const response = await api.get(`/customer?id=${id}`);
  return response.data;
}

export async function deleteCustomerId(id: string) {
  const response = await api.delete(`/customer?id=${id}`);
  return response.data;
}

export default api;
