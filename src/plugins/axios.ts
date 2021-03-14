import axios from 'axios';
import store from '../store';

const api = axios.create({
  baseURL: 'https://192.168.0.143:9001',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  config => {
    const token = store.getters.GetUserToken();
    if (token) {
      config.headers.common["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    return Promise.resolve(error);
  }
);

export default api;