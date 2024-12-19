import axios, { AxiosInstance  } from 'axios';

const BASE_URL = `https://miriclinic-server.onrender.com/api`;

const api: AxiosInstance = axios.create({
  baseURL: `https://miriclinic-server.onrender.com/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
