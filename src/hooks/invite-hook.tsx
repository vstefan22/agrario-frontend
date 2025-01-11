import { useCallback } from 'react';
import useHttpRequest from './http-request-hook';
import useAuthStore from '../store/auth-store';
import {
  InviteBodyType,
  InviteRegisterType,
  PromoCodeType,
} from '../types/global-types';

const useInvites = () => {
  const { sendRequest } = useHttpRequest();
  const { token } = useAuthStore();

  const validateInviteCode = useCallback(
    async (code: string) => {
      return await sendRequest(`/invites/validate/${code}/`, 'GET', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    [sendRequest, token]
  );

  const createInvite = useCallback(
    async (body: InviteBodyType) => {
      return await sendRequest(
        `/invites/create/`,
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

  const registerWithInviteCode = useCallback(
    async (body: InviteRegisterType) => {
      return await sendRequest(
        `/invites/register-with-invite/`,
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

  const reedemPromoCode = useCallback(
    async (body: PromoCodeType) => {
      return await sendRequest(
        `/invites/promo/redeem/`,
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
    createInvite,
    validateInviteCode,
    registerWithInviteCode,
    reedemPromoCode,
  };
};

export default useInvites;
