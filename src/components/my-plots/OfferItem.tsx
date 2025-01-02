import { FC } from 'react';
import DynamicTable from '../common/DynamicTable';
import { OFFER_ITEM_COLUMNS } from '../../types/table-data-types';
import { OfferItemType } from '../../types/offer-types';
import imgPlaceholder from '../../assets/images/image-placeholder.png';

type OfferItemProps = {
  data: OfferItemType;
};

const OfferItem: FC<OfferItemProps> = ({ data }) => {
  return (
    <div
      className='w-full bg-white rounded-[18px] p-4'
      style={{
        boxShadow: '6px 6px 54px 0px #0000000D',
        minHeight: '250px',
      }}
    >
      <div className='flex justify-between py-2 space-x-4'>
        <div className='flex border-[0.16px] w-[192px] border-gray-neutral rounded-xl flex-col justify-center items-center'>
          <div className='mb-2 h-full w-full'>
            <img
              src={data.image || imgPlaceholder}
              width='100%'
              alt={'angebote image'}
              className='object-cover h-full rounded-tl-xl rounded-tr-xl'
            />
          </div>
          <div className='flex items-center mb-3'>
            <h5 className='font-bold text-[16px] text-black-muted whitespace-nowrap mr-2'>
              {/* TODO: replace this with actual data.id */}
              {'FL-56141'}
            </h5>
            <p className='text-[12px] text-gray-dark-100 font-400'>ID-Nummer</p>
          </div>
        </div>
        <div className='flex flex-col'>
          <DynamicTable data={data} columns={OFFER_ITEM_COLUMNS} />
        </div>
      </div>
    </div>
  );
};

export default OfferItem;
