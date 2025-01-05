import { FC } from 'react';
import DynamicTable from '../common/DynamicTable';
import { THANK_YOU_MARKETING_COLUMNS } from '../../types/table-data-types';
import { DetailsType } from '../../types/details-types';
import active from '../../assets/images/vermarktung-aktiv.png';
import inactive from '../../assets/images/vermarktung-in-vorbereitung.png';
import imgPlaceholder from '../../assets/images/image-placeholder.png';

type DetailsListItemProps = {
  data: DetailsType;
};

const DetailsListItem: FC<DetailsListItemProps> = ({ data }) => {
  return (
    <div
      className='w-full bg-white rounded-[18px] p-4 mb-6'
      style={{
        boxShadow: '6px 6px 54px 0px #0000000D',
        minHeight: '250px',
      }}
    >
      <div className='flex justify-between py-2 space-x-4'>
        <div className='flex shadow-md w-[192px] border-gray-neutral rounded-xl flex-col justify-center items-center'>
          <div className='mb-2 h-full w-full'>
            <img
              src={data.image || imgPlaceholder}
              width='100%'
              alt={'flurstuck-image'}
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
          <DynamicTable data={data} columns={THANK_YOU_MARKETING_COLUMNS} />
          <div className='flex justify-between items-center pt-5 gap-3 mt-auto'>
            <div>
              <h1 className='text-black-muted text-[14px]'>
                {data.infrastructure}
              </h1>
              <p className='text-gray-dark-100 text-[10px] opacity-[70%]'>
                {data.evaluation}
              </p>
            </div>
            <img
              src={data.analyzePlus === 'active' ? active : inactive}
              alt={'image-active/inactive'}
              className='mr-4 h-[22px] object-cover'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsListItem;
