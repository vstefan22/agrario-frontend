import { FC } from 'react';
import DynamicTable from '../../common/DynamicTable';
import ItemImage from '../../common/ItemImage';
import { PLOT_DETAILS_COLUMNS } from '../../../constants/table-data';
import { PlotDetailsType } from '../../../types/plot-types';
import active from '../../../assets/images/vermarktung-aktiv.png';
import inactive from '../../../assets/images/vermarktung-in-vorbereitung.png';

type DetailsItemProps = {
  data: PlotDetailsType;
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
      <div className='flex justify-between py-2 space-x-4'>
        <ItemImage image={data.image} id={data.id} />
        <div className='flex flex-col'>
          <DynamicTable data={data} columns={PLOT_DETAILS_COLUMNS} />
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

export default DetailsItem;
