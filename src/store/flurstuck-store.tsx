import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { FlurstuckType } from '../types/flurstuck-types';

type FlurstuckState = {
  flurstuck: FlurstuckType | null;
  flurstucks: FlurstuckType[];
  flurstuckId: string | null;

  setFlurstuck: (flurstuck: FlurstuckType) => void;
  setFlurstucks: (flurstucks: FlurstuckType[]) => void;
  setflurstuckId: (flurstuckId: string) => void;
  addFlurstuckToList: (flurstuck: FlurstuckType) => void;
  updateFlurstuckToList: (flurstuck: FlurstuckType) => void;
  updateFlurstuck: (flurstuck: FlurstuckType) => void;
  removeFlurstuckFromList: (flurstuckId: string) => void;
  removeFlurstuck: (flurstuckId: string) => void;
};

const useFlurstuckStore = create<FlurstuckState>()(
  persist(
    (set) => ({
      flurstucks: [],
      flurstuck: null,
      flurstuckId: null,

      setFlurstuck: (flurstuck) => {
        set(() => ({
          flurstuck,
        }));
      },

      setFlurstucks: (flurstucks) =>
        set(() => ({
          flurstucks,
        })),

      setflurstuckId: (id) => {
        set(() => ({
          flurstuckId: id,
        }));
      },

      addFlurstuckToList: (flurstuck) => {
        set((state) => ({
          flurstucks: [
            ...new Map(
              [flurstuck, ...state.flurstucks].map((flurstuck) => [
                flurstuck.id,
                flurstuck,
              ])
            ).values(),
          ],
        }));
      },

      updateFlurstuckToList: (updatedFlurstuck) => {
        set((state) => ({
          flurstucks: state.flurstucks.map((flurstuck) =>
            String(flurstuck.id) === String(updatedFlurstuck.id)
              ? { ...flurstuck, ...updatedFlurstuck }
              : flurstuck
          ),
        }));
      },

      removeFlurstuckFromList: (flurstuckId) => {
        set((state) => ({
          flurstucks: state.flurstucks.filter(
            (flurstuck) => String(flurstuck.id) !== String(flurstuckId)
          ),
        }));
      },

      updateFlurstuck: (updatedflurstuck) => {
        set((state) => ({
          flurstuck:
            state.flurstuck &&
            String(state.flurstuck.id) === String(updatedflurstuck.id)
              ? { ...state.flurstuck, ...updatedflurstuck }
              : state.flurstuck,
        }));
      },

      removeFlurstuck: () => set(() => ({ flurstuck: null })),
    }),
    {
      name: 'flurstuck-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useFlurstuckStore;
