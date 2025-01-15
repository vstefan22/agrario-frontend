import { useCallback } from 'react';
import useHttpRequest from './http-request-hook';
import useAuthStore from '../store/auth-store';
import { OfferPreparationType, OfferType } from '../types/offer-types';

const useOffers = () => {
  const { sendRequest } = useHttpRequest();
  const { token } = useAuthStore();

  const getOffers = useCallback(async () => {
    return await sendRequest(`/offers/area_offers/`, 'GET', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [sendRequest, token]);

  const addOffer = useCallback(
    async (body: OfferPreparationType | FormData) => {
      return await sendRequest(
        `/offers/area_offers/`,
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

  const getFilteredOffers = useCallback(
    async (price: number, order: string) => {
      return await sendRequest(
        `/offers/area_offers/?sort_by=${price}&sort_order=${order}`,
        'GET',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    [sendRequest, token]
  );

  const getOfferDetails = useCallback(
    async (offerId: string) => {
      return await sendRequest(`/offers/area_offers/${offerId}/`, 'GET', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    [sendRequest, token]
  );

  const patchOffer = useCallback(
    async (offerId: string, body: OfferType | FormData) => {
      return await sendRequest(
        `/offers/area_offers/${offerId}/`,
        'PATCH',
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
        body
      );
    },
    [sendRequest, token]
  );

  const deactivateOffer = useCallback(
    async (offerId: string) => {
      return await sendRequest(
        `/offers/area_offers/${offerId}/deactivate/`,
        'POST',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    [sendRequest, token]
  );

  return {
    getOffers,
    getFilteredOffers,
    addOffer,
    getOfferDetails,
    patchOffer,
    deactivateOffer,
  };
};

export default useOffers;
