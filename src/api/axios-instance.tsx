import axios, { InternalAxiosRequestConfig } from 'axios';
import useAuthStore from '../store/auth-store';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

/* eslint-disable @typescript-eslint/no-explicit-any */
const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

const rawAxios = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token?: string | PromiseLike<string>) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token || '');
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { token } = useAuthStore.getState();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: any) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 403 &&
      error.response?.data &&
      error.response?.data.error === 'Invalid or expired Firebase token.' &&
      originalRequest &&
      !(originalRequest as any)._retry
    ) {
      (originalRequest as any)._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            if (newToken && originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;
      const { refreshToken, setToken, setRefreshToken, clearAuth } =
        useAuthStore.getState();

      if (!refreshToken) {
        processQueue(new Error('No refresh token available'), null);
        clearAuth();
        return Promise.reject(error);
      }

      try {
        const response = await rawAxios.post('/accounts/refresh-token/', {
          refresh_token: refreshToken,
        });
        const { firebase_token, refresh_token: newRefresh } = response.data;
        setToken(firebase_token);
        setRefreshToken(newRefresh);
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${firebase_token}`;
        processQueue(null, firebase_token);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${firebase_token}`;
        }

        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err as Error, null);
        clearAuth();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
