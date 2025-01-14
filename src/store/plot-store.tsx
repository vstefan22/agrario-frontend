import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { PlotType } from "../types/plot-types";

type PlotState = {
  plot: PlotType | null;
  plotAnalyseDetails: null | null;
  basketPlots: PlotType[];
  plots: PlotType[];
  plotId: string | null;

  setPlot: (plot: PlotType) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setPlotAnalyseDetails: (plot: any) => void;
  setBasketPlots: (plot: PlotType[]) => void;
  setPlots: (plots: PlotType[]) => void;
  setPlotId: (plotId: string) => void;
  addPlotToList: (plot: PlotType) => void;
  updatePlotToList: (plot: PlotType) => void;
  updatePlot: (plot: PlotType) => void;
  removePlotFromList: (plotId: string) => void;
  removePlotAnalyseFromList: (plotId: string) => void;
  removePlot: (plotId: string) => void;
  clearPlotStorage: () => void;
};

const usePlotStore = create<PlotState>()(
  persist(
    (set) => ({
      plot: null,
      plotAnalyseDetails: null,
      basketPlots: [],
      plots: [],
      plotId: null,

      setPlot: (plot) => {
        set(() => ({
          plot,
        }));
      },

      setPlotAnalyseDetails: (plot) => {
        set(() => ({
          plotAnalyseDetails: plot,
        }));
      },

      setBasketPlots: (basketItems) => {
        const items = basketItems.map((item) => {
          const { parcel, ...rest } = item; // Destructure parcel and the rest of the object
          return { ...rest, ...parcel }; // Spread parcel into the parent object
        });
        set(() => ({
          basketPlots: items,
        }));
      },

      setPlots: (plots) =>
        set(() => ({
          plots,
        })),

      setPlotId: (id) => {
        set(() => ({
          plotId: id,
        }));
      },

      addPlotToList: (plot) => {
        set((state) => ({
          plots: [...new Map([plot, ...state.plots].map((plot) => [plot.id, plot])).values()],
        }));
      },

      updatePlotToList: (updatePlot) => {
        set((state) => ({
          plots: state.plots.map((plot) =>
            String(plot.id) === String(updatePlot.id) ? { ...plot, ...updatePlot } : plot
          ),
        }));
      },

      removePlotFromList: (plotId) => {
        set((state) => ({
          plots: state.plots.filter((plot) => String(plot.id) !== String(plotId)),
        }));
      },

      removePlotAnalyseFromList: (plotId) => {
        set((state) => ({
          basketPlots: state.basketPlots.filter((plot) => String(plot.id) !== String(plotId)),
        }));
      },

      updatePlot: (updatePlot) => {
        set((state) => ({
          plot:
            state.plot && String(state.plot.id) === String(updatePlot.id)
              ? { ...state.plot, ...updatePlot }
              : state.plot,
        }));
      },

      removePlot: () => set(() => ({ plot: null })),
      clearPlotStorage: () =>
        set({
          plot: null,
          plotAnalyseDetails: null,
          basketPlots: [],
          plots: [],
          plotId: null,
        }),
    }),
    {
      name: "plot-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default usePlotStore;
