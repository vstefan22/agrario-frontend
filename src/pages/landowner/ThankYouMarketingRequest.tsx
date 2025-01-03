import { thankYouMarketingData } from '../../../mockData';
import ThankYouMarketingList from '../../components/my-plots/ThankYouMarketingList';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';

const ThankYouMarketingRequest = () => {
  const navigate = useNavigate();

  function handleGoToMyOffers() {
    navigate('/landowner/my-offers');
    console.log('go to MyOffers clicked.');
  }

  function handleRequestAdditionalOffer() {
    navigate(-1);
    console.log('request additional offer clicked.');
  }

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4'>
      <h1 className='text-[32px] font-bold text-black-muted mb-8'>
        Vielen Dank für Vermarktungsanfrage
      </h1>

      <ThankYouMarketingList data={thankYouMarketingData} />

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
        <Button
          type='button'
          variant='bluePrimary'
          className='w-[274px] whitespace-nowrap'
          onClick={handleRequestAdditionalOffer}
        >
          Weitere Angebote einholen
        </Button>
      </div>
    </div>
  );
};

export default ThankYouMarketingRequest;
