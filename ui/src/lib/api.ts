import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios"
import Cookies from "js-cookie";


export interface AxiosError<T = any> extends Error {
  config: AxiosRequestConfig;
  code?: string;
  request?: any;
  response?: AxiosResponse<T>;
  isAxiosError: boolean;
  toJSON: () => object;
}


export const Api = axios.create({
  baseURL: "/",
  withCredentials: true,
})

Api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }
  return config;
});


Api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      Cookies.remove('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);