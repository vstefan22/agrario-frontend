import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import DynamicTable from '../../common/DynamicTable';
import Button from '../../common/Button';
import ItemImage from '../../common/ItemImage';
import useAuctionOffers from '../../../hooks/auctions-offer-hook';
import useAuctionOfferstore from '../../../store/auctions-store';
import { PLOT_DETAILS_COLUMNS } from '../../../constants/table-data';
import { showRestrictions } from '../../../utils/helper-functions';
import imagePlaceholder from '../../../assets/images/image-placeholder.png';
import active from '../../../assets/images/vermarktung-aktiv.png';
import inactive from '../../../assets/images/vermarktung-in-vorbereitung.png';

type ActiveAuctionsItemProps = {
  // eslint-disable-next-line
  data: any;
  isDetails?: boolean;
  detailsType?: 'auction' | 'myAuction';
};

const ActiveAuctionsItem: FC<ActiveAuctionsItemProps> = ({
  data,
  isDetails,
  detailsType,
}) => {
  const navigate = useNavigate();
  const { getAuctionOfferDetails } = useAuctionOffers();
  const { setAuctionOffer } = useAuctionOfferstore();

  const isAnalyse =
    data.parcels.length > 0 ? data.parcels[0].analyse_plus : false;

  const handleViewDetails = async () => {
    try {
      const auctionDetails = await getAuctionOfferDetails(data.identifier);
      setAuctionOffer(auctionDetails);
      if (detailsType === 'auction')
        navigate('/developer/active-auctions/details');
      if (detailsType === 'myAuction')
        navigate('/developer/my-auctions/details');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className='w-full bg-white rounded-[18px] p-4'
      style={{
        boxShadow: '6px 6px 54px 0px #0000000D',
        minHeight: '250px',
      }}
    >
      <div className='flex justify-between py-2 space-x-4'>
        {data.parcels.length > 0 && (
          <ItemImage id={data.parcels[0].id} image={imagePlaceholder} />
        )}
        <div className='flex flex-col'>
          {data.parcels.length > 0 && (
            <DynamicTable
              data={data.parcels[0]}
              columns={PLOT_DETAILS_COLUMNS}
            />
          )}
          <div className='flex justify-between items-center pt-5 gap-3'>
            <div>{showRestrictions(data)}</div>
            <div className='flex items-center'>
              <img
                src={isAnalyse ? active : inactive}
                alt={`aktiv/inaktiv image`}
                className='mr-4 h-[22px] object-cover'
              />

              {isDetails ? (
                ''
              ) : (
                <Button
                  variant='bluePrimary'
                  type='button'
                  onClick={handleViewDetails}
                >
                  Detail ansehen
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveAuctionsItem;
