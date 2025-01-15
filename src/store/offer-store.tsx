import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { OfferType, BasicOfferDetailsType } from '../types/offer-types';

type OfferState = {
  offer: OfferType | null;
  offers: OfferType[];
  offerId: string | null;

  setOffer: (offer: OfferType) => void;
  setOffers: (offers: OfferType[]) => void;
  setOfferId: (offerId: string) => void;
  addOfferToList: (offer: OfferType) => void;
  updateOfferToList: (id: string, offer: BasicOfferDetailsType) => void;
  updateOffer: (id: string, offer: BasicOfferDetailsType) => void;
  removeOffer: (offerId: string) => void;
  removeOfferFromList: (offerId: string) => void;
  clearOfferStorage: () => void;
};

const useOfferStore = create<OfferState>()(
  persist(
    (set) => ({
      offer: null,
      offers: [],
      offerId: null,

      setOffer: (offer) => {
        set(() => ({
          offer,
        }));
      },

      setOffers: (offers) =>
        set(() => ({
          offers,
        })),

      setOfferId: (id) => {
        set(() => ({
          offerId: id,
        }));
      },

      addOfferToList: (offer) => {
        set((state) => ({
          offers: [
            ...new Map(
              [offer, ...state.offers].map((offer) => [offer.identifier, offer])
            ).values(),
          ],
        }));
      },

      updateOfferToList: (id, updateoffer) => {
        set((state) => ({
          offers: state.offers.map((offer) =>
            String(offer.identifier) === String(id)
              ? { ...offer, ...updateoffer }
              : offer
          ),
        }));
      },

      removeOfferFromList: (offerId) => {
        set((state) => ({
          offers: state.offers.filter(
            (offer) => String(offer.identifier) !== String(offerId)
          ),
        }));
      },

      updateOffer: (id, updateoffer) => {
        set((state) => ({
          offer:
            state.offer && String(state.offer.identifier) === String(id)
              ? { ...state.offer, ...updateoffer }
              : state.offer,
        }));
      },

      removeOffer: () => set(() => ({ offer: null })),
      clearOfferStorage: () =>
        set({
          offer: null,
          offers: [],
          offerId: null,
        }),
    }),
    {
      name: 'offer-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useOfferStore;
