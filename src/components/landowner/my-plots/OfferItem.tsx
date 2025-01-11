import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DynamicTable from '../../common/DynamicTable';
import Button from '../../common/Button';
import ItemImage from '../../common/ItemImage';
import { PLOT_DETAILS_COLUMNS } from '../../../constants/table-data';
import { StoreOfferType } from '../../../types/offer-types';
import active from '../../../assets/images/vermarktung-aktiv.png';
import inactive from '../../../assets/images/vermarktung-in-vorbereitung.png';
// import useOffers from '../../../hooks/offer-hook';
// import useOfferStore from '../../../store/offer-store';
// import useAuthStore from '../../../store/auth-store';

type OfferItemProps = {
  data: StoreOfferType;
};

const OfferItem: FC<OfferItemProps> = ({ data }) => {
  const navigate = useNavigate();
  // const { user } = useAuthStore();
  // const { getOfferDetails } = useOffers();
  // const { setOffer, setOfferId } = useOfferStore();

  const handleViewDetails = async () => {
    try {
      // TODO: uncoment and use when actual data is present
      // const offerDetails = await getOfferDetails(user!.id);
      // setOffer(offerDetails);
      // setOfferId(offerDetails.id)
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
      <div className='flex justify-between py-2 space-x-4'>
        <ItemImage id={data.id} image={data.image} />
        <div className='flex flex-col'>
          <DynamicTable data={data} columns={PLOT_DETAILS_COLUMNS} />
          <div className='flex justify-end items-center pt-5 gap-3'>
            <img
              src={data.analyzePlus === 'active' ? active : inactive}
              alt={`aktiv/inaktiv image`}
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
