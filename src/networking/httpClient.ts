import axios from 'axios';
import { storage } from '../utils/helper';
  const production = false;
  const localURL = 'http://192.168.31.186:3000/api/';
  const liveURL = '';
  const baseURL = production ? liveURL : localURL;

  //===============================================
  
  const httpClient = axios.create({
    baseURL: baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  // Store a reference to a function dynamically
  
  
  // Attach Authorization token before each request
  httpClient.interceptors.request.use(
    async (config) => {
      // const token='cdscds4r4444'
      const token = storage.getString('token'); 
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  // Handle 401 errors (Unauthorized)
  httpClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        storage.clearAll()
      }
      return Promise.reject(error);
    }
  );
  
  export default httpClient;
  