import { useCallback } from 'react';
import useHttpRequest from './http-request-hook';
import useAuthStore from '../store/auth-store';
import { PaymentType, PackagePaymentType } from '../types/global-types';

const usePayments = () => {
  const { sendRequest } = useHttpRequest();
  const { token } = useAuthStore();

  const createPayment = useCallback(
    async (body: PaymentType) => {
      return await sendRequest(
        `/payments/create-payment/`,
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

  const createPackagePayment = useCallback(
    async (body: PackagePaymentType) => {
      return await sendRequest(
        // TODO: replace with the actual endpoint
        `/dummy-endpoint/`,
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
    createPayment,
    createPackagePayment,
  };
};

export default usePayments;
