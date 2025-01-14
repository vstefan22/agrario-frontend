import { useNavigate } from 'react-router-dom';
import ShowDetailsDeveloper from './ShowDetailsDeveloper';
import Button from '../../components/common/Button';
import useAuctionOfferstore from '../../store/auctions-store';

const AuctionDetails = () => {
  const { auctionOffer } = useAuctionOfferstore();
  const navigate = useNavigate();

  const handleDownloadGeodata = () => {
    console.log('download geodata');
  };

  const handlePlaceABid = () => {
    navigate('../active-auctions/place-a-bid');
  };

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4'>
      <div>
        <h1 className='text-[32px] font-bold text-black-muted'>
          Detailansicht Flurstück Analyse Basic
        </h1>
        <div className='flex items-center gap-4 mb-4'>
          <p className='text-black-muted font-semibold'>
            {auctionOffer?.parcels[0].id}
          </p>
          <p className='text-gray-dark-100/70 text-[12px]'>ID-Nummer</p>
        </div>
      </div>
      <div className='h-[440px] overflow-y-auto rounded-2xl'>
        <ShowDetailsDeveloper data={auctionOffer?.parcels} isAuction />
      </div>
      <div className='ml-auto mt-8 flex gap-6'>
        <Button
          type='button'
          variant='blueSecondary'
          onClick={handleDownloadGeodata}
        >
          Download Geodaten
        </Button>
        <Button
          type='button'
          variant='bluePrimary'
          className='w-[188px]'
          onClick={handlePlaceABid}
        >
          Gebot abgeben
        </Button>
      </div>
    </div>
  );
};

export default AuctionDetails;
