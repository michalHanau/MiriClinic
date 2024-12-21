import axios, { AxiosInstance  } from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

const api: AxiosInstance = axios.create({
  baseURL: `https://miriclinic-server.onrender.com/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});
console.log("Base URL:", api.defaults.baseURL);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // כאן ניתן להוסיף ניהול שגיאות גלובלי
    if (error.response && error.response.status === 401){
        console.log("שגיאת 401")
    }
    return Promise.reject(error);
  }
);

export default api;
