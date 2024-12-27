import { useCallback } from 'react';
import axiosInstance from '../api/axios-instance';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface UseHttpRequestReturn {
  sendRequest: (
    url: string,
    method?: HttpMethod,
    headers?: AxiosRequestConfig,
    body?: unknown
  ) => Promise<unknown>;
}

const useHttpRequest = (): UseHttpRequestReturn => {
  const sendRequest = useCallback<
    (
      url: string,
      method?: HttpMethod,
      headers?: AxiosRequestConfig,
      body?: unknown
    ) => Promise<unknown>
  >(async (url, method = 'GET', headers = {}, body = null) => {
    const dataRequest = async (
      httpMethod: HttpMethod,
      urlData: string,
      data: unknown,
      config: AxiosRequestConfig
    ): Promise<AxiosResponse> => {
      switch (httpMethod) {
        case 'GET':
          return axiosInstance.get(urlData, config);
        case 'POST':
          return axiosInstance.post(urlData, data, config);
        case 'PATCH':
          return axiosInstance.patch(urlData, data, config);
        case 'DELETE':
          return axiosInstance.delete(urlData, config);
        default:
          throw new Error(`Unsupported HTTP method: ${httpMethod}`);
      }
    };

    const response = await dataRequest(method, url, body, headers);
    return response.data;
  }, []);

  return { sendRequest };
};

export default useHttpRequest;
