import { useCallback } from 'react';
import useHttpRequest from './http-request-hook';
import useAuthStore from '../store/auth-store';
import { AuctionOfferType } from '../types/auctions-offer-types';

const useAuctionOffers = () => {
  const { sendRequest } = useHttpRequest();
  const { token } = useAuthStore();

  const getAuctionOffers = useCallback(async () => {
    return await sendRequest(`/offers/area_offers/`, 'GET', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [sendRequest, token]);

  const getAuctionOfferDetails = useCallback(
    async (offerId: string) => {
      return await sendRequest(`/offers/arrea_offer/${offerId}/`, 'GET', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    [sendRequest, token]
  );

  const addAuctionOffer = useCallback(
    async (body: AuctionOfferType) => {
      return await sendRequest(
        `/offers/area_offers/${body.identifier}/submit_offer/`,
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
        `/offers/area_offers/submitted-offers/${offerId}/`,
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

  const changeAuctionOffer = useCallback(
    async (offerId: string) => {
      return await sendRequest(
        `/offers/area_offers/submitted-offers/${offerId}/`,
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
    getAuctionOffers,
    getAuctionOfferDetails,
    addAuctionOffer,
    getMyAuctionOffers,
    getActiveAuctionOfferDetails,
    changeAuctionOffer,
  };
};

export default useAuctionOffers;
