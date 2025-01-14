import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuctionOfferDetailsType } from '../types/auctions-offer-types';

type AuctionOfferState = {
  auctionOffer: AuctionOfferDetailsType | null;
  auctionOffers: AuctionOfferDetailsType[];
  myAuctionOffers: AuctionOfferDetailsType[];
  auctionOfferId: string | null;

  setAuctionOffer: (offer: AuctionOfferDetailsType) => void;
  setAuctionOffers: (auctionOffers: AuctionOfferDetailsType[]) => void;
  setMyAuctionOffers: (auctionOffers: AuctionOfferDetailsType[]) => void;
  setAuctionOfferId: (auctionOfferId: string) => void;
  addAuctionOfferToList: (offer: AuctionOfferDetailsType) => void;
  updateAuctionOfferToList: (
    id: string,
    offer: AuctionOfferDetailsType
  ) => void;
  updateAuctionOffer: (id: string, offer: AuctionOfferDetailsType) => void;
  removeAuctionOffer: (auctionOfferId: string) => void;
  removeAuctionOfferFromList: (auctionOfferId: string) => void;
  clearAuctionsStorage: () => void;
};

const useAuctionOfferstore = create<AuctionOfferState>()(
  persist(
    (set) => ({
      auctionOffer: null,
      auctionOffers: [],
      myAuctionOffers: [],
      auctionOfferId: null,

      setAuctionOffer: (auctionOffer) => {
        set(() => ({
          auctionOffer,
        }));
      },

      setAuctionOffers: (auctionOffers) =>
        set(() => ({
          auctionOffers,
        })),

      setMyAuctionOffers: (offers) =>
        set(() => ({
          myAuctionOffers: offers,
        })),

      setAuctionOfferId: (id) => {
        set(() => ({
          auctionOfferId: id,
        }));
      },

      addAuctionOfferToList: (offer) => {
        set((state) => ({
          myAuctionOffers: [
            ...new Map(
              [offer, ...state.myAuctionOffers].map((offer) => [
                offer.identifier,
                offer,
              ])
            ).values(),
          ],
        }));
      },

      updateAuctionOfferToList: (id, updateoffer) => {
        set((state) => ({
          myAuctionOffers: state.myAuctionOffers.map((offer) =>
            String(offer.identifier) === String(id)
              ? { ...offer, ...updateoffer }
              : offer
          ),
        }));
      },

      removeAuctionOfferFromList: (auctionOfferId) => {
        set((state) => ({
          myAuctionOffers: state.myAuctionOffers.filter(
            (offer) => String(offer.identifier) !== String(auctionOfferId)
          ),
        }));
      },

      updateAuctionOffer: (id, updateoffer) => {
        set((state) => ({
          auctionOffer:
            state.auctionOffer &&
            String(state.auctionOffer.identifier) === String(id)
              ? { ...state.auctionOffer, ...updateoffer }
              : state.auctionOffer,
        }));
      },

      removeAuctionOffer: () => set(() => ({ auctionOffer: null })),
      clearAuctionsStorage: () =>
        set({
          auctionOffer: null,
          auctionOffers: [],
          myAuctionOffers: [],
          auctionOfferId: null,
        }),
    }),
    {
      name: 'auctions-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuctionOfferstore;
