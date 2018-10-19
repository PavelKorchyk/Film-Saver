import axios from 'axios';

const instance = axios.create({
  baseURL: 'api',
});

export function request(data) {
  return instance(data);
}