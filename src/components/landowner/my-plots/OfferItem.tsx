import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DynamicTable from '../../common/DynamicTable';
import Button from '../../common/Button';
import ItemImage from '../../common/ItemImage';
import { PLOT_DETAILS_COLUMNS } from '../../../constants/table-data';
import useOffers from '../../../hooks/offer-hook';
import useOfferStore from '../../../store/offer-store';
import { OfferType } from '../../../types/offer-types';
import imagePlaceholder from '../../../assets/images/image-placeholder.png';
import vermarktungActive from '../../../assets/images/vermarktung-aktiv.png';
import vermarktungInactive from '../../../assets/images/vermarktung-in-vorbereitung.png';

type OfferItemProps = {
  data: OfferType;
};

const OfferItem: FC<OfferItemProps> = ({ data }) => {
  const navigate = useNavigate();
  const { getOfferDetails } = useOffers();
  const { setOffer, setOfferId } = useOfferStore();

  const handleViewDetails = async () => {
    try {
      const offerDetails = await getOfferDetails(data.identifier!);
      setOffer(offerDetails);
      setOfferId(offerDetails.id);
      navigate('/landowner/my-offers/details');
    } catch (err) {
      toast.error('Fehler beim Abrufen der Daten für die Angebotsdetails');
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
      <div className='flex justify-between py-2 space-x-4 min-1780:justify-center min-1780:gap-x-[6rem]'>
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
          <div className='flex justify-end items-center pt-5 gap-3'>
            <img
              src={
                data.status === 'A' ? vermarktungActive : vermarktungInactive
              }
              alt={`vermarktung aktiv/inaktiv image`}
              className='mr-4 h-[22px] object-cover'
            />

            <Button
              variant='bluePrimary'
              type='button'
              onClick={handleViewDetails}
            >
              Angebots-Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferItem;
