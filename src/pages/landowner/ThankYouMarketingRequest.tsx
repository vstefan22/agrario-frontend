import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import ThankYouMarketingItem from '../../components/landowner/my-plots/ThankYouMarketingItem';
import usePlotStore from '../../store/plot-store';

const ThankYouMarketingRequest = () => {
  const navigate = useNavigate();
  const { plot } = usePlotStore();

  function handleGoToMyOffers() {
    navigate('/landowner/my-offers');
  }

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4'>
      <h1 className='text-[32px] font-bold text-black-muted mb-8'>
        Vielen Dank für Ihre Anfrage
      </h1>
      {plot && <ThankYouMarketingItem key={plot?.id} data={plot} />}
      <p className='w-[978px] mt-12 text-gray-dark-100'>
        Ihre Anfrage wird vorbereitet und von einem Mitarbeiter geprüft. Wir
        kontaktieren Sie innerhalb von 3-5 Werktagen
      </p>

      <div className='flex gap-4 justify-end mt-8'>
        <Button
          type='button'
          variant='blueSecondary'
          className='w-[354px] whitespace-nowrap'
          onClick={handleGoToMyOffers}
        >
          Zurück zur Übersicht
        </Button>
      </div>
    </div>
  );
};

export default ThankYouMarketingRequest;
