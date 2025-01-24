import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import ShowDetailsLandowner from "./ShowDetailsLandowner";
import usePlots from "../../hooks/plot-hook";
import usePlotStore from "../../store/plot-store";
import { LoadingSpinner } from "../../components/common/Loading";
import { toast } from "react-toastify";

function PlotDetails() {
  const navigate = useNavigate();
  const { getPlotAnalyseDetails, addPlotToBasket, getBasketItems, getAnalysePlus } = usePlots();
  const { plot, setBasketPlots, setPlotAnalyseDetails, setBasketSummary } = usePlotStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAnalyseDetails = async () => {
      try {
        setLoading(true);
        const analyseDetailsPlot = await getPlotAnalyseDetails(plot!.id);
        setPlotAnalyseDetails(analyseDetailsPlot);
      } catch (err) {
        console.error("Failed to fetch analyse details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalyseDetails();
  }, [getPlotAnalyseDetails, setPlotAnalyseDetails, plot]);

  const handleRequestOffer = () => {
    navigate("/landowner/my-plots/offer-preparation");
  };

  const handleDownloadReport = () => {
    // TODO: add functionality when provided
  };

  const handleAnalysePlus = async () => {
    try {
      await addPlotToBasket(plot!.id, plot);
      const basketItems = await getBasketItems();
      setBasketPlots(basketItems.basket_items);
      const data = await getAnalysePlus();
      console.log(data);
      setBasketSummary(data);
      navigate("/landowner/my-plots/analyse-plus");
      // eslint-disable-next-line
    } catch (err: any) {
      if (err.response.data.error === "Analyse Plus for selected parcel is already purchased.") {
        toast.error("Analyse Plus für das ausgewählte Grundstück wurde bereits gekauft.");
      }
      console.error(err);
    }
  };

  if (loading) return <LoadingSpinner />;
  return (
    <div className="bg-gray-lightest min-h-screen flex flex-col px-7 pt-4">
      <div>
        <h1 className="text-[32px] font-bold text-black-muted">Detailansicht Flurstück</h1>
        <div className="flex items-center gap-4 mb-4">
          <p className="text-black-muted font-semibold">{plot?.id}</p>
          <p className="text-gray-dark-100/70 text-[12px]">ID-Nummer</p>
        </div>
        <p className="gray-dark-100 w-[60%] mb-6">
          Nachfolgend finden Sie die Detailinformationen zu Ihrem Flurstück. Mit „Anzeige aufgeben“
          können Sie das Flurstück auf der Platform inserieren und erhalten unverbindlich Pacht-
          oder Kaufangebote . Wählen Sie „Bericht herunterladen“, um die Analyse als PDF herunter zu
          laden. Für eine umfassende Analyse Ihres Grundstücks klicken Sie auf „Analyse PLUS“
        </p>
      </div>
      <div className="h-[75vh] overflow-y-auto rounded-2xl">
        <ShowDetailsLandowner isAnalizePlus={plot?.analyse_plus} data={plot} />
      </div>

      <div className="flex justify-end items-center py-5 gap-3">
        <Button variant="blueSecondary" type="button" onClick={handleRequestOffer} className="mr-3">
          Anzeige aufgeben
        </Button>
        <Button
          variant="blueSecondary"
          type="button"
          onClick={handleDownloadReport}
          className="mr-3"
        >
          Bericht herunterladen
        </Button>
        <Button variant="bluePrimary" type="button" onClick={handleAnalysePlus}>
          Analyse PLUS kaufen
        </Button>
      </div>
    </div>
  );
}

export default PlotDetails;
