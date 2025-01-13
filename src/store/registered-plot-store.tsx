import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { RegisteredPlotDetailsType } from '../types/plot-types';

type PlotState = {
  registeredPlot: RegisteredPlotDetailsType | null;
  myRegisteredPlot: RegisteredPlotDetailsType | null;
  registeredPlots: RegisteredPlotDetailsType[];
  myRegisteredPlots: RegisteredPlotDetailsType[];
  registeredPlotId: string | null;
  myRegisteredPlotId: string | null;

  setRegisteredPlot: (plot: RegisteredPlotDetailsType) => void;
  setRegisteredPlots: (plots: RegisteredPlotDetailsType[]) => void;
  setMyRegisteredPlots: (plots: RegisteredPlotDetailsType[]) => void;
  setMyRegisteredPlot: (plot: RegisteredPlotDetailsType) => void;
  setRegisteredPlotId: (plotId: string) => void;
  setMyRegisteredPlotId: (plotId: string) => void;
  updateRegisteredPlot: (plot: RegisteredPlotDetailsType) => void;
  addPlotToMyList: (plot: RegisteredPlotDetailsType) => void;
  updatePlotToMyList: (plot: RegisteredPlotDetailsType) => void;
  removeRegisteredPlotFromMyList: (plotId: string) => void;
  removeMyRegisteredPlot: (plotId: string) => void;
};

const useRegisteredPlotStore = create<PlotState>()(
  persist(
    (set) => ({
      registeredPlot: null,
      registeredPlots: [],
      myRegisteredPlots: [],
      myRegisteredPlot: null,
      registeredPlotId: null,
      myRegisteredPlotId: null,

      setRegisteredPlots: (registeredPlots) =>
        set(() => ({
          registeredPlots,
        })),

      setRegisteredPlot: (registeredPlot) => {
        set(() => ({
          registeredPlot,
        }));
      },

      setMyRegisteredPlots: (registeredPlots) =>
        set(() => ({
          registeredPlots,
        })),

      setMyRegisteredPlot: (plot) => {
        set(() => ({
          myRegisteredPlot: plot,
        }));
      },

      setRegisteredPlotId: (id) => {
        set(() => ({
          registeredPlotId: id,
        }));
      },

      setMyRegisteredPlotId: (id) => {
        set(() => ({
          myRegisteredPlotId: id,
        }));
      },

      addPlotToMyList: (plot) => {
        set((state) => ({
          myRegisteredPlots: [
            ...new Map(
              [plot, ...state.myRegisteredPlots].map((plot) => [
                plot.parcel.id,
                plot,
              ])
            ).values(),
          ],
        }));
      },

      updateRegisteredPlot: (plotUpdated) => {
        set((state) => ({
          registeredPlot:
            state.registeredPlot &&
            String(state.registeredPlot.parcel.id) ===
              String(plotUpdated.parcel.id)
              ? { ...state.registeredPlot, ...plotUpdated }
              : state.registeredPlot,
        }));
      },

      updatePlotToMyList: (updatePlot) => {
        set((state) => ({
          myRegisteredPlots: state.myRegisteredPlots.map((plot) =>
            String(plot.parcel.id) === String(updatePlot.parcel.id)
              ? { ...plot, ...updatePlot }
              : plot
          ),
        }));
      },

      removeRegisteredPlotFromMyList: (plotId) => {
        set((state) => ({
          myRegisteredPlots: state.myRegisteredPlots.filter(
            (plot) => String(plot.parcel.id) !== String(plotId)
          ),
        }));
      },

      removeMyRegisteredPlot: () => set(() => ({ myRegisteredPlot: null })),
    }),
    {
      name: 'registered-plot-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useRegisteredPlotStore;
