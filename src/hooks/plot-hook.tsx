import { useCallback } from 'react';
import useHttpRequest from './http-request-hook';
import useAuthStore from '../store/auth-store';
import { ParcelPolygon } from '../types/google-maps-types';
import { ReportType, DiscountType } from '../types/global-types';

const usePlots = () => {
  const { sendRequest } = useHttpRequest();
  const { token } = useAuthStore();

  const getAllPlots = useCallback(async () => {
    return await sendRequest(`/offers/parcels/`, 'GET', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [sendRequest, token]);

  const getMyPlots = useCallback(async () => {
    return await sendRequest(`/offers/parcels/my_parcels/`, 'GET', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [sendRequest, token]);

  const getFilteredPlots = useCallback(
    async (stateName: string) => {
      return await sendRequest(
        `/offers/parcels/?state_name=${stateName}`,
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

  const addPlot = useCallback(
    async (body: ParcelPolygon[]) => {
      return await sendRequest(
        `/offers/parcels/`,
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

  const getPlotGeoData = useCallback(async () => {
    return await sendRequest(`/offers/parcel_geo_data/`, 'GET', {});
  }, [sendRequest]);

  const addPlotToBasket = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (plotId: string, body: any) => {
      return await sendRequest(
        `/offers/parcels/${plotId}/add_to_basket/`,
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

  const getPlotDetails = useCallback(
    async (plotId: string) => {
      return await sendRequest(`/offers/parcels/${plotId}/`, 'GET', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    [sendRequest, token]
  );

  const getPlotAnalyseDetails = useCallback(
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

  const getAnalysePlus = useCallback(async () => {
    return await sendRequest(`/offers/parcels/basket_summary/`, 'GET', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [sendRequest, token]);

  const getPurchasedItems = useCallback(async () => {
    return await sendRequest(`/offers/parcels/purchased_items/`, 'GET', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [sendRequest, token]);

  const generateReport = useCallback(
    async (body: ReportType) => {
      return await sendRequest(
        `/reports/create_report/`,
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

  const applyDiscount = useCallback(
    async (body: DiscountType) => {
      return await sendRequest(
        `/offers/parcels/apply_discount/`,
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

  const deletePlotFromBasket = useCallback(
    async (plotId: string) => {
      return await sendRequest(
        `/offers/parcels/${plotId}/remove_from_basket/`,
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
    getAllPlots,
    getMyPlots,
    getFilteredPlots,
    addPlot,
    getPlotGeoData,
    addPlotToBasket,
    getPlotDetails,
    getPlotAnalyseDetails,
    getAnalysePlus,
    deletePlotFromBasket,
    generateReport,
    applyDiscount,
    getPurchasedItems,
  };
};

export default usePlots;
