import { useCallback } from 'react';
import useHttpRequest from './http-request-hook';
import useAuthStore from '../store/auth-store';
import { AuthType } from '../types/global-types';

const useAuth = () => {
  const { sendRequest } = useHttpRequest();
  const { token } = useAuthStore();

  const getRefreshToken = useCallback(
    async (body: AuthType) => {
      return await sendRequest(
        `/accounts/refresh-token/`,
        'POST',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        body
      );
    },
    [sendRequest, token]
  );

  return {
    getRefreshToken,
  };
};

export default useAuth;
