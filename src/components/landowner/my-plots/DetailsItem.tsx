import { FC } from 'react';
import DynamicTable from '../../common/DynamicTable';
import ItemImage from '../../common/ItemImage';
import { PLOT_DETAILS_COLUMNS } from '../../../constants/table-data';
import { OfferType } from '../../../types/offer-types';
import active from '../../../assets/images/vermarktung-aktiv.png';
import inactive from '../../../assets/images/vermarktung-in-vorbereitung.png';
import parcelPlaceholder from '../../../assets/images/parcel-placeholder.webp';
import { showRestrictions } from '../../../utils/helper-functions';

type DetailsItemProps = {
  data: OfferType;
};

const DetailsItem: FC<DetailsItemProps> = ({ data }) => {
  return (
    <div
      className='w-full bg-white rounded-[18px] p-4 mb-6'
      style={{
        boxShadow: '6px 6px 54px 0px #0000000D',
        minHeight: '250px',
      }}
    >
      <div className='flex justify-start py-2 space-x-4 gap-8'>
        {data.parcels.length > 0 && (
          <ItemImage image={parcelPlaceholder} id={data.parcels[0].id} />
        )}
        <div className='flex flex-col'>
          {data.parcels.length > 0 && (
            <DynamicTable
              data={data.parcels[0]}
              columns={PLOT_DETAILS_COLUMNS}
            />
          )}
          <div className='flex justify-between items-center pt-5 gap-3 mt-auto'>
            <div>{showRestrictions(data)}</div>
            {data.parcels.length > 0 && (
              <img
                src={data.status === 'A' ? active : inactive}
                alt={'vermarktung aktiv/inaktiv'}
                className='mr-4 h-[22px] object-cover'
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsItem;
