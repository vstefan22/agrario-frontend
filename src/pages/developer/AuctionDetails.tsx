import { useNavigate } from 'react-router-dom';
import ShowDetailsDeveloper from './ShowDetailsDeveloper';
import Button from '../../components/common/Button';
import useAuctionOfferstore from '../../store/auctions-store';
import useAuthStore from '../../store/auth-store';
import { toast } from 'react-toastify';

const AuctionDetails = () => {
  const { auctionOffer } = useAuctionOfferstore();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleDownloadGeodata = () => {
    if (user?.tier === 'PREM') {
      console.log('download geodata');
    } else {
      toast.error(
        'Ihr aktuelles Abonnement berechtigt Sie nicht zur Nutzung dieser Funktion. Bitte gehen Sie zu Ihren Profil-Einstellungen, um Ihr Abonnement zu ändern.'
      );
    }
  };

  const handlePlaceABid = () => {
    if (user?.tier === 'PREM') {
      navigate('/developer/active-auctions/place-a-bid');
    } else {
      toast.error(
        'Ihr aktuelles Abonnement berechtigt Sie nicht zur Nutzung dieser Funktion. Bitte gehen Sie zu Ihren Profil-Einstellungen, um Ihr Abonnement zu ändern.'
      );
    }
  };

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4'>
      <div>
        <h1 className='text-[32px] font-bold text-black-muted'>
          Detailansicht
        </h1>
        <div className='flex items-center gap-4 mb-4'>
          <p className='text-black-muted font-semibold'>
            {auctionOffer?.parcels[0].id}
          </p>
          <p className='text-gray-dark-100/70 text-[12px]'>ID-Nummer</p>
        </div>
        <p className='gray-dark-100 w-[60%] mb-3'>
          Hier sehen Sie die Details des veröffentlichten Inserats. Laden Sie
          zusätzliche Informationen und Geodaten zum Grundstück herunter und
          melden Sie Interesse an, um am Bieterverfahren teilzunehmen. Hinweis:
          Gemäß den AGB ist es untersagt, Grundstückseigentümer zu den
          veröffentlichten Flurstücken eigenständig zu kontaktieren. Eine
          Kontaktaufnahme ist ausschließlich mit schriftlicher Genehmigung von
          Agrario Anergy gestattet.
        </p>
      </div>
      <div className='h-[75vh] overflow-y-auto rounded-2xl'>
        {/* eslint-disable-next-line */}
        <ShowDetailsDeveloper data={auctionOffer?.parcels[0]!} isAuction />
      </div>
      <div className='ml-auto my-8 flex gap-6'>
        <Button
          type='button'
          variant='blueSecondary'
          onClick={handleDownloadGeodata}
          className='w-full'
        >
          Download Geodaten
        </Button>
        <Button
          type='button'
          variant='bluePrimary'
          className='w-full px-6 leading-5'
          onClick={handlePlaceABid}
        >
          Interesse am Bieterverfahren anmelden
        </Button>
      </div>
    </div>
  );
};

export default AuctionDetails;
