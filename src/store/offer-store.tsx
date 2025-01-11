import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { StoreOfferType, OfferType } from '../types/offer-types';

type OfferState = {
  offer: StoreOfferType | null;
  offers: StoreOfferType[];
  offerId: string | null;

  setOffer: (offer: StoreOfferType) => void;
  setOffers: (offers: StoreOfferType[]) => void;
  setOfferId: (offerId: string) => void;
  addOfferToList: (offer: StoreOfferType) => void;
  updateOfferToList: (id: string, offer: OfferType) => void;
  updateOffer: (id: string, offer: OfferType) => void;
  removeOffer: (offerId: string) => void;
  removeOfferFromList: (offerId: string) => void;
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
              [offer, ...state.offers].map((offer) => [offer.id, offer])
            ).values(),
          ],
        }));
      },

      updateOfferToList: (id, updateoffer) => {
        set((state) => ({
          offers: state.offers.map((offer) =>
            String(offer.id) === String(id)
              ? { ...offer, ...updateoffer }
              : offer
          ),
        }));
      },

      removeOfferFromList: (offerId) => {
        set((state) => ({
          offers: state.offers.filter(
            (offer) => String(offer.id) !== String(offerId)
          ),
        }));
      },

      updateOffer: (id, updateoffer) => {
        set((state) => ({
          offer:
            state.offer && String(state.offer.id) === String(id)
              ? { ...state.offer, ...updateoffer }
              : state.offer,
        }));
      },

      removeOffer: () => set(() => ({ offer: null })),
    }),
    {
      name: 'offer-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useOfferStore;
