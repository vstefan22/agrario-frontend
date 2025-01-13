import { useCallback } from 'react';
import useHttpRequest from './http-request-hook';
import useAuthStore from '../store/auth-store';
import { RegisteredPlotType } from '../types/plot-types';

const useRegisteredPlots = () => {
  const { sendRequest } = useHttpRequest();
  const { token } = useAuthStore();

  const getAllRegisteredPlots = useCallback(async () => {
    return await sendRequest(`/offers/parcels/registered-parcels/`, 'GET', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [sendRequest, token]);

  const getRegisteredPlotDetails = useCallback(
    async (plotId: string) => {
      return await sendRequest(
        `/offers/parcels/${plotId}/detailed_view/`,
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

  const addPlotToWatchlist = useCallback(
    async (body: RegisteredPlotType) => {
      return await sendRequest(
        `/offers/parcels/${body.parcel.id}/add-to-watchlist/`,
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

  const getMyWatchlist = useCallback(async () => {
    return await sendRequest(`/offers/parcels/watchlist/`, 'GET', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [sendRequest, token]);

  const deletePlotFromWatchlist = useCallback(
    async (plotId: string) => {
      return await sendRequest(
        `/offers/parcels/${plotId}/remove-from-watchlist/`,
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
    getAllRegisteredPlots,
    getRegisteredPlotDetails,
    addPlotToWatchlist,
    getMyWatchlist,
    deletePlotFromWatchlist,
  };
};

export default useRegisteredPlots;
