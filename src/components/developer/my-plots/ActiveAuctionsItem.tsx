import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import DynamicTable from '../../common/DynamicTable';
import Button from '../../common/Button';
import ItemImage from '../../common/ItemImage';
import { PLOT_DETAILS_COLUMNS } from '../../../constants/table-data';
// import active from '../../../assets/images/vermarktung-aktiv.png';
// import inactive from '../../../assets/images/vermarktung-in-vorbereitung.png';
import imagePlaceholder from '../../../assets/images/image-placeholder.png';
import useAuctionOffers from '../../../hooks/auctions-offer-hook';
import useAuctionOfferstore from '../../../store/auctions-store';

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
        <ItemImage id={data.parcels[0].id} image={imagePlaceholder} />
        <div className='flex flex-col'>
          <DynamicTable data={data.parcels[0]} columns={PLOT_DETAILS_COLUMNS} />
          <div className='flex justify-between items-center pt-5 gap-3'>
            <div>
              {(() => {
                const { criteria } = data;
                const restrictions = [];
                if (!criteria?.no_usage_restriction) {
                  if (!criteria?.wind_energy_restriction) {
                    restrictions.push('Wind');
                  }
                  if (!criteria?.solar_energy_restriction) {
                    restrictions.push('Freiflächensolar');
                  }
                  if (!criteria?.energy_storage_restriction) {
                    restrictions.push('Energie');
                  }
                  if (!criteria?.eco_enhancements_restriction) {
                    restrictions.push('Biodiversität');
                  }
                } else {
                  restrictions.push(
                    'Wind, Freiflächensolar, Energie, Biodiversität'
                  );
                }
                if (restrictions.length > 0) {
                  return (
                    <>
                      <h1 className='text-black-muted text-[14px]'>
                        {restrictions.join(', ')}
                      </h1>
                      <p className='text-gray-dark-100 text-[10px] opacity-[70%]'>
                        Potentiell geeignet
                      </p>
                    </>
                  );
                }
                return null;
              })()}
            </div>
            <div className='flex items-center'>
              {/* <img
                src={data.analyzePlus === 'active' ? active : inactive}
                alt={`aktiv/inaktiv image`}
                className='mr-4 h-[22px] object-cover'
              /> */}

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
