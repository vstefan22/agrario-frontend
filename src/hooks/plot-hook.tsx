import { useCallback } from 'react';
import useHttpRequest from './http-request-hook';
import useAuthStore from '../store/auth-store';
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
    async (id: number) => {
      return await sendRequest(`/offers/parcels/${id}/`, 'PATCH', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    [sendRequest, token]
  );

  const getPlotGeoData = useCallback(async () => {
    return await sendRequest(`/offers/parcel_geo_data/`, 'GET', {});
  }, [sendRequest]);

  const deletePlot = useCallback(
    async (id: number) => {
      return await sendRequest(`/offers/parcels/${id}/`, 'DELETE', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    [sendRequest, token]
  );

  const getPlotByFilterData = useCallback(
    async (filters = {}) => {
      const queryString = new URLSearchParams(filters).toString();
      return await sendRequest(
        `/offers/parcels/search/?${queryString}`,
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

  const addPlotToBasket = useCallback(
    // eslint-disable-next-line
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

  const getBasketItems = useCallback(async () => {
    return await sendRequest(`/offers/parcels/basket-items/`, 'GET', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [sendRequest, token]);

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
    deletePlot,
    getPlotGeoData,
    getPlotByFilterData,
    addPlotToBasket,
    getPlotDetails,
    getPlotAnalyseDetails,
    getAnalysePlus,
    deletePlotFromBasket,
    generateReport,
    applyDiscount,
    getPurchasedItems,
    getBasketItems,
  };
};

export default usePlots;
