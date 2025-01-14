import useRegisteredPlotStore from './registered-plot-store';
import usePlotStore from './plot-store';
import useOfferStore from './offer-store';
import useMessageStore from './message-store';
import useAuctionsStore from './auctions-store';
import useAuthStore from './auth-store';

const useClearStorage = () => {
  const { clearRegisteredPlotStorage } = useRegisteredPlotStore();
  const { clearPlotStorage } = usePlotStore();
  const { clearOfferStorage } = useOfferStore();
  const { clearMessageStorage } = useMessageStore();
  const { clearAuctionsStorage } = useAuctionsStore();
  const { clearAuth } = useAuthStore();

  const clearStorage = () => {
    clearRegisteredPlotStorage();
    clearPlotStorage();
    clearOfferStorage();
    clearMessageStorage();
    clearAuctionsStorage();
    clearAuth();
  };

  return { clearStorage };
};

export default useClearStorage;
