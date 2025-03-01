import { useCallback } from 'react';
import useHttpRequest from './http-request-hook';
import useAuthStore from '../store/auth-store';
import { AuctionOfferDetailsType } from '../types/auctions-offer-types';

const useAuctionOffers = () => {
  const { sendRequest } = useHttpRequest();
  const { token } = useAuthStore();

  const getAuctionOffers = useCallback(async () => {
    return await sendRequest(`/offers/area_offers/active_offers/`, 'GET', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [sendRequest, token]);

  const getAuctionOfferDetails = useCallback(
    async (offerId: string) => {
      return await sendRequest(
        `/offers/area_offers/${offerId}/detail/`,
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

  const addAuctionOffer = useCallback(
    async (offerId: string, body: AuctionOfferDetailsType | FormData) => {
      return await sendRequest(
        `/offers/area_offers/${offerId}/submit_offer/`,
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

  const getMyAuctionOffers = useCallback(async () => {
    return await sendRequest(`/offers/area_offers/submitted-offers/`, 'GET', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [sendRequest, token]);

  const getActiveAuctionOfferDetails = useCallback(
    async (offerId: string) => {
      return await sendRequest(
        `/offers/area_offers/${offerId}/submitted-offers/`,
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

  const patchAuctionOffer = useCallback(
    async (offerId: string, body: AuctionOfferDetailsType | FormData) => {
      return await sendRequest(
        `/offers/area_offers/${offerId}/edit-submitted-offers/`,
        'PATCH',
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

  const deleteAuctionOffer = useCallback(
    async (offerId: string) => {
      return await sendRequest(
        `/offers/area_offers/${offerId}/delete-submitted-offer/`,
        'DELETE',
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
    getAuctionOffers,
    getAuctionOfferDetails,
    addAuctionOffer,
    getMyAuctionOffers,
    getActiveAuctionOfferDetails,
    patchAuctionOffer,
    deleteAuctionOffer,
  };
};

export default useAuctionOffers;
