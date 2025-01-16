import { useCallback } from 'react';
import axiosInstance from '../api/axios-instance';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

/* eslint-disable @typescript-eslint/no-explicit-any */
type UseHttpRequestReturn = {
  sendRequest: <T = any>(
    url: string,
    method?: HttpMethod,
    config?: AxiosRequestConfig,
    body?: unknown
  ) => Promise<T>;
};

const useHttpRequest = (): UseHttpRequestReturn => {
  const sendRequest = useCallback(
    async <T = any,>(
      url: string,
      method: HttpMethod = 'GET',
      config: AxiosRequestConfig = {},
      body: unknown = null
    ): Promise<T> => {
      const dataRequest = async (
        httpMethod: HttpMethod,
        urlData: string,
        data: unknown,
        axiosConfig: AxiosRequestConfig
      ): Promise<AxiosResponse<T>> => {
        switch (httpMethod) {
          case 'GET':
            return axiosInstance.get<T>(urlData, axiosConfig);
          case 'POST':
            return axiosInstance.post<T>(urlData, data, axiosConfig);
          case 'PATCH':
            return axiosInstance.patch<T>(urlData, data, axiosConfig);
          case 'DELETE':
            return axiosInstance.delete<T>(urlData, axiosConfig);
          default:
            throw new Error(`Unsupported HTTP method: ${httpMethod}`);
        }
      };

      const response = await dataRequest(method, url, body, config);
      return response.data;
    },
    []
  );

  return { sendRequest };
};

export default useHttpRequest;
