import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { PlotType, PlotAnalyseDetails } from '../types/plot-types';

/* eslint-disable @typescript-eslint/no-explicit-any */
type PlotState = {
  plot: PlotType | null;
  plotAnalyseDetails: PlotAnalyseDetails | null;
  basketPlots: any[];
  basketSummary: any | null;
  plots: PlotType[];
  plotId: string | null;
  discountCodeStore: string | null;
  discountedTotal: number | null;

  setPlot: (plot: PlotType) => void;
  setPlotAnalyseDetails: (plot: any) => void;
  setBasketPlots: (plot: any[]) => void;
  setBasketSummary: (summary: any) => void;
  setPlots: (plots: PlotType[]) => void;
  setPlotId: (plotId: string) => void;
  addPlotToList: (plot: PlotType) => void;
  updatePlotToList: (plot: PlotType) => void;
  updatePlot: (plot: PlotType) => void;
  removePlotFromList: (plotId: string) => void;
  removePlotFromBasket: (plotId: string) => void;
  removePlot: (plotId: string) => void;
  setDiscountCodeStore: (code: string, discountedTotal: string) => void;
  clearPlotStorage: () => void;
};

const usePlotStore = create<PlotState>()(
  persist(
    (set) => ({
      plot: null,
      plotAnalyseDetails: null,
      basketPlots: [],
      basketSummary: null,
      plots: [],
      plotId: null,
      discountCodeStore: null,
      discountedTotal: null,

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
          const { parcel, ...rest } = item;
          return { ...rest, ...parcel };
        });
        set(() => ({
          basketPlots: items,
        }));
      },

      setBasketSummary: (basketSummary) =>
        set(() => ({
          basketSummary,
        })),

      setPlots: (plots) =>
        set(() => ({
          plots,
        })),

      setPlotId: (id) => {
        set(() => ({
          plotId: id,
        }));
      },

      setDiscountCodeStore: (code, discountedTotal) =>
        set(() => ({
          discountCodeStore: code,
          discountedTotal: parseFloat(discountedTotal),
        })),

      addPlotToList: (plot) => {
        set((state) => ({
          plots: [
            ...new Map(
              [plot, ...state.plots].map((plot) => [plot.id, plot])
            ).values(),
          ],
        }));
      },

      updatePlotToList: (updatePlot) => {
        set((state) => ({
          plots: state.plots.map((plot) =>
            String(plot.id) === String(updatePlot.id)
              ? { ...plot, ...updatePlot }
              : plot
          ),
        }));
      },

      removePlotFromList: (plotId) => {
        set((state) => ({
          plots: state.plots.filter(
            (plot) => String(plot.id) !== String(plotId)
          ),
        }));
      },

      removePlotFromBasket: (plotId) => {
        set((state) => ({
          basketPlots: state.basketPlots.filter(
            (plot) => String(plot.id) !== String(plotId)
          ),
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
      name: 'plot-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default usePlotStore;
