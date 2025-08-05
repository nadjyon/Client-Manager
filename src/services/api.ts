import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://goon-teste-api-production.up.railway.app/api', // Altere se for usar local
});
