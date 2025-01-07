import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import usePlotStore from '../../store/plot-store';
import imgDetails from '../../assets/images/details-document.png';
import ShowDetails from '../ShowDetails';

function PlotDetails() {
  const navigate = useNavigate();
  const { plot } = usePlotStore();

  const [showDetails, setShowDetails] = useState(false);

  const handleRequestOffer = () => {
    navigate('/landowner/my-plots/offer-preparation');
  };

  const handleDownloadReport = () => {
    console.log('Download report clicked.');
  };

  const handleAnalysePlus = () => {
    navigate('/landowner/my-plots/analyse-plus');
  };

  const handleShowDetails = () => {
    setShowDetails(true);
  };

  // TODO: use actual user property for this
  const isAnalizePlus = false;

  return (
    <div className='bg-gray-lightest min-h-screen flex flex-col px-7 pt-4'>
      {!showDetails ? (
        <h1 className='text-[32px] font-bold text-black-muted mb-4 h-[72px]'>
          {`Detailansicht Flurstück ${plot?.id}`}
        </h1>
      ) : (
        <div>
          <h1 className='text-[32px] font-bold text-black-muted'>
            Detailansicht Flurstück Analyse Basic
          </h1>
          <div className='flex items-center gap-4 mb-4'>
            {/* dodati id */}
            <p className='text-black-muted font-semibold'>FL-23701</p>
            <p className='text-gray-dark-100/70 text-[12px]'>ID-Nummer</p>
          </div>
        </div>
      )}
      <div>
        {!showDetails ? (
          <div
            className='flex flex-col justify-center bg-white h-[440px] rounded-[16px] shadow-[6px_6px_54px_0px_#0000000D] cursor-pointer'
            onClick={handleShowDetails}
          >
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
        ) : (
          <div className='h-[440px] overflow-y-auto rounded-2xl'>
            <ShowDetails paid={isAnalizePlus} />
          </div>
        )}
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
