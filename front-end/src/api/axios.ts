import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.API,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return error;
  }
);

export default axiosInstance;
