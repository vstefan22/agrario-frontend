import Button from '../../components/common/Button';
import imgDetails from '../../assets/images/details-document.png';
import usePlotStore from '../../store/plot-store';
import { useNavigate } from 'react-router-dom';

function PlotDetails() {
  const navigate = useNavigate();
  const { plot } = usePlotStore();

  const handleRequestOffer = () => {
    navigate('/landowner/my-plots/offer-preparation');
  };

  const handleDownloadReport = () => {
    console.log('Download report clicked.');
  };

  const handleAnalysePlus = () => {
    navigate('/landowner/my-plots/analyse-plus');
  };

  return (
    <div className='bg-gray-lightest min-h-screen flex flex-col px-7 pt-4'>
      <h1 className='text-[32px] font-bold text-black-muted mb-4'>
        {`Detailansicht Flurstück ${plot?.id}`}
      </h1>

      <div className='flex flex-col justify-center bg-white h-[440px] rounded-[16px] shadow-[6px_6px_54px_0px_#0000000D]'>
        <div className='flex flex-col items-center'>
          <img
            src={imgDetails}
            alt='details documentation'
            className='h-[100px] w-[100px]'
          />
          <p className='w-[560px] text-[32px] text-black-muted font-700 text-center mt-4'>
            See Detailansicht flurstück requirements document for details
          </p>
        </div>
      </div>

      <div className='flex justify-end items-center pt-5 gap-3'>
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
