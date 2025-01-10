import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import ShowDetails from '../ShowDetails';
import usePlotStore from '../../store/plot-store';
import usePlots from '../../hooks/plot-hook';

function PlotDetails() {
  const navigate = useNavigate();
  const { getPlotAnalyseDetails, addPlotToBasket } = usePlots();
  const { plot, setBasketPlots, setPlotAnalyseDetails, plotAnalyseDetails } =
    usePlotStore();

  useEffect(() => {
    const fetchAnalyseDetails = async () => {
      try {
        const analyseDetailsPlot = await getPlotAnalyseDetails(plot!.id);
        setPlotAnalyseDetails(analyseDetailsPlot);
      } catch (err) {
        console.error('Failed to fetch analyse details:', err);
      }
    };
    fetchAnalyseDetails();
  }, [getPlotAnalyseDetails, setPlotAnalyseDetails, plot]);

  const handleRequestOffer = () => {
    navigate('/landowner/my-plots/offer-preparation');
  };

  const handleDownloadReport = () => {
    console.log('Download report clicked.');
  };

  const handleAnalysePlus = async () => {
    try {
      await addPlotToBasket(plot!.id, plot);
      setBasketPlots(plot!);
      navigate('/landowner/my-plots/analyse-plus');
    } catch (err) {
      console.error(err);
    }
  };

  // TODO: use actual user property for this
  const isAnalizePlus = false;

  return (
    <div className='bg-gray-lightest min-h-screen flex flex-col px-7 pt-4'>
      <div>
        <h1 className='text-[32px] font-bold text-black-muted'>
          Detailansicht Flurstück Analyse Basic
        </h1>
        <div className='flex items-center gap-4 mb-4'>
          <p className='text-black-muted font-semibold'>{plot?.id}</p>
          <p className='text-gray-dark-100/70 text-[12px]'>ID-Nummer</p>
        </div>
      </div>
      <div className='h-[440px] overflow-y-auto rounded-2xl'>
        <ShowDetails paid={isAnalizePlus} data={plotAnalyseDetails} />
      </div>

      <div className='flex justify-end items-center py-5 gap-3'>
        <Button
          variant='blueSecondary'
          type='button'
          onClick={handleRequestOffer}
          className='mr-3'
        >
          Angebot einholen
        </Button>
        <Button
          variant='blueSecondary'
          type='button'
          onClick={handleDownloadReport}
          className='mr-3'
        >
          Bericht herunterladen
        </Button>

        <Button variant='bluePrimary' type='button' onClick={handleAnalysePlus}>
          Analyse PLUS kaufen
        </Button>
      </div>
    </div>
  );
}

export default PlotDetails;
