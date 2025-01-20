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
        Vielen Dank für Vermarktungsanfrage
      </h1>
      {plot && <ThankYouMarketingItem key={plot?.id} data={plot} />}
      <p className='w-[978px] mt-12 text-gray-dark-100'>
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form, by injected humour, or
        randomised words which don't look even slightly believable. If you are
        going to use a passage of Lorem Ipsum, you need to be sure there isn't
        anything embarrassing.
      </p>

      <div className='flex gap-4 justify-end mt-8'>
        <Button
          type='button'
          variant='blueSecondary'
          className='w-[354px] whitespace-nowrap'
          onClick={handleGoToMyOffers}
        >
          Zurück zur Übersicht meiner Angebote
        </Button>
      </div>
    </div>
  );
};

export default ThankYouMarketingRequest;
