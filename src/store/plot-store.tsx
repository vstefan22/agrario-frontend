import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { PlotType } from '../types/plot-types';

type plotState = {
  plot: PlotType | null;
  plots: PlotType[];
  plotId: string | null;

  setPlot: (plot: PlotType) => void;
  setPlots: (plots: PlotType[]) => void;
  setPlotId: (plotId: string) => void;
  addPlotToList: (plot: PlotType) => void;
  updatePlotToList: (plot: PlotType) => void;
  updatePlot: (plot: PlotType) => void;
  removePlotFromList: (plotId: string) => void;
  removePlot: (plotId: string) => void;
};

const usePlotStore = create<plotState>()(
  persist(
    (set) => ({
      plot: null,
      plots: [],
      plotId: null,

      setPlot: (plot) => {
        set(() => ({
          plot,
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

      updatePlot: (updatePlot) => {
        set((state) => ({
          plot:
            state.plot && String(state.plot.id) === String(updatePlot.id)
              ? { ...state.plot, ...updatePlot }
              : state.plot,
        }));
      },

      removePlot: () => set(() => ({ plot: null })),
    }),
    {
      name: 'plot-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default usePlotStore;
